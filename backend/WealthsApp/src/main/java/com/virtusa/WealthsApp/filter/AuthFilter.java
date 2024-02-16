package com.virtusa.WealthsApp.filter;

import com.virtusa.WealthsApp.helper.JWTHelper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
public class AuthFilter extends OncePerRequestFilter {
    @Autowired
    private JWTHelper helper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestHeader = request.getHeader("Authorization");

        String username = null;
        String token = null;
        if (requestHeader != null && requestHeader.startsWith("Bearer")) {
            token = requestHeader.substring(7);
            try {
                username = helper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                logger.info("Illegal Argument while fetching the username !!");
                sendErrorResponse(response, HttpStatus.BAD_REQUEST, "Illegal Argument while fetching the username");
                return;
            } catch (ExpiredJwtException e) {
                logger.info("Given jwt token is expired !!");
                sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "Given jwt token is expired");
                return;
            } catch (MalformedJwtException e) {
                logger.info("Some change has done in token !! Invalid Token");
                sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "Some change has done in token. Invalid Token");
                return;
            } catch (Exception e){
                logger.info(e.getMessage());
                sendErrorResponse(response, HttpStatus.UNAUTHORIZED, e.getMessage());
                return;
            }
        } else {
            logger.info("Invalid Header Value !! ");
            sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "Invalid Header Value");
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            Boolean validateToken = this.helper.validateToken(token, userDetails);
            if (validateToken) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.info("Validation fails !!");
            }
        }
        filterChain.doFilter(request, response);
    }

    private void sendErrorResponse(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        response.setStatus(status.value());
        response.getWriter().write(message);
        response.getWriter().flush();
        response.getWriter().close();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        return request.getServletPath().equals("/auth/login");
        System.out.println(request.getServletPath());
        List<String> allowedPaths = List.of("/auth/login","/auth/signup","/v3/api-docs","/v3/api-docs/swagger-config","/swagger-ui/index.html","/swagger-ui/index.html","/swagger-ui/swagger-ui.css","/swagger-ui/swagger-ui-standalone-preset.js","/swagger-ui/swagger-ui-bundle.js","/swagger-ui/swagger-initializer.js","/swagger-ui/index.css","/swagger-ui/favicon-32x32.png","/swagger-ui/favicon-16x16.png", "/v2/api-docs", "/configuration/ui", "/swagger-resources", "/configuration/security", "/swagger-ui.html", "/webjars/**","/swagger-resources/configuration/ui","/swagger-ui.html");
        return allowedPaths.contains(request.getServletPath());
    }


}