package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.model.EndUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdvisorUserRepository extends JpaRepository<Advisor,Long> {
    Optional<Advisor> getByEmail(String email);
}
