package com.virtusa.WealthsApp.repository;


import com.virtusa.WealthsApp.model.EndUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EndUserRepository extends JpaRepository<EndUser,Long> {
    Optional<EndUser> getByEmail(String email);
}
