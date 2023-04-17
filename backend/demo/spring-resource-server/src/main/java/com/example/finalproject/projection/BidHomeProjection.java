package com.example.finalproject.projection;

import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.Payment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
@JsonSerialize
public interface BidHomeProjection {
  public Long getId();

  public String getType();

  public LocalDateTime getDayOfSale();

  public String getConditionReport();

  public String getStatus();

  public Long getReservePrice();

  public Long getPriceStep();

  public Long getLastPrice();

  @JsonInclude(JsonInclude.Include.NON_NULL)
  public int getCountAttendees();

  @JsonIgnore
  public Integer getPropertyId();

  @JsonIgnore
  public String getPropertyImageId();

  @JsonIgnore
  public Long getQuantity();

  @JsonIgnore
  public String getCategory();

  @JsonIgnore
  public Long getAuctioneerId();

  @JsonIgnore
  public String getAuctioneerAvatar();

  @JsonIgnore
  public Long getWinnerId();

  @JsonIgnore
  public String getWinnerAvatar();

  default People getAuctionner() {
    return People
            .builder()
            .id(getAuctioneerId())
            .avatar(getAuctioneerAvatar())
            .build();
  }

  default People getWinningBidder() {
    return People
            .builder()
            .id(getWinnerId())
            .avatar(getWinnerAvatar())
            .build();
  }

  ;

  default PropertyHome getProperty() {
    return PropertyHome
            .builder()
            .id(getPropertyId())
            .category(getCategory())
            .quantity(getQuantity())
            .imageProperty(getPropertyImageId())
            .build();
  }

  ;

  @AllArgsConstructor
  @Builder
  class People {
    public Long id;
    public String avatar;
  }

  @AllArgsConstructor
  @Builder
  class PropertyHome {
    public Integer id;
    public String imageProperty;
    public Long quantity;
    public String category;
  }
}
