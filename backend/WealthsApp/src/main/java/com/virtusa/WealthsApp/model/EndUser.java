package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.virtusa.WealthsApp.enums.UserType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = {"goals","subordinates","expenses","investments"})
@PrimaryKeyJoinColumn(name = "end_user_id")
public class EndUser extends User {

    UserType userType ;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    @JsonIgnore
    Advisor advisor;

    @Embedded
    PersonalDetail personalDetail;

    @Embedded
    IncomeDetail incomeDetail;

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.MERGE)
    List<Goal> goals =  new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.MERGE)
    List<Subordinate> subordinates = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.MERGE)
    List<Expense> expenses =  new ArrayList();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.MERGE)
    List<Investments> investments =  new ArrayList();

    public void addGoal(Goal goal) {
        goals.add(goal);
    }

    public void addSubordinate(Subordinate subordinate) {
        subordinates.add(subordinate);
    }

    public void addExpense(Expense expense) {
        expenses.add(expense);
    }

    public void addInvestment(Investments investment) {
        investments.add(investment);
    }
}
