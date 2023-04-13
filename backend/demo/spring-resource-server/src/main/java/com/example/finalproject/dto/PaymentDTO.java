package com.example.finalproject.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class PaymentDTO {
  private Integer id;
  private String status;

  private Long bidId;
  private String winningBidderEmail;
  private String auctioneerEmail;
  protected LocalDateTime createdAt;

  protected LocalDateTime lastModifiedDate;
}
