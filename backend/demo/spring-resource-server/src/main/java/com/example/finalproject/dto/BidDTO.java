package com.example.finalproject.dto;

import com.example.finalproject.entity.Property;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.entity.User;
import com.example.finalproject.projection.Attendee;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BidDTO {
  private Long id;
  private String type;
  private LocalDateTime dayOfSale;
  private String conditionReport;
  private String status;
  private Long reservePrice;   // giá khởi điểm
  private Long priceStep;  // bước giá
  private Long updatePrice;
  private Long lastPrice;
  @JsonProperty("auctioneer")
  @JsonIgnoreProperties("roles")
  private UserDTO auctioneer;
  @JsonProperty("winningBidder")
  @JsonIgnoreProperties("roles")
  private UserDTO winningBidder;
//  @JsonProperty("auctionParticipants")
//  @JsonIgnoreProperties("roles")
//  private List<UserDTO> auctionParticipants;
  private Transaction transaction;
  private PropertyDTO property;
  private List<Attendee> attendees;
}
