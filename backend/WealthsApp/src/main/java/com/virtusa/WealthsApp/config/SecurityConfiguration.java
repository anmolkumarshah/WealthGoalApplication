package com.virtusa.WealthsApp.config;

import com.virtusa.WealthsApp.enums.UserType;
import com.virtusa.WealthsApp.filter.AuthFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
public class SecurityConfiguration {

    @Autowired
    AuthFilter authFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setMaxAge(3600L);
                        return config;
                    }
                }))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/auth/login", "/auth/signup").permitAll()
                        .requestMatchers("/v2/api-docs", "/v3/api-docs", "/v3/api-docs/swagger-config", "/swagger-ui/index.html", "/swagger-ui/swagger-ui.css", "/swagger-ui/swagger-ui-standalone-preset.js", "/swagger-ui/swagger-ui-bundle.js", "/swagger-ui/swagger-initializer.js", "/swagger-ui/index.css", "/swagger-ui/favicon-32x32.png", "/swagger-ui/favicon-16x16.png").permitAll()
                        .requestMatchers("/advisor/**").hasRole(UserType.ADVISOR.toString())
                        .anyRequest().authenticated())
                .addFilterAfter(authFilter, BasicAuthenticationFilter.class);
        return http.build();
    }


}