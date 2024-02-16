package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Profile;
import com.virtusa.WealthsApp.service.ProfileService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class ProfileController {
    @Autowired
    ProfileService profileService;

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getById(@PathVariable("id") long id) throws UserNotFoundException {
        Profile profileById = profileService.getProfileById(id);
        return ResponseEntity.ok(profileById);
    }

}
