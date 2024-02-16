package com.virtusa.WealthsApp.service;

import com.virtusa.WealthsApp.dto.InstallmentDTO;
import com.virtusa.WealthsApp.enums.ExpenseCategory;
import com.virtusa.WealthsApp.exception.InstallmentNotFoundException;
import com.virtusa.WealthsApp.exception.PlanNotFoundException;
import com.virtusa.WealthsApp.model.Expense;
import com.virtusa.WealthsApp.model.Installment;
import com.virtusa.WealthsApp.model.Plan;
import com.virtusa.WealthsApp.repository.InstallmentRepository;
import com.virtusa.WealthsApp.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class InstallmentServiceImpl implements InstallmentService {
    @Autowired
    InstallmentRepository installmentRepository;

    @Autowired
    PlanService planService;

    @Autowired
    PlanRepository planRepository;


    @Override
    public Installment save(InstallmentDTO installment) throws PlanNotFoundException {
        Installment installment1 = new Installment();
        installment1.setAmount(installment.getAmount());
        installment1.setPayDate(installment.getPayDate());
        installment1.setPaid(false);
        installment1.setIdx(installment.getIdx());

        Plan byId = planService.getById(installment.getPlanId());
        installment1.setPlan(byId);

        byId.addInstallment(installment1);

        return installmentRepository.save(installment1);
    }

    @Override
    public Installment getById(Long id) throws InstallmentNotFoundException {
        Optional<Installment> byId = installmentRepository.findById(id);
        if (byId.isEmpty()) throw new InstallmentNotFoundException(id);
        return byId.get();
    }

    public Installment payInstallment(Long id) throws InstallmentNotFoundException {
        Optional<Installment> byId = installmentRepository.findById(id);
        if (byId.isEmpty()) throw new InstallmentNotFoundException(id);
        Installment installment = byId.get();
        installment.setPaid(true);
        installment.setPaidOn(new Date());
        Plan plan = installment.getPlan();

        Expense expense = new Expense();
        expense.setCategory(ExpenseCategory.NEED);
        expense.setDescription("Investment for Goal : " + plan.getGoal().getGoalTitle());
        expense.setAmount(installment.getAmount());
        expense.setUser(plan.getGoal().getUser());
        plan.getGoal().getUser().addExpense(expense);

        int totalInstallments = plan.getInstallments().size();
        long paidInstallments = plan.getInstallments().stream().filter(el -> el.isPaid()).count();

        double completionPer = ((double) paidInstallments / totalInstallments) * 100;
        plan.setProgress(completionPer);


        planRepository.save(plan);
        Installment update = installmentRepository.save(installment);
        return update;
    }
}
