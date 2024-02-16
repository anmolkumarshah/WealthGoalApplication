package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.ExternalUserGoalDTO;
import com.virtusa.WealthsApp.dto.GoalDTO;
import com.virtusa.WealthsApp.dto.LineGraphData;
import com.virtusa.WealthsApp.enums.GoalStatus;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.SubordinateNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.*;
import com.virtusa.WealthsApp.repository.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@Transactional
public class GoalServiceImpl implements GoalService {

    @Autowired
    EndUserService endUserService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    SubordinateService subordinateService;

    @Autowired
    PlanRepository planRepository;

    @Autowired
    InstallmentRepository installmentRepository;


    @Override
    public Goal save(GoalDTO goalDTO) throws UserNotFoundException, SubordinateNotFoundException {
        long userId = goalDTO.getGoalCreatedBy();
        EndUser byId = endUserService.getById(userId);

        long subordinateId = goalDTO.getSubordinateId();
        Subordinate subordinate = subordinateService.getById(subordinateId);

        Goal goal = new Goal();
        goal.setGoalAmount(goalDTO.getGoalAmount());
        goal.setGoalDescription(goalDTO.getGoalDescription());
        goal.setGoalPriority(goalDTO.getGoalPriority());
        goal.setGoalTitle(goalDTO.getGoalTitle());
        goal.setGoalEndDate(goalDTO.getGoalEndDate());
        goal.setGoalStartDate(goalDTO.getGoalStartDate());
        goal.setRiskFactor(goalDTO.getRiskFactor());
        goal.setUser(byId);
        goal.setGoalStatus(GoalStatus.PENDING);
        goal.setSubordinate(subordinate);

        byId.addGoal(goal);
        subordinate.addGoal(goal);
        return goalRepository.save(goal);
    }

    @Override
    public Goal getById(Long id) throws GoalNotFoundException {
        Optional<Goal> byId = goalRepository.findById(id);
        if (byId.isEmpty()) throw new GoalNotFoundException(id.toString());
        return byId.get();
    }

    @Override
    public Goal update(Goal goal) {
        return goalRepository.save(goal);
    }

    public Goal createGoalForExternalUser(ExternalUserGoalDTO goalDTO) throws UserNotFoundException, SubordinateNotFoundException {

        EndUser endUser = endUserService.getById(goalDTO.getUserId());
        Subordinate subordinate = subordinateService.getById(goalDTO.getSubordinateId());

        Goal goal = new Goal();
        goal.setGoalAmount(goalDTO.getGoalAmount());
        goal.setGoalDescription(goalDTO.getGoalDescription());
        goal.setGoalPriority(goalDTO.getGoalPriority());
        goal.setGoalTitle(goalDTO.getGoalTitle());
        goal.setGoalEndDate(goalDTO.getGoalEndDate());
        goal.setGoalStartDate(goalDTO.getGoalStartDate());
        goal.setRiskFactor(goalDTO.getRiskFactor());
        goal.setGoalStatus(GoalStatus.APPROVED);
        goal.setUser(endUser);
        goal.setSubordinate(subordinate);

        double salary = endUser.getIncomeDetail().getMonthlySalary();
        double percentageSal = (goalDTO.getSalaryPercentage() / 100) * salary;

        int fullInstallments = (int) Math.floor(goal.getGoalAmount() / percentageSal);
        double remainingAmt = goal.getGoalAmount() - (percentageSal * fullInstallments);

        Plan plan1 = new Plan();
        plan1.setPercentage(goalDTO.getSalaryPercentage());
        plan1.setTotalAmount(goalDTO.getGoalAmount());

        plan1.setProgress(0);
        plan1.setSelected(true);

        goal.addPlan(plan1);
        plan1.setGoal(goal);

        List<Installment> installmentList = new ArrayList<>();
        Date nxtDate = goal.getGoalStartDate();
        int i;
        for (i = 0; i < fullInstallments; i++) {
            Installment installment = new Installment();
            installment.setAmount(percentageSal);
            installment.setPaid(false);
            installment.setPayDate(nxtDate);
            installment.setIdx(i + 1);
            installment.setPlan(plan1);

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(nxtDate);
            calendar.add(Calendar.MONTH, 1);
            nxtDate = calendar.getTime();

            installmentRepository.save(installment);
            plan1.addInstallment(installment);
        }

        if (remainingAmt > 0) {
            Installment installment = new Installment();
            installment.setAmount(remainingAmt);
            installment.setPaid(false);

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(nxtDate);
            calendar.add(Calendar.MONTH, 1);
            nxtDate = calendar.getTime();

            installment.setPayDate(nxtDate);
            installment.setIdx(i + 1);
            installment.setPlan(plan1);
            plan1.addInstallment(installment);
            installmentRepository.save(installment);
        }

        planRepository.save(plan1);
        return goalRepository.save(goal);
    }

    public List<Object> planCompletion(Long Id)throws GoalNotFoundException{
        Goal goal = this.getById(Id);
        List<Plan> plans = goal.getPlans().stream().filter(el -> el.isSelected() == true).toList();

        List<LineGraphData> expectedGraphData = new ArrayList<>();
        List<LineGraphData> actualGraphData = new ArrayList<>();

        plans.get(0).getInstallments().stream().forEach(el -> {
            LineGraphData expected = LineGraphData.builder().x(el.getIdx()).y(el.getIdx()).build();
            expectedGraphData.add(expected);
            if(el.isPaid()){
                LocalDate payDate = el.getPayDate().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                LocalDate paidOn = el.getPaidOn().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                int daysDifference = (int) ChronoUnit.DAYS.between(payDate, paidOn);
                LineGraphData actual = LineGraphData.builder().x(el.getIdx()).y(el.getIdx()+daysDifference).build();
                actualGraphData.add(actual);
            }
        });
        List<Object> response = List.of(expectedGraphData,actualGraphData,plans.get(0).getProgress());
        return response;
    }

}
