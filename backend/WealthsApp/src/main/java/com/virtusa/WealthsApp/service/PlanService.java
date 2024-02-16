package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.PlanDTO;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.PlanNotFoundException;
import com.virtusa.WealthsApp.model.Plan;

public interface PlanService {
    Plan save(PlanDTO plan) throws GoalNotFoundException;

    Plan getById(Long id) throws PlanNotFoundException;

    Plan update(Plan plan);
}
