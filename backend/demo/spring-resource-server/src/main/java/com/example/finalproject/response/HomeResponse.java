package com.example.finalproject.response;

import com.example.finalproject.entity.User;
import com.example.finalproject.projection.home.BidHomeProjection;
import com.example.finalproject.projection.home.PropertyHomeProjection;
import com.example.finalproject.projection.home.UserHomeProjection;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeResponse {
  private List<BidHomeProjection> bidFamousTop5;
  private List<BidHomeProjection> bidEarliestTop5;
  private List<UserHomeProjection> userRateTop5;
  private List<PropertyHomeProjection> propertyTop5;
}
