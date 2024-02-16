package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    Double percentage;
    Double totalAmount;

    String startDate;

    String endDate;

    boolean selected;

    double progress;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    Goal goal;

    @OneToMany(mappedBy = "plan",cascade = CascadeType.MERGE)
    @JsonIgnore
    List<Installment> installments = new ArrayList<>();

    public void addInstallment(Installment installment){
        installments.add(installment);
    }

}
