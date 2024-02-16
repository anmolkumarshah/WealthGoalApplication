package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{


}
