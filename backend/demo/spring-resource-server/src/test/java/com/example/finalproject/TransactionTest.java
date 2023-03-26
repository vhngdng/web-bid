package com.example.finalproject;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Message;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class TransactionTest {
  @Autowired
  TransactionRepository transactionRepository;
  @Autowired
  BidRepository bidRepository;
  @Test
  @Rollback(value = false)
  @Transactional
  public void findAllMessageInBidRoomActiveTest() {
    Bid bid = bidRepository.findById(40L).get();
//    Transaction transaction = Transaction.builder()
//            .status("PENDING").build();
//    transaction.setBid(bid);
//    transactionRepository.save(transaction);
//    System.out.println(bidRepository.findById(40L).get().getTransaction().getBid().getId());
    Transaction transaction = Transaction.builder()
            .status("FINISH").build();
    bid.setTransaction(transaction);
    bidRepository.save(bid);
  }

}
