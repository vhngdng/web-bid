package com.example.finalproject.entity.listener;

import com.example.finalproject.dto.PaymentDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Payment;
import com.example.finalproject.mapstruct.Mapper;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PaymentListener {
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  @Autowired
  private Mapper mapper;

  @PostUpdate
  public void onPaymentUpdateAndSendNoti(Payment payment) {
    log.error("=============================================================================");
    if(payment.getStatus() != null && !payment.getOriginalStatus().equalsIgnoreCase(payment.getStatus())) {
      Bid bid = payment.getBid();
        // send noti to auctioneer
        log.error(bid.getAuctioneer().getEmail());
        PaymentDTO paymentDTO = mapper.toDTO(payment);
        paymentDTO.setAuctioneerEmail(payment.getBid().getAuctioneer().getEmail());
        paymentDTO.setWinningBidderEmail(payment.getBid().getWinningBidder().getEmail());
        paymentDTO.setNotification("PAYMENT");
        simpMessagingTemplate.convertAndSendToUser(bid.getAuctioneer().getEmail(), "private", paymentDTO);  //  /user/${name}/private

        // send noti to winner
        log.error(bid.getWinningBidder().getEmail());
        simpMessagingTemplate.convertAndSendToUser(bid.getWinningBidder().getEmail(), "private", paymentDTO);  //  /user/${name}/private
    }
  }
  @PostPersist
  public void onCreatePayment(Payment payment){
    Bid bid = payment.getBid();
    // send noti to auctioneer
    log.error(bid.getAuctioneer().getEmail());
    PaymentDTO paymentDTO = mapper.toDTO(payment);
    paymentDTO.setAuctioneerEmail(payment.getBid().getAuctioneer().getEmail());
    paymentDTO.setWinningBidderEmail(payment.getBid().getWinningBidder().getEmail());
    paymentDTO.setNotification("PAYMENT");
    simpMessagingTemplate.convertAndSendToUser(bid.getAuctioneer().getEmail(), "private", paymentDTO);  //  /user/${name}/private

    // send noti to winner
    log.error(bid.getWinningBidder().getEmail());
    simpMessagingTemplate.convertAndSendToUser(bid.getWinningBidder().getEmail(), "private", paymentDTO);
  }
}
