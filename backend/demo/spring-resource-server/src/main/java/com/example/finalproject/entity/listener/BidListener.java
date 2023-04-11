package com.example.finalproject.entity.listener;
import com.example.finalproject.dto.TransactionDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.TransactionRepository;
import com.example.finalproject.request.ChangeBidStatusRequest;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
public class BidListener {
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  @Autowired
  private Mapper mapper;

  @PostUpdate
  public void onBidUpdateAndSendNoti(Bid bid) {
    log.error("Count count count count");
    if(bid.getStatus() != null && !bid.getStatus().equalsIgnoreCase(bid.getOriginalStatus())){

      switch(bid.getStatus()) {
        case "FINISH": {
          log.error(bid.getStatus());
          log.error(bid.getOriginalStatus());

          ChangeBidStatusRequest request = ChangeBidStatusRequest
                  .builder()
                  .status(bid.getStatus())
                  .build();
          String destination = "/room/" + bid.getId().toString();
          // send message to finish bid
          simpMessagingTemplate.convertAndSend(destination, request);
          // send noti to auctioneer
          log.error(bid.getAuctioneer().getEmail());
          simpMessagingTemplate.convertAndSendToUser(bid.getAuctioneer().getEmail(), "private", mapper.toDTO(bid.getTransaction()));  //  /user/${name}/private

          // send noti to winner
          log.error(bid.getWinningBidder().getEmail());
          simpMessagingTemplate.convertAndSendToUser(bid.getWinningBidder().getEmail(), "private", mapper.toDTO(bid.getTransaction()));  //  /user/${name}/private
          break;
        }
        case "DEACTIVE": break;
        case "SUCCESS": {

          break;
        }
        default: {
          ChangeBidStatusRequest request = ChangeBidStatusRequest
                  .builder()
                  .status(bid.getStatus())
                  .build();
          String destination = "/room/" + bid.getId().toString();
          simpMessagingTemplate.convertAndSend(destination, request);
          break;
        }


      }
    }
  }

  @PreUpdate
  private void setDayOfSaleBasingOnStatus(Bid bid) {
    if(bid.getStatus().equalsIgnoreCase("ACTIVE") &&
            !bid.getDayOfSale().equals(bid.getLastModifiedDate())) {
      bid.setDayOfSale(LocalDateTime.now());
    }else if(bid.getStatus().equalsIgnoreCase("SUCCESS")) {
      bid.setFinishTime(bid.getLastModifiedDate());
    }
  }
}
