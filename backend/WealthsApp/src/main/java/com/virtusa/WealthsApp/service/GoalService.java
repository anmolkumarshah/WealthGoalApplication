package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.ExternalUserGoalDTO;
import com.virtusa.WealthsApp.dto.GoalDTO;
import com.virtusa.WealthsApp.dto.SubordinateDTO;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.SubordinateNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Goal;
import com.virtusa.WealthsApp.model.Subordinate;

import java.util.List;

public interface GoalService {
    Goal save(GoalDTO goalDTO) throws UserNotFoundException, SubordinateNotFoundException;

    Goal getById(Long id) throws GoalNotFoundException;

    Goal update(Goal goal);

    public Goal createGoalForExternalUser(ExternalUserGoalDTO goalDTO) throws UserNotFoundException, SubordinateNotFoundException;

    public List<Object> planCompletion(Long Id)throws GoalNotFoundException;
}
