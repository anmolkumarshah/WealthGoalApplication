package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.ExpenseDTO;
import com.virtusa.WealthsApp.exception.ExpenseNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Expense;

public interface ExpenseService {
    Expense save(ExpenseDTO expense) throws UserNotFoundException;

    Expense getById(Long id) throws ExpenseNotFoundException;

    Expense deleteById(Long Id) throws  ExpenseNotFoundException;



}
