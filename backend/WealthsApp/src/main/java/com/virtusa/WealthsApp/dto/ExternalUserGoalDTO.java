package com.virtusa.WealthsApp.dto;

import com.virtusa.WealthsApp.enums.GoalPriority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExternalUserGoalDTO {

    private Long userId;
    private double goalAmount;
    private double salaryPercentage;
    private String goalTitle;
    private String goalDescription;
    private Date goalStartDate;
    private Date goalEndDate;
    private GoalPriority goalPriority;
    private int riskFactor;
    private Long subordinateId;
}
