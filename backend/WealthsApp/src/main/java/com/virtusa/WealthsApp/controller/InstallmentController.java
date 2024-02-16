package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.InstallmentDTO;
import com.virtusa.WealthsApp.exception.InstallmentNotFoundException;
import com.virtusa.WealthsApp.exception.PlanNotFoundException;
import com.virtusa.WealthsApp.model.Installment;
import com.virtusa.WealthsApp.service.InstallmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/installment")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class InstallmentController {

    @Autowired
    InstallmentService installmentService;

    @PostMapping
    public ResponseEntity<Installment> createInstallment(@RequestBody InstallmentDTO installmentDTO) throws PlanNotFoundException {
        Installment save = installmentService.save(installmentDTO);
        return ResponseEntity.ok(save);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Installment> getById(@PathVariable("id") Long installmentId) throws  InstallmentNotFoundException {
        Installment byId = installmentService.getById(installmentId);
        return ResponseEntity.ok(byId);
    }

    @GetMapping("/pay/{id}")
    public ResponseEntity<Installment> payInstallmentById(@PathVariable("id") Long installmentId) throws  InstallmentNotFoundException {
        Installment byId = installmentService.payInstallment(installmentId);
        return ResponseEntity.ok(byId);
    }


}