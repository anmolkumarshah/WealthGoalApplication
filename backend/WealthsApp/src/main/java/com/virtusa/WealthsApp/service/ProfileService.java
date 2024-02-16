package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Profile;

public interface ProfileService {
    Profile getProfileById(Long id) throws UserNotFoundException;
}
