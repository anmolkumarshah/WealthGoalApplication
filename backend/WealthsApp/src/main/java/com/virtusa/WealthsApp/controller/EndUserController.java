package com.virtusa.WealthsApp.controller;

import com.virtusa.WealthsApp.dto.IncomeInfoDTO;
import com.virtusa.WealthsApp.enums.ExpenseCategory;
import com.virtusa.WealthsApp.enums.GoalStatus;
import com.virtusa.WealthsApp.exception.GoalNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.*;
import com.virtusa.WealthsApp.service.EndUserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customer")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class EndUserController {
    @Autowired
    EndUserService userService;




    @GetMapping("/{id}")
    public ResponseEntity<EndUser> getById(@PathVariable("id") Long id) throws UserNotFoundException {
        EndUser byId = userService.getById(id);
        return ResponseEntity.ok(byId);
    }

    @GetMapping("/data")
    public ResponseEntity<EndUser> getByEmail(@RequestParam("email") String email) throws UserNotFoundException {
        EndUser byId = userService.getByEmailId(email);
        return ResponseEntity.ok(byId);
    }

    @GetMapping("/expense/{id}")
    public ResponseEntity<List<Expense>> getExpensesById(@PathVariable("id") Long id, @RequestParam("type") String type) throws UserNotFoundException {
        EndUser byId = userService.getById(id);
        List<Expense> li = byId.getExpenses();
        if (type.equals("need")) {
            li = li.stream().filter(el -> el.getCategory() == ExpenseCategory.NEED).toList();
        } else if (type.equals("want")) {
            li = li.stream().filter(el -> el.getCategory() == ExpenseCategory.WANT).toList();
        } else {
            li = byId.getExpenses();
        }
        return ResponseEntity.ok(li);
    }

    @GetMapping("/investment/{id}")
    public ResponseEntity<List<Investments>> getInvestmentsById(@PathVariable("id") Long id) throws UserNotFoundException {
        EndUser byId = userService.getById(id);
        return ResponseEntity.ok(byId.getInvestments());
    }

    @GetMapping("/subordinate/{id}")
    public ResponseEntity<List<Subordinate>> getSubordinateById(@PathVariable("id") Long id) throws UserNotFoundException {
        EndUser byId = userService.getById(id);
        return ResponseEntity.ok(byId.getSubordinates());
    }

    @GetMapping("/goal/{id}")
    public ResponseEntity<List<Goal>> getGoalById(@PathVariable("id") Long id, @RequestParam("status") String status) throws UserNotFoundException {
        EndUser byId = userService.getById(id);
        List<Goal> filteredGoal = new ArrayList<>();


        if (status.equalsIgnoreCase("approved")) {
            filteredGoal = byId.getGoals().stream().filter(el -> el.getGoalStatus().equals(GoalStatus.APPROVED)).toList();
        } else if (status.equalsIgnoreCase("rejected")) {
            filteredGoal = byId.getGoals().stream().filter(el -> el.getGoalStatus().equals(GoalStatus.REJECTED)).toList();
        } else if (status.equalsIgnoreCase("pending")) {
            filteredGoal = byId.getGoals().stream().filter(el -> el.getGoalStatus().equals(GoalStatus.PENDING)).toList();
        } else {
            filteredGoal = byId.getGoals();
        }
        return ResponseEntity.ok(filteredGoal);
    }

    @GetMapping("/goal/with-plan/{userId}")
    public ResponseEntity<List<Goal>> goalWithSomePlans(@PathVariable Long userId) throws UserNotFoundException {
        EndUser user = userService.getById(userId);
        List<Goal> pendingGoalWithPlans = user.getGoals().stream()
                .filter(el -> el.getGoalStatus().equals(GoalStatus.PENDING) &&
                        el.getPlans().stream().anyMatch(plan -> plan.getInstallments().size() > 0))
                .collect(Collectors.toList());

        return ResponseEntity.ok(pendingGoalWithPlans);
    }

    @GetMapping("/advisor/{id}")
    public ResponseEntity<Advisor> getAdvisorById(@PathVariable("id") Long id) throws UserNotFoundException {
        EndUser byId = userService.getById(id);
        return ResponseEntity.ok(byId.getAdvisor());
    }

    @GetMapping("/expense-pie/{id}")
    public ResponseEntity<List<List<String>>> getExpensePieChart(@PathVariable("id") Long id) throws UserNotFoundException {
        List<List<String>> lists = userService.expensePieData(id);
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/investment-pie/{id}")
    public ResponseEntity<List<List<String>>> getInvestmentPieChart(@PathVariable("id") Long id) throws UserNotFoundException {
        List<List<String>> lists = userService.investmentPieData(id);
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/external/predefined-list")
    public ResponseEntity<List<Map<String,String>>> givePredefinedList(){
        List<Map<String, String>> list = new ArrayList<>();

        Map<String, String> preMap1 = new HashMap<>();
        preMap1.put("title", "Emergency Fund Building");
        preMap1.put("description", "Save a specific amount of money in an emergency fund");
        list.add(preMap1);

        Map<String, String> preMap2 = new HashMap<>();
        preMap2.put("title", "Retirement Savings");
        preMap2.put("description", "Building a retirement nest egg is crucial for long-term financial security");
        list.add(preMap2);

        Map<String, String> preMap3 = new HashMap<>();
        preMap3.put("title", "Debt Repayment");
        preMap3.put("description", "Pay off a certain percentage or amount of outstanding debts");
        list.add(preMap3);

        Map<String, String> preMap4 = new HashMap<>();
        preMap4.put("title", "Investment Growth");
        preMap4.put("description", "Achieve a specific return on investment or increase the value of investment portfolios");
        list.add(preMap4);

        Map<String, String> preMap5 = new HashMap<>();
        preMap5.put("title", "Expense Reduction");
        preMap5.put("description", "Cut down on discretionary spending or reduce specific expenses");
        list.add(preMap5);

        Map<String, String> preMap6 = new HashMap<>();
        preMap6.put("title", "Savings for Specific Expenses");
        preMap6.put("description", "Save for a particular purpose, such as a vacation, home improvement, or a major purchase");
        list.add(preMap6);

        Map<String, String> preMap7 = new HashMap<>();
        preMap7.put("title", "Retirement Savings");
        preMap7.put("description", "Contribute a set amount to retirement accounts, such as a 401(k) or IRA");
        list.add(preMap7);

        Map<String, String> preMap8 = new HashMap<>();
        preMap8.put("title", "Education Fund");
        preMap8.put("description", "Save for educational expenses, either for personal development or for a child's education");
        list.add(preMap8);

        Map<String, String> preMap9 = new HashMap<>();
        preMap9.put("title", "Insurance Coverage");
        preMap9.put("description", "Review and ensure adequate insurance coverage, such as life insurance, health insurance, or property insurance");
        list.add(preMap9);

        Map<String, String> preMap10 = new HashMap<>();
        preMap10.put("title", "Charitable Giving");
        preMap10.put("description", "Allocate a portion of income for charitable donations or community contributions");
        list.add(preMap10);

        return ResponseEntity.ok(list);
    }

    @GetMapping("/generate/{id}")
    public ResponseEntity<String> generateFinancialAdvice(@PathVariable("id") Long id) {
        try {
            String financialAdvice = userService.generateAdvice(id);
            return ResponseEntity.ok()
                    .header("Content-Type", "text/html; charset=UTF-8")
                    .body(financialAdvice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating financial advice.");
        }
    }

    @GetMapping("/quotes")
    public ResponseEntity<Map<String, String>> getFinanceQuotes(){
        Map<String, String> financeQuotes = userService.getFinanceQuotes();
        return ResponseEntity.ok(financeQuotes);
    }
    
    @PostMapping("/update/income-info")
    public ResponseEntity<EndUser> updateIncomeDetail(@RequestBody IncomeInfoDTO dto) throws UserNotFoundException {
        EndUser endUser = userService.updateEndUserIncomeDetail(dto);
        return ResponseEntity.ok(endUser);
    }
}
