package com.virtusa.WealthsApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstallmentDTO {
    Double amount;

    Date payDate;


    Long planId;

    boolean paid;

    int idx;
}
