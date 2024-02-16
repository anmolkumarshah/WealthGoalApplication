package com.virtusa.WealthsApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.virtusa.WealthsApp.enums.Relation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Subordinate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String dob;

    private Relation relation;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    private EndUser user;

    @OneToMany(cascade = CascadeType.MERGE,mappedBy = "subordinate")
    @JsonIgnore
    List<Goal> goals =  new ArrayList<>();

    public void addGoal(Goal goal){
        goals.add(goal);
    }

}
