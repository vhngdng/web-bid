package com.example.finalproject.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionRequest {
  private String status;
  private Long bidId;
}
