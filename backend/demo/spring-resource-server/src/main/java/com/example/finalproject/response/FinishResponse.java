package com.example.finalproject.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinishResponse {
  private Long id;
  private String status;
  private Long lastPrice;
  private String winningBidderUsername;
}
