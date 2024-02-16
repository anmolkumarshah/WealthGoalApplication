package com.virtusa.WealthsApp.exception;

public class UserNotFoundException extends Exception {

    public UserNotFoundException(String userId) {
        super("User not found with ID: " + userId);
    }
}

