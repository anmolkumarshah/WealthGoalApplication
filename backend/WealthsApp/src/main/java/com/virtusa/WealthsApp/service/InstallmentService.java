package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.InstallmentDTO;
import com.virtusa.WealthsApp.exception.InstallmentNotFoundException;
import com.virtusa.WealthsApp.exception.PlanNotFoundException;
import com.virtusa.WealthsApp.model.Installment;

public interface InstallmentService {
    Installment save(InstallmentDTO installment) throws PlanNotFoundException;
    Installment getById(Long id) throws InstallmentNotFoundException;

    public Installment payInstallment(Long id) throws InstallmentNotFoundException;
}
