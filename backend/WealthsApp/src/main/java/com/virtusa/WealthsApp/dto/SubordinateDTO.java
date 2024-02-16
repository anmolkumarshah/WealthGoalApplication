package com.virtusa.WealthsApp.dto;

import com.virtusa.WealthsApp.enums.Relation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubordinateDTO {

    private String name;
    private String dob;

    private Relation relation;

    private Long userId;
}
