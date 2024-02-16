package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {


}
