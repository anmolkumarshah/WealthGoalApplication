package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.ExpenseDTO;
import com.virtusa.WealthsApp.exception.ExpenseNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Expense;
import com.virtusa.WealthsApp.repository.EndUserRepository;
import com.virtusa.WealthsApp.repository.ExpenseRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;

    @Autowired
    EndUserService endUserService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public Expense save(ExpenseDTO expense) throws UserNotFoundException {
        long userId = expense.getUserId();
        EndUser byId = endUserService.getById(userId);
        Expense expense1 = modelMapper.map(expense, Expense.class);
        byId.addExpense(expense1);
        return expenseRepository.save(expense1);
    }

    @Override
    public Expense getById(Long id) throws ExpenseNotFoundException {
        Optional<Expense> byId = expenseRepository.findById(id);
        if(byId.isEmpty()) throw new ExpenseNotFoundException(id.toString());
        return byId.get();
    }

    @Override
    public Expense deleteById(Long Id) throws ExpenseNotFoundException {
        Expense byId = getById(Id);
        if(byId == null){
            throw new ExpenseNotFoundException(Id.toString());
        }
        expenseRepository.deleteById(Id);
        return byId;
    }


}
