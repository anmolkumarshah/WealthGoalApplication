package com.virtusa.WealthsApp.service;


import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.repository.AdvisorUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdvisorUserServiceImpl implements AdvisorUserService {

    @Autowired
    AdvisorUserRepository advisorUserRepository;

    @Override
    public Advisor save(Advisor advisor) {
        return advisorUserRepository.save(advisor);
    }

    @Override
    public Advisor getById(Long id) throws UserNotFoundException {
        Optional<Advisor> byId = advisorUserRepository.findById(id);
        if(byId.isEmpty())throw  new UserNotFoundException(id.toString());
        return byId.get();
    }

    @Override
    public List<EndUser> getAllEndUser(Long advisorId) throws UserNotFoundException {
        Advisor byId = getById(advisorId);
        return  byId.getEndUsers();
    }

    @Override
    public Advisor getByEmailId(String email) throws UserNotFoundException {
        Optional<Advisor> byId = advisorUserRepository.getByEmail(email);
        if(byId.isEmpty())throw  new UserNotFoundException(email);
        return byId.get();
    }
}
