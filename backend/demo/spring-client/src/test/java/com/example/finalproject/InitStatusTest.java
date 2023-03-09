package com.example.finalproject;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import com.example.finalproject.entity.StatusBid;
import com.example.finalproject.entity.StatusMessage;
import com.example.finalproject.entity.StatusTransaction;
import com.example.finalproject.repository.StatusBidRepository;
import com.example.finalproject.repository.StatusMessageRepository;
import com.example.finalproject.repository.StatusTransactionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InitStatusTest {


  @Autowired
  private StatusMessageRepository statusMessageRepository;
  @Autowired
  private StatusTransactionRepository statusTransactionRepository;
  @Autowired
  private StatusBidRepository statusBidRepository;


  @Test
  @Rollback(value = false)
  void save_statusMessage() {
    statusMessageRepository.save(new StatusMessage(STATUS_MESSAGE.JOIN));
    statusMessageRepository.save(new StatusMessage(STATUS_MESSAGE.MESSAGE));
    statusMessageRepository.save(new StatusMessage(STATUS_MESSAGE.LEAVE));
  }

  @Test
  @Rollback(value = false)
  void save_statusTransaction() {
    statusTransactionRepository.save(new StatusTransaction(STATUS_TRANSACTION.PENDING));
    statusTransactionRepository.save(new StatusTransaction(STATUS_TRANSACTION.FAIL));
    statusTransactionRepository.save(new StatusTransaction(STATUS_TRANSACTION.SUCCESS));
  }

  @Test
  @Rollback(value = false)
  void save_statusBid() {
    statusBidRepository.save(new StatusBid(STATUS_BID.ACTIVE));
    statusBidRepository.save(new StatusBid(STATUS_BID.DEACTIVE));
    statusBidRepository.save(new StatusBid(STATUS_BID.FINISH));
    statusBidRepository.save(new StatusBid(STATUS_BID.PROCESSING));

  }
}
