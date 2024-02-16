package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtusa.WealthsApp.enums.GoalPriority;
import com.virtusa.WealthsApp.enums.GoalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long goalId;
	private String goalTitle;

	private String goalDescription;
	private GoalPriority goalPriority;
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private GoalStatus goalStatus;
	private double goalAmount;
	private Date goalStartDate;
	private Date goalEndDate;
	private int riskFactor;

	@ManyToOne(cascade = CascadeType.MERGE)
	private  EndUser user;

	@ManyToOne(cascade = CascadeType.MERGE)
	Subordinate subordinate;

	@OneToMany(mappedBy = "goal",cascade = CascadeType.MERGE)
	@JsonIgnore
	List<Plan> plans = new ArrayList<>();

	public void addPlan(Plan plan){
		plans.add(plan);
	}

	
}
