package com.virtusa.WealthsApp.config;

import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.repository.EndUserRepository;
import com.virtusa.WealthsApp.service.AdvisorUserService;
import com.virtusa.WealthsApp.service.EndUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsManager implements UserDetailsService {

    @Autowired
    private EndUserService endUserService;

    @Autowired
    private AdvisorUserService advisorUserService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            if(username.toLowerCase().startsWith("advisor")){
                Advisor userEntity = advisorUserService.getByEmailId(username);
                return org.springframework.security.core.userdetails.User.builder()
                        .username(userEntity.getEmail())
                        .password(userEntity.getPassword())
                        .roles(userEntity.getUserType().toString())
                        .build();
            }else{
                EndUser userEntity  = endUserService.getByEmailId(username);
                return org.springframework.security.core.userdetails.User.builder()
                        .username(userEntity.getEmail())
                        .password(userEntity.getPassword())
                        .roles(userEntity.getUserType().toString())
                        .build();
            }

        } catch (UserNotFoundException e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }


    }
}
