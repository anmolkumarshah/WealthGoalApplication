package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.PlanDTO;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.PlanNotFoundException;
import com.virtusa.WealthsApp.model.Installment;
import com.virtusa.WealthsApp.model.Plan;
import com.virtusa.WealthsApp.service.PlanService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plan")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class PlanController {
    @Autowired
    PlanService planService;

    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody PlanDTO planDTO) throws GoalNotFoundException {
        Plan save = planService.save(planDTO);
        return ResponseEntity.ok(save);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> getById(@PathVariable("id") Long planId) throws PlanNotFoundException {
        Plan byId = planService.getById(planId);
        return ResponseEntity.ok(byId);
    }

    @GetMapping("/{id}/installment")
    public ResponseEntity<List<Installment>> getAllInstallmentById(@PathVariable("id") Long planId) throws PlanNotFoundException {
        Plan byId = planService.getById(planId);
        return ResponseEntity.ok(byId.getInstallments());
    }

    @GetMapping("/action/{id}")
    public ResponseEntity<Plan> getById(@PathVariable("id") Long planId,@RequestParam("selected") String selected) throws PlanNotFoundException {
        Plan plan = planService.getById(planId);
        if(selected.equalsIgnoreCase("true")){
            plan.setSelected(true);
        }else{
            plan.setSelected(false);
        }
        Plan update = planService.update(plan);
        return ResponseEntity.ok(update);
    }
}
