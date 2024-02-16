package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.InvestmentDTO;
import com.virtusa.WealthsApp.dto.SubordinateDTO;
import com.virtusa.WealthsApp.exception.InvestmentNotFoundException;
import com.virtusa.WealthsApp.exception.SubordinateNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Investments;
import com.virtusa.WealthsApp.model.Subordinate;

public interface SubordinateService {
    Subordinate save(SubordinateDTO subordinateDTO) throws UserNotFoundException;

    Subordinate getById(Long id) throws SubordinateNotFoundException;

    Subordinate deleteById(Long id) throws  SubordinateNotFoundException;
}
