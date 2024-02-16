package com.virtusa.WealthsApp.exception;

public class GoalNotFoundException extends Exception {
    public GoalNotFoundException(String goalId) {
        super("Goal not found with ID: " + goalId);
    }
}