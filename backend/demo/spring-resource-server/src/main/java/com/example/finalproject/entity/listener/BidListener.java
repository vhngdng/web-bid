package com.example.finalproject.entity.listener;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.request.ChangeBidStatusRequest;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

  @PostPersist
  private void sendNoti(Bid bid) {
    simpMessagingTemplate.convertAndSendToUser(bid.getProperty().getOwner().getEmail(), "private", "test" );
  }
}
