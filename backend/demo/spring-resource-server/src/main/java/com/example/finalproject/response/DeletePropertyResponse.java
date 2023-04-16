package com.example.finalproject.response;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeletePropertyResponse {
  private HttpStatus status;
  private String message;
  private Integer idProperty;
}
