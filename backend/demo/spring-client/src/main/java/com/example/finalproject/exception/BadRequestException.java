package com.example.finalproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestClientException;
public class BadRequestException extends RuntimeException {
  public BadRequestException(String msg) {
    super(msg);
  }

  public BadRequestException(String msg, Throwable ex) {
    super(msg, ex);
  }
}
