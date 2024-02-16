package com.virtusa.WealthsApp.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.virtusa.WealthsApp.enums.UserType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@PrimaryKeyJoinColumn(name = "advisor_id")
@Builder
public class Advisor extends User {

    String name;

    String phone;


    UserType userType = UserType.ADVISOR;

    @JsonIgnore
    @OneToMany(mappedBy = "advisor",cascade = CascadeType.MERGE)
    List<EndUser> endUsers;

    public void addEndUser(EndUser endUser){
        endUsers.add(endUser);
    }
}
