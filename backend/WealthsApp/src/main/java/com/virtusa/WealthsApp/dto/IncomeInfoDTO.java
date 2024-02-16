package com.virtusa.WealthsApp.dto;

import com.virtusa.WealthsApp.enums.EmploymentType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class IncomeInfoDTO {

    Long endUserId;

    @NotNull
    String incomeSource;

    @Min(0)
    Double monthlySalary;

    EmploymentType employmentType;
}
