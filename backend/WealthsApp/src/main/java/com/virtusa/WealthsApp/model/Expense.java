package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.virtusa.WealthsApp.enums.ExpenseCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Expense {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long expId;
	private ExpenseCategory category;
	private String description;

	private Double amount;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JsonIgnore
	private EndUser user;
}
