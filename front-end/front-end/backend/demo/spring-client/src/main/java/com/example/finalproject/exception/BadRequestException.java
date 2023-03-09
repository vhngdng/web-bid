package com.example.finalproject.exception;

import org.springframework.web.client.RestClientException;

public class BadRequestException extends RestClientException {
  public BadRequestException(String msg) {
    super(msg);
  }

  public BadRequestException(String msg, Throwable ex) {
    super(msg, ex);
  }
}
