package com.virtusa.WealthsApp.dto;

import com.virtusa.WealthsApp.enums.GoalPriority;
import com.virtusa.WealthsApp.enums.GoalStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalDTO {
	
	private String goalTitle;
	private Long goalCreatedBy; //userId
	private String goalDescription;
	private GoalPriority goalPriority;
	private GoalStatus goalStatus;
	private double goalAmount;
	private Date goalStartDate;
	private Date goalEndDate;
	private int riskFactor;

	private long subordinateId;

}
