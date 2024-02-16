package com.virtusa.WealthsApp.repository;

import com.virtusa.WealthsApp.model.Installment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstallmentRepository extends JpaRepository<Installment,Long> {
}
