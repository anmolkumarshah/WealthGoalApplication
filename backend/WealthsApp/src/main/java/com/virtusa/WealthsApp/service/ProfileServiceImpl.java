package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    GoalService goalService;

    @Autowired
    EndUserService endUserService;

    @Override
    public Profile getProfileById(Long id) throws UserNotFoundException {
        EndUser byId = endUserService.getById(id);
        return Profile.builder()
                .info(byId)
                .goals(byId.getGoals())
                .expenses(byId.getExpenses())
                .investments(byId.getInvestments())
                .subordinates(byId.getSubordinates())
                .build();
    }
}
