package com.virtusa.WealthsApp.exception;

public class PlanNotFoundException extends Exception {
    public PlanNotFoundException(Long planId) {
        super("Plan not found with ID: " + planId);
    }
}
