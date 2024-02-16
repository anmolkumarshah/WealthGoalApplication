package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.PlanDTO;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.PlanNotFoundException;
import com.virtusa.WealthsApp.model.Goal;
import com.virtusa.WealthsApp.model.Plan;
import com.virtusa.WealthsApp.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    PlanRepository planRepository;

    @Autowired
    GoalService goalService;

    @Override
    public Plan save(PlanDTO plan) throws GoalNotFoundException {
        Plan plan1 = new Plan();
        plan1.setPercentage(plan.getPercentage());
        plan1.setTotalAmount(plan.getTotalAmount());
        plan1.setEndDate(plan.getEndDate());
        plan1.setStartDate(plan.getStartDate());

        Goal byId = goalService.getById(plan.getGoalId());
        plan1.setGoal(byId);

        byId.addPlan(plan1);

        return planRepository.save(plan1);
    }

    @Override
    public Plan getById(Long id) throws PlanNotFoundException {
        Optional<Plan> byId = planRepository.findById(id);
        if(byId.isEmpty()) throw new PlanNotFoundException(id);
        return byId.get();

    }

    @Override
    public Plan update(Plan plan) {
        return planRepository.save(plan);
    }
}
