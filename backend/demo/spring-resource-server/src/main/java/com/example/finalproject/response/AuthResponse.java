package com.example.finalproject.response;

import com.example.finalproject.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter @Setter
@Builder

public class AuthResponse {
  private String token;
  @JsonIgnore
  private final String type = "Bearer";
  @JsonProperty("isAuthenticated")
  private boolean isAuthenticated;
  private UserDetails auth;
  private String refreshToken;


}
