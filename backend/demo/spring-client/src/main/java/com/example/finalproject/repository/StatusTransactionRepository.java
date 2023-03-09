package com.example.finalproject.repository;

import com.example.finalproject.entity.StatusTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusTransactionRepository extends JpaRepository<StatusTransaction, Integer> {
}