package com.example.finalproject.exception;

import lombok.Builder;

import java.time.LocalDateTime;
@Builder
public class ErrorMessage {
  private int status;
  private LocalDateTime timestamp;
  private String message;
  private String error;
}
