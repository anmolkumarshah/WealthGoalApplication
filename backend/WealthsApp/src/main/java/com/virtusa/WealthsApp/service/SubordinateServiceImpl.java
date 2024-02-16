package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.SubordinateDTO;
import com.virtusa.WealthsApp.exception.SubordinateNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Subordinate;
import com.virtusa.WealthsApp.repository.EndUserRepository;
import com.virtusa.WealthsApp.repository.SubordinateRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class SubordinateServiceImpl implements SubordinateService {
    @Autowired
    EndUserService endUserService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    SubordinateRepository subordinateRepository;



    @Override
    public Subordinate save(SubordinateDTO subordinateDTO) throws UserNotFoundException {
        long userId = subordinateDTO.getUserId();
        EndUser byId = endUserService.getById(userId);

        Subordinate subordinate = new Subordinate();
        subordinate.setDob(subordinateDTO.getDob());
        subordinate.setName(subordinateDTO.getName());
        subordinate.setRelation(subordinateDTO.getRelation());
        subordinate.setUser(byId);

        byId.addSubordinate(subordinate);
        return subordinateRepository.save(subordinate);
    }

    @Override
    public Subordinate getById(Long id) throws SubordinateNotFoundException {
        Optional<Subordinate> byId = subordinateRepository.findById(id);
        if(byId.isEmpty()) throw new SubordinateNotFoundException(id.toString());
        return byId.get();
    }

    @Override
    public Subordinate deleteById(Long id) throws SubordinateNotFoundException {
        Subordinate subordinate = getById(id);
        if(subordinate == null) throw new SubordinateNotFoundException(id.toString());
        subordinateRepository.deleteById(id);
        return subordinate;
    }
}
