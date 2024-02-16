package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.JWTRequestDTO;
import com.virtusa.WealthsApp.dto.JWTResponseDTO;
import com.virtusa.WealthsApp.enums.Relation;
import com.virtusa.WealthsApp.helper.JWTHelper;
import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Subordinate;
import com.virtusa.WealthsApp.repository.SubordinateRepository;
import com.virtusa.WealthsApp.service.AdvisorUserService;
import com.virtusa.WealthsApp.service.EndUserService;
import com.virtusa.WealthsApp.service.SubordinateService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JWTHelper helper;

    @Autowired
    EndUserService userService;

    @Autowired
    AdvisorUserService advisorUserService;

    @Autowired
    SubordinateRepository subordinateRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> create(@Valid @RequestBody EndUser endUser,BindingResult result) {
        System.out.println(result);
        System.out.println("--------------------------");
        if (result.hasErrors()) {
            Map<String, String> validationErrors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                validationErrors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
        }
        EndUser savedUser = userService.save(endUser);


        userService.setAdvisor(savedUser.getId(), new Random().nextLong(2)+1);

        Subordinate subordinate = new Subordinate();
        subordinate.setUser(savedUser);
        subordinate.setName(savedUser.getPersonalDetail().getName());
        subordinate.setRelation(Relation.SELF);
        subordinate.setDob(savedUser.getPersonalDetail().getDob());
        savedUser.addSubordinate(subordinate);

        subordinateRepository.save(subordinate);

        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
        String token = this.helper.generateToken(userDetails);

        JWTResponseDTO response = JWTResponseDTO.builder()
                .jwtToken(token)
                .username(userDetails.getUsername())
                .authorities(userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody JWTRequestDTO request, BindingResult result) {
        System.out.println(result);
        if (result.hasErrors()) {
            Map<String, String> validationErrors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                validationErrors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
        }

        this.doAuthenticate(request.getEmail(), request.getPassword());

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        JWTResponseDTO response = JWTResponseDTO.builder()
                .jwtToken(token)
                .username(userDetails.getUsername())
                .authorities(userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    private void doAuthenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> exceptionHandler() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Credentials Invalid !!");
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<String> exceptionSQLIntegrityConstraintViolationExceptionHandler() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Already Registered With This Email");
    }

}
