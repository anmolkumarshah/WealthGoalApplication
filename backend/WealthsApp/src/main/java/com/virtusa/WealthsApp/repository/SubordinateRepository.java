package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Subordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubordinateRepository extends JpaRepository<Subordinate, Long> {


}
