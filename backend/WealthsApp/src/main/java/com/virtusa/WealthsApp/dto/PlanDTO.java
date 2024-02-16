package com.virtusa.WealthsApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanDTO {
    Double percentage;
    Double totalAmount;

    String startDate;

    String endDate;

    Long goalId;

    boolean selected;
}
