package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.ExternalUserGoalDTO;
import com.virtusa.WealthsApp.dto.GoalDTO;
import com.virtusa.WealthsApp.enums.GoalStatus;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.SubordinateNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Goal;
import com.virtusa.WealthsApp.model.Installment;
import com.virtusa.WealthsApp.model.Plan;
import com.virtusa.WealthsApp.service.GoalService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goal")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class GoalController {

    @Autowired
    GoalService goalService;

    @PostMapping
    public ResponseEntity<Goal> create(@RequestBody GoalDTO dto) throws UserNotFoundException, SubordinateNotFoundException {
        Goal goal = goalService.save(dto);
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Long goalId) throws GoalNotFoundException {
        Goal goal = goalService.getById(goalId);
        return ResponseEntity.ok(goal);
    }

    @PostMapping("/external/goal-selection")
    public ResponseEntity<Goal> addingGoalForExternalUser(@RequestBody ExternalUserGoalDTO externalUserGoalDTO) throws UserNotFoundException, SubordinateNotFoundException {
        Goal goalForExternalUser = goalService.createGoalForExternalUser(externalUserGoalDTO);
        return ResponseEntity.ok(goalForExternalUser);
    }

    @GetMapping("/plan/{goalId}")
    public ResponseEntity<List<Plan>> getGoalPlanById(@PathVariable Long goalId) throws GoalNotFoundException {
        Goal goal = goalService.getById(goalId);
        return ResponseEntity.ok(goal.getPlans());
    }


    @GetMapping("/progress/{goalId}")
    public ResponseEntity<List<Object>> getProgressLineGraph(@PathVariable Long goalId) throws GoalNotFoundException{
        List<Object> data = goalService.planCompletion(goalId);
        return  ResponseEntity.ok(data);
    }

    @GetMapping("/status/{goalId}")
    public ResponseEntity<Goal> updateGoalStatus(@PathVariable Long goalId,@RequestParam("status") String status) throws GoalNotFoundException {
        Goal goal = goalService.getById(goalId);
        if(status.equalsIgnoreCase("approved")){
            goal.setGoalStatus(GoalStatus.APPROVED);
        }else if(status.equalsIgnoreCase("rejected")){
            goal.setGoalStatus(GoalStatus.REJECTED);
        }else{
            goal.setGoalStatus(GoalStatus.PENDING);
        }
        goalService.update(goal);
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/with-plan/{goalId}")
    public ResponseEntity<Goal> goalWithSomePlans(@PathVariable Long goalId,@RequestParam("status") String status) throws GoalNotFoundException {
        Goal goal = goalService.getById(goalId);
        goalService.update(goal);
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/selected-plan-installment/{goalId}")
    public ResponseEntity<List<Installment>> goalWithSelectedPlans(@PathVariable Long goalId) throws GoalNotFoundException {
        Goal goal = goalService.getById(goalId);
        List<Plan> selectedPlan = goal.getPlans().stream().filter(el -> el.isSelected()).toList();
        List<Installment> installments = selectedPlan.get(0).getInstallments();
        return ResponseEntity.ok(installments);
    }



}
