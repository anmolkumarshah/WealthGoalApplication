package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.virtusa.WealthsApp.enums.InvestmentCategory;
import com.virtusa.WealthsApp.enums.InvestmentPriority;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Investments {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long instId;
	private InvestmentPriority priority;
	private InvestmentCategory category;
	private String description;

	private double amount;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JsonIgnore
	private EndUser user;
}
