package com.virtusa.WealthsApp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Profile {

    EndUser info;

    List<Goal> goals;

    List<Expense> expenses;

    List<Investments> investments;

    List<Subordinate> subordinates;

}
