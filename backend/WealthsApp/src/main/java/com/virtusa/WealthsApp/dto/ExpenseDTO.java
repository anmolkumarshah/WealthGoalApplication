package com.virtusa.WealthsApp.dto;

import com.virtusa.WealthsApp.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {
	private ExpenseCategory category;
	private String description;

	private double amount;
	private long userId;
}
