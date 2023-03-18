package com.example.finalproject.exception;

import lombok.*;

import java.time.LocalDateTime;
@Builder
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class ErrorMessage {
  private int status;
  private LocalDateTime timestamp;
  private Object message;
}
