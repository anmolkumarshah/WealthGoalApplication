package com.virtusa.WealthsApp.exception;

public class SubordinateNotFoundException extends Exception {
    public SubordinateNotFoundException(String subordinateId) {
        super("Subordinate not found with ID: " + subordinateId);
    }
}