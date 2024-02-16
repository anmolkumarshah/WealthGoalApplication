package com.virtusa.WealthsApp.exception;

public class ExpenseNotFoundException extends Exception {
    public ExpenseNotFoundException(String expenseId){
        super("Expense not found with ID: " + expenseId);
    }
}
