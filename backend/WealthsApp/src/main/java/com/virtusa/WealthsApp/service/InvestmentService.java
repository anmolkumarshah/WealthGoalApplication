package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.ExpenseDTO;
import com.virtusa.WealthsApp.dto.InvestmentDTO;
import com.virtusa.WealthsApp.exception.ExpenseNotFoundException;
import com.virtusa.WealthsApp.exception.InvestmentNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Expense;
import com.virtusa.WealthsApp.model.Investments;

import java.util.List;

public interface InvestmentService {
    Investments save(InvestmentDTO investmentDTO) throws UserNotFoundException;

    Investments getById(Long id) throws InvestmentNotFoundException;


}
