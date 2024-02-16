package com.virtusa.WealthsApp.dto;

import com.virtusa.WealthsApp.enums.InvestmentCategory;
import com.virtusa.WealthsApp.enums.InvestmentPriority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentDTO {

	private InvestmentPriority priority;
	private InvestmentCategory category;
	private String description;
	private double amount;
	private long userId;
}
