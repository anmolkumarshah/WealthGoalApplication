package com.virtusa.WealthsApp.exception;

public class InvestmentNotFoundException extends Exception {
    public InvestmentNotFoundException(String investmentId) {
        super("Investment not found with ID: " + investmentId);
    }
}
