package com.example.finalproject.entity.listener;

import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.mapstruct.Mapper;
import jakarta.persistence.PostUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TransactionListener {
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  @Autowired
  private Mapper mapper;

  @PostUpdate
  public void onTransactionUpdateAndSendNoti(Transaction transaction) {
    log.error("=============================================================================");
    if(transaction.getStatus() != null && !transaction.getOriginalStatus().equalsIgnoreCase(transaction.getStatus())) {
      if(transaction.getStatus().equalsIgnoreCase(STATUS_TRANSACTION.SUCCESS.name())) {
        Bid bid = transaction.getBid();
        // send noti to auctioneer
        log.error(bid.getAuctioneer().getEmail());
        simpMessagingTemplate.convertAndSendToUser(bid.getAuctioneer().getEmail(), "private", mapper.toDTO(transaction));  //  /user/${name}/private

        // send noti to winner
        log.error(bid.getWinningBidder().getEmail());
        simpMessagingTemplate.convertAndSendToUser(bid.getWinningBidder().getEmail(), "private", mapper.toDTO(transaction));  //  /user/${name}/private
      }
    }
  }
}
