package com.example.finalproject.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentRequest {
  private String status;
  private Long bidId;
}
