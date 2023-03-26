package com.example.finalproject.dto;

import com.example.finalproject.entity.Bid;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
@Data
public class TransactionDTO {
  private Integer id;
  private String status;

  private Long bidId;
  private String winningBidderEmail;
  private String auctioneerEmail;
  protected LocalDateTime createdAt;

  protected LocalDateTime lastModifiedDate;
}
