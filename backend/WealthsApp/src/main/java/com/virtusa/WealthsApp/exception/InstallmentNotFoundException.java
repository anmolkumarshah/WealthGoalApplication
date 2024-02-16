package com.virtusa.WealthsApp.exception;

public class InstallmentNotFoundException extends Exception {
    public InstallmentNotFoundException(Long installmentId) {
        super("Installment not found with ID: " + installmentId);
    }
}