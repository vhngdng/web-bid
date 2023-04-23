package com.example.finalproject.projection.home;

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
  public String getPropertyName();
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
  @JsonIgnore
  public String getWinnerName();
  @JsonIgnore
  public String getAuctioneerName();
  default People getAuctioneer() {
    return People
            .builder()
            .id(getAuctioneerId())
            .avatar(getAuctioneerAvatar())
            .name(getAuctioneerName())
            .build();
  }

  default String getTypeSearch() {
    return "BID";
  }
  default People getWinningBidder() {
    return People
            .builder()
            .id(getWinnerId())
            .avatar(getWinnerAvatar())
            .name(getWinnerName())
            .build();
  }

  ;

  default PropertyHome getProperty() {
    return PropertyHome
            .builder()
            .name(getPropertyName())
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
    public String name;
  }

  @AllArgsConstructor
  @Builder
  class PropertyHome {
    public Integer id;
    public String name;
    public String imageProperty;
    public Long quantity;
    public String category;
  }
}
