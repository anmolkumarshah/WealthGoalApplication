package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.InvestmentDTO;
import com.virtusa.WealthsApp.exception.InvestmentNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Investments;
import com.virtusa.WealthsApp.service.InvestmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investment")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class InvestmentController {

    @Autowired
    InvestmentService investmentService;

    @PostMapping
    public ResponseEntity<Investments> create(@RequestBody InvestmentDTO dto) throws UserNotFoundException {
        Investments investment = investmentService.save(dto);
        return ResponseEntity.ok(investment);
    }

    @GetMapping("/{investmentId}")
    public ResponseEntity<Investments> getInvestmentById(@PathVariable Long investmentId) throws InvestmentNotFoundException {
        Investments investment = investmentService.getById(investmentId);
        return ResponseEntity.ok(investment);
    }


}