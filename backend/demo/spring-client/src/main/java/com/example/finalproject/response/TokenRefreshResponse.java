package com.example.finalproject.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder

public class TokenRefreshResponse {
  private String accessToken;
  private String refreshToken;
  @JsonIgnore
  private final String tokenType = "Bearer";
}
