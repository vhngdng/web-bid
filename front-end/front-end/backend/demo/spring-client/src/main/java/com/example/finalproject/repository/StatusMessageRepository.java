package com.example.finalproject.repository;

import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.entity.StatusMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusMessageRepository extends JpaRepository<StatusMessage,Integer> {
  StatusMessage findByName (STATUS_MESSAGE status);
}
