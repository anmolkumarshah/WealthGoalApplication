package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.ExpenseDTO;
import com.virtusa.WealthsApp.exception.ExpenseNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Expense;
import com.virtusa.WealthsApp.service.ExpenseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class ExpenseController {
    @Autowired
    ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> create(@RequestBody ExpenseDTO dto) throws UserNotFoundException {
        Expense expense = expenseService.save(dto);
        return ResponseEntity.ok(expense);
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long expenseId) throws ExpenseNotFoundException {
        Expense expense = expenseService.getById(expenseId);
        return ResponseEntity.ok(expense);
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Expense> deleteExpenseById(@PathVariable Long expenseId) throws ExpenseNotFoundException {
        Expense expense = expenseService.deleteById(expenseId);
        return ResponseEntity.ok(expense);
    }
}
