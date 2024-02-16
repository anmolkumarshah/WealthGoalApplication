package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Investments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestmentRepository extends JpaRepository<Investments, Long>{



}
