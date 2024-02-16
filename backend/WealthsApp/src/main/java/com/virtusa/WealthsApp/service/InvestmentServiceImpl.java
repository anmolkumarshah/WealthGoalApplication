package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.InvestmentDTO;
import com.virtusa.WealthsApp.exception.InvestmentNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Investments;
import com.virtusa.WealthsApp.repository.InvestmentRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class InvestmentServiceImpl implements InvestmentService {

    @Autowired
    InvestmentRepository investmentRepository;

    @Autowired
    EndUserService endUserService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public Investments save(InvestmentDTO investmentDTO) throws UserNotFoundException {
        long userId = investmentDTO.getUserId();
        EndUser byId = endUserService.getById(userId);
        Investments investments = modelMapper.map(investmentDTO, Investments.class);
        byId.addInvestment(investments);
        return investmentRepository.save(investments);
    }

    @Override
    public Investments getById(Long id) throws InvestmentNotFoundException {
        Optional<Investments> byId = investmentRepository.findById(id);
        if(byId.isEmpty()) throw  new InvestmentNotFoundException(id.toString());
        return byId.get();
    }
}
