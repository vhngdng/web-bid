package com.example.finalproject.request;

import com.example.finalproject.ENUM.Provider;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class SignUpRequest {
  private String secret;
  @NotEmpty
  @Size(min = 5, message = "The length of username is not valid")
  private String username;
  @NotEmpty
  @Email
  private String email;
  @NotEmpty
  @Size(min = 6, message = "password length is not valid")
  private String password;

  //
}
