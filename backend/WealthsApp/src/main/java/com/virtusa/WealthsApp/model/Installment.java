package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Installment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    Double amount;

    Date payDate;

    Date paidOn;

    boolean paid;



    int idx;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    Plan plan;
}
