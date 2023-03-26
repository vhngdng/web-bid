package com.example.finalproject.request;

import com.example.finalproject.ENUM.Provider;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
  private Long userId;
  private String providerUserId;
  @NotEmpty
  private String displayName;
  @NotEmpty
  private String email;
  @Size(min = 6, message = "password length is not valid")
  private String password;

//
}
