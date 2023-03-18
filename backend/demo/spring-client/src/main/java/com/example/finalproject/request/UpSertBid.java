package com.example.finalproject.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpSertBid {
  private Long id;
  private String type;
  private LocalDateTime dayOfSale;
  private String conditionReport;
  private Long reservePrice;   // giá khởi điểm
  private Long priceStep;  // bước giá
  private Long updatePrice;
  private Long lastPrice;
  private String status;
  private Long auctioneerId;
  private Long winningBidderId;
  private Integer transactionId;
  private Integer propertyId;
}
