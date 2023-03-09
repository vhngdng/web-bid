package com.example.finalproject.request;

import com.example.finalproject.entity.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpSertBid {

  private String type;
  private LocalDateTime dayOfSale;
  private String conditionReport;
  private Long reservePrice;   // giá khởi điểm
  private Long priceStep;  // bước giá
  private Long updatePrice;
  private Long lastPrice;

  private User auctioneer;
  private User winningBidder;


  private Transaction transaction;

  private Property property;
}
