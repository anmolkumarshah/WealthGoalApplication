package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan,Long> {
}
