package com.example.finalproject.repository;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.entity.StatusBid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusBidRepository extends JpaRepository<StatusBid, Integer> {
  StatusBid findByStatus(STATUS_BID status);
}