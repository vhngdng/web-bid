package com.example.finalproject.dto;

import jakarta.persistence.Column;
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
  private String notification;
  protected LocalDateTime lastModifiedDate;
}
