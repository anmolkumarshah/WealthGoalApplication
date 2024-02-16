package com.virtusa.WealthsApp.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Embeddable
@Data
public class PersonalDetail {

    @NotNull
    String name;

    String dob;

    @NotNull
    String address;

    @Size(min = 10)
    String phone;

}
