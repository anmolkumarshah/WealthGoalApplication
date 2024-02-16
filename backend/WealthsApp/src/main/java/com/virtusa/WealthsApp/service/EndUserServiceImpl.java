package com.virtusa.WealthsApp.service;


import com.virtusa.WealthsApp.dto.IncomeInfoDTO;
import com.virtusa.WealthsApp.enums.ExpenseCategory;
import com.virtusa.WealthsApp.enums.Relation;
import com.virtusa.WealthsApp.enums.UserType;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.*;
import com.virtusa.WealthsApp.repository.AdvisorUserRepository;
import com.virtusa.WealthsApp.repository.EndUserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.*;

import java.text.DecimalFormat;

@Service
@Transactional
public class EndUserServiceImpl implements EndUserService {
    @Autowired
    EndUserRepository endUserRepository;

    @Autowired
    AdvisorUserRepository advisorUserRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public EndUser save(EndUser endUser) {
        endUser.setPassword(passwordEncoder.encode(endUser.getPassword()));
        return endUserRepository.save(endUser);
    }

    @Override
    public EndUser getById(Long id) throws UserNotFoundException {
        Optional<EndUser> byId = endUserRepository.findById(id);
        if (byId.isEmpty()) {
            throw new UserNotFoundException(id.toString());
        }
        return byId.get();
    }

    @Override
    public EndUser getByEmailId(String email) throws UserNotFoundException {
        Optional<EndUser> byEmail = endUserRepository.getByEmail(email);
        if (byEmail.isEmpty()) {
            throw new UserNotFoundException(email);
        }
        return byEmail.get();
    }

    @Override
    public void setAdvisor(Long endUserId, Long advisorId) {
        Optional<EndUser> byId1 = endUserRepository.findById(endUserId);
        Optional<Advisor> byId = advisorUserRepository.findById(advisorId);
        if (byId.isPresent() && byId1.isPresent()) {
            if (byId1.get().getUserType().equals(UserType.EXTERNAL)) {
                // no advisor for external user
            } else {
                EndUser endUser = byId1.get();
                Advisor advisor = byId.get();
                endUser.setAdvisor(advisor);
                advisor.addEndUser(endUser);
                advisorUserRepository.save(advisor);
            }

        }

    }


    public List<List<String>> expensePieData(Long Id) throws UserNotFoundException {
        EndUser byId = getById(Id);
        double totalExpenses = byId.getExpenses().stream().map(Expense::getAmount)
                .reduce(0.0, (acc, ex) -> ex + acc);

        double needCount = byId.getExpenses().stream()
                .filter(el -> el.getCategory().equals(ExpenseCategory.NEED))
                .map(Expense::getAmount)
                .reduce(0.0, (acc, ex) -> ex + acc);
        double wantCount = byId.getExpenses().stream()
                .filter(el -> el.getCategory().equals(ExpenseCategory.WANT))
                .map(Expense::getAmount)
                .reduce(0.0, (acc, ex) -> ex + acc);


        List<List<String>> li = new ArrayList<>();
        li.add(0, List.of("NEED", "WANT"));


        try {

            Double needPer = 0.0;
            Double wantPer = 0.0;
            needPer = (((double) needCount / totalExpenses) * 100);
            wantPer = (((double) wantCount / totalExpenses) * 100);
            DecimalFormat decimalFormat = new DecimalFormat("##.##");
            li.add(1, List.of(decimalFormat.format(needPer), decimalFormat.format(wantPer)));
            return li;
        } catch (ArithmeticException e) {
            li.add(1, List.of("0", "0"));
            return li;
        }

    }

    public List<List<String>> investmentPieData(Long Id) throws UserNotFoundException {
        EndUser byId = getById(Id);
        List<Investments> totalInvestments = byId.getInvestments();
        Double totalInvestmentAmt = totalInvestments.stream()
                .map(Investments::getAmount)
                .reduce(0.0, Double::sum);
        List<String> label = totalInvestments.stream().map(el -> el.getCategory().toString()).toList();
        List<String> perc = new ArrayList<>();
        for (String type : label) {
            Double invesForType = totalInvestments.stream()
                    .filter(el -> el.getCategory().toString().equals(type))
                    .map(el -> el.getAmount())
                    .reduce(0.0, (acc, ce) -> acc + ce);
            System.out.println(invesForType);
            try {
                Double per = (invesForType / totalInvestmentAmt) * 100;
                DecimalFormat decimalFormat = new DecimalFormat("##.##");
                perc.add(decimalFormat.format(per));
            } catch (Exception e) {
                perc.add("0.0");
            }
        }

        return List.of(label, perc);
    }

    public String generateAdvice(Long userId) throws UserNotFoundException {
        EndUser endUser = getById(userId);
        Advisor advisor = endUser.getAdvisor();

        StringBuilder advice = new StringBuilder();

        // Start by providing some general advice
        advice.append("Dear ").append(endUser.getPersonalDetail().getName()).append(",\n");

        if (advisor != null) {
            advice.append("Here is your personalized financial advice from your advisor, ").append(advisor.getName()).append(":\n");
        } else {
            advice.append("This is an auto-generated message for you by the system:\n");
        }

        // Provide advice based on income details
        advice.append("\n1. Income Advice:\n");
        advice.append("   - Your monthly salary from ").append(endUser.getIncomeDetail().getIncomeSource());
        advice.append(" is  ").append(formatCurrency(endUser.getIncomeDetail().getMonthlySalary())).append(".\n");

        // Provide advice based on expenses
        double totalExpenses = 0.0;
        advice.append("\n2. Expense Management:\n");
        advice.append("   - Analyze your expenses and consider reducing spending in the following areas:\n");
        for (Expense expense : endUser.getExpenses()) {
            advice.append("      - ").append(expense.getDescription()).append(":  ").append(formatCurrency(expense.getAmount())).append("\n");
            totalExpenses += expense.getAmount();
        }
        advice.append("\n   - Total Monthly Expenses:  ").append(formatCurrency(totalExpenses)).append("\n");

        // Suggest areas for expense reduction
        if (totalExpenses > endUser.getIncomeDetail().getMonthlySalary()) {
            advice.append("   - ALERT: Your expenses exceed your monthly income. Consider cutting back on discretionary spending.\n");
        }

        // Provide advice based on expenses category
        double totalNeedsExpenses = 0.0;
        double totalWantsExpenses = 0.0;

        advice.append("\n3. Expense Advice:\n");
        advice.append("   - Analyze your expenses based on category:\n");

        for (Expense expense : endUser.getExpenses()) {
            advice.append("      - ").append(expense.getDescription()).append(":  ")
                    .append(formatCurrency(expense.getAmount())).append(" (Category: ").append(expense.getCategory()).append(")\n");

            if (expense.getCategory() == ExpenseCategory.NEED) {
                totalNeedsExpenses += expense.getAmount();
            } else if (expense.getCategory() == ExpenseCategory.WANT) {
                totalWantsExpenses += expense.getAmount();
            }
        }

        // Provide advice based on expenses category
        advice.append("\n   - Total Needs Expenses:  ").append(formatCurrency(totalNeedsExpenses)).append("\n");
        advice.append("   - Total Wants Expenses:  ").append(formatCurrency(totalWantsExpenses)).append("\n");

        // Suggest managing wants and needs
        if (totalWantsExpenses > totalNeedsExpenses) {
            advice.append("   - ALERT: Your wants expenses exceed your needs expenses. Consider reducing discretionary spending on wants.\n");
        } else {
            advice.append("   - Great job! Your needs are prioritized over wants. Keep it up!\n");
        }

        // Provide advice based on monthly salary
        double monthlySalary = endUser.getIncomeDetail().getMonthlySalary();
        advice.append("\n5. Monthly Salary Advice:\n");
        advice.append("   - Motivation: Increase your monthly salary to enhance your financial well-being.\n");

        // Provide advice based on overall financial health
        double savingsPercentage = (monthlySalary - totalExpenses) / monthlySalary * 100;
        advice.append("\n6. Financial Health:\n");
        advice.append("   - Savings Percentage: ").append(String.format("%.2f%%", savingsPercentage)).append("\n");

        // Motivate to increase savings
        if (savingsPercentage < 20) {
            advice.append("   - Motivation: Consider increasing your savings to build a stronger financial foundation.\n");
        } else {
            advice.append("   - Great job! You are saving a significant portion of your income. Keep it up!\n");
        }

        // Provide advice based on investment portfolio
        double totalInvestments = 0.0;
        advice.append("\n4. Investment Advice:\n");
        advice.append("   - Review your investment portfolio:\n");
        for (Investments investment : endUser.getInvestments()) {
            advice.append("      - ").append(investment.getDescription()).append(":  ").append(formatCurrency(investment.getAmount())).append("\n");
            totalInvestments += investment.getAmount();
        }
        advice.append("\n   - Total Investments:  ").append(formatCurrency(totalInvestments)).append("\n");

        // Suggest making additional investments
        if (totalInvestments < endUser.getIncomeDetail().getMonthlySalary()) {
            advice.append("   - Consider increasing your investments to grow your wealth over time.\n");
        }

        // Provide advice based on goals
        double totalGoalAmount = 0.0;
        advice.append("\n5. Goal Advice:\n");
        advice.append("   - Review your financial goals:\n");
        for (Goal goal : endUser.getGoals()) {
            advice.append("      - ").append(goal.getGoalTitle()).append(":  ").append(formatCurrency(goal.getGoalAmount())).append("\n");
            totalGoalAmount += goal.getGoalAmount();
        }
        advice.append("\n   - Total Goal Amount:  ").append(formatCurrency(totalGoalAmount)).append("\n");

        // Suggest prioritizing goals
        if (totalGoalAmount > totalInvestments) {
            advice.append("   - Consider prioritizing your goals and allocating more funds to high-priority goals.\n");
        }

        // Add a closing statement
        advice.append("\nRemember to consult with your advisor for personalized advice.\n");

        return advice.toString();
    }

    // Helper method to format currency
    private String formatCurrency(double amount) {
        NumberFormat indianCurrencyFormat = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
        return indianCurrencyFormat.format(amount);
    }

    public EndUser updateEndUserIncomeDetail(IncomeInfoDTO dto) throws UserNotFoundException {
        EndUser endUser = getById(dto.getEndUserId());
        IncomeDetail incomeDetail = modelMapper.map(dto, IncomeDetail.class);
        endUser.setIncomeDetail(incomeDetail);
        return endUserRepository.save(endUser);
    }

    public Map<String, String> getFinanceQuotes() {
        Map<String, String> financeQuotes = new HashMap<>();

        financeQuotes.put("Warren Buffett", "The best investment you can make is in yourself.");
        financeQuotes.put("Dave Ramsey", "Don't buy things you can't afford, with money you don't have, to impress people you don't like.");
        financeQuotes.put("Suze Orman", "Owning a home is a keystone of wealth - both financial affluence and emotional security.");
        financeQuotes.put("Robert Kiyosaki", "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.");
        financeQuotes.put("Warren Buffett", "Risk comes from not knowing what you're doing.");
        financeQuotes.put("George S. Clason", "Start thy purse to fattening.");
        financeQuotes.put("John C. Bogle", "The stock market is a giant distraction to the business of investing.");
        financeQuotes.put("Benjamin Franklin", "An investment in knowledge pays the best interest.");
        financeQuotes.put("Jim Rohn", "Formal education will make you a living; self-education will make you a fortune.");
        financeQuotes.put("Peter Lynch", "Know what you own, and know why you own it.");
        financeQuotes.put("Dave Ramsey", "Act your wage.");
        financeQuotes.put("Vicki Robin", "Savings without a spending plan has no purpose.");
        financeQuotes.put("Will Rogers", "Don't gamble; take all your savings and buy some good stock and hold it till it goes up, then sell it. If it don't go up, don't buy it.");
        financeQuotes.put("Paul Samuelson", "Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.");
        financeQuotes.put("John D. Rockefeller", "The major fortunes in America have been made in land.");
        financeQuotes.put("Napoleon Hill", "The starting point of all achievement is desire.");
        financeQuotes.put("George S. Clason", "Make thy gold multiply.");
        financeQuotes.put("Warren Buffett", "Price is what you pay. Value is what you get.");
        financeQuotes.put("Jim Rohn", "A lot of people don't do well simply because they major in minor things.");
        financeQuotes.put("Benjamin Graham", "The investor's chief problem—and even his worst enemy—is likely to be himself.");

        return financeQuotes;
    }

}
