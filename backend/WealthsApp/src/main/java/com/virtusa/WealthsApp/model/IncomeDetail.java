package com.virtusa.WealthsApp.model;

import com.virtusa.WealthsApp.enums.EmploymentType;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Embeddable
@Data
public class IncomeDetail {
    @NotNull
    String incomeSource;

    @Min(0)
    Double monthlySalary;

    EmploymentType employmentType;
}
