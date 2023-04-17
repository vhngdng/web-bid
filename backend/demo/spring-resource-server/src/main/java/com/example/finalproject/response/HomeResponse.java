package com.example.finalproject.response;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeResponse {
  private List<Bid> ListBidTop5;
  private List<String> CategoryTop5;
  private List<User> UserRateTop5;
}
