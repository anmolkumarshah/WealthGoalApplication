package com.virtusa.WealthsApp.controller;


import com.virtusa.WealthsApp.enums.GoalStatus;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.model.EndUser;
import com.virtusa.WealthsApp.model.Goal;
import com.virtusa.WealthsApp.service.AdvisorUserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/advisor")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class AdvisorController {

    @Autowired
    AdvisorUserService userService;

    @PostMapping
    public ResponseEntity<Advisor> create(@RequestBody Advisor advisor){
        Advisor savedUser = userService.save(advisor);
        return  ResponseEntity.ok(savedUser);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Advisor> getById(@PathVariable("id") Long id) throws UserNotFoundException {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/data")
    public  ResponseEntity<Advisor> getByEmail(@RequestParam("email") String email) throws UserNotFoundException {
        Advisor byId = userService.getByEmailId(email);
        return ResponseEntity.ok(byId);
    }

    @GetMapping("{id}/end-users")
    public  ResponseEntity<List<EndUser>> getAllEndUserById(@PathVariable("id") Long id) throws UserNotFoundException {
        List<EndUser> allEndUser = userService.getAllEndUser(id);
        return ResponseEntity.ok(allEndUser);
    }


    @GetMapping("/{id}/goals")
    public ResponseEntity<List<Goal>> getAllGoal(@PathVariable("id") Long id,@RequestParam("type") String type ) throws UserNotFoundException {
        List<EndUser> allEndUser = userService.getAllEndUser(id);
        List<Goal> goals = new ArrayList<>();
        if(type.equals("approved")){
            allEndUser.stream().forEach(el -> {
                el.getGoals().stream().forEach(goal -> {
                    if(goal.getGoalStatus() == GoalStatus.APPROVED){
                        goals.add(goal);
                    }
                });
            });
        }else if(type.equals("pending")){
            allEndUser.stream().forEach(el -> {
                el.getGoals().stream().forEach(goal -> {
                    if(goal.getGoalStatus() == GoalStatus.PENDING){
                        goals.add(goal);
                    }
                });
            });
        }else if(type.equals("rejected")){
            allEndUser.stream().forEach(el -> {
                el.getGoals().stream().forEach(goal -> {
                    if(goal.getGoalStatus() == GoalStatus.REJECTED){
                        goals.add(goal);
                    }
                });
            });
        }else{
            allEndUser.stream().forEach(el -> {
                el.getGoals().stream().forEach(goal -> {
                    goals.add(goal);
                });
            });
        }

        return ResponseEntity.ok(goals);
    }

}
