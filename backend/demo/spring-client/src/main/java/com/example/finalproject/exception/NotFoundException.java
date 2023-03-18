package com.example.finalproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestClientException;
public class NotFoundException extends RuntimeException {

  public NotFoundException(String msg) {
    super(msg);
  }

}
