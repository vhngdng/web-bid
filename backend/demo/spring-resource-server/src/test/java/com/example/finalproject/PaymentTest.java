package com.example.finalproject;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Payment;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.PaymentRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class PaymentTest {
  @Autowired
  PaymentRepository PaymentRepository;
  @Autowired
  BidRepository bidRepository;
  @Test
  @Rollback(value = false)
  @Transactional
  public void findAllMessageInBidRoomActiveTest() {
    Bid bid = bidRepository.findById(40L).get();
//    Payment Payment = Payment.builder()
//            .status("PENDING").build();
//    Payment.setBid(bid);
//    PaymentRepository.save(Payment);
//    System.out.println(bidRepository.findById(40L).get().getPayment().getBid().getId());
    Payment payment = Payment.builder()
            .status("FINISH").build();
    bid.setPayment(payment);
    bidRepository.save(bid);
  }

}
