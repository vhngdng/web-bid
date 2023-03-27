package com.example.finalproject.projection;

import java.time.LocalDateTime;

public interface TransactionProject {
  public Integer getId();
  public String getStatus();

  public Long getBidId();
  public String getWinningBidderEmail();
  public String getAuctioneerEmail();
  public LocalDateTime getCreatedAt();
  public Long getLastPrice();
  public LocalDateTime getLastModifiedDate();
}
