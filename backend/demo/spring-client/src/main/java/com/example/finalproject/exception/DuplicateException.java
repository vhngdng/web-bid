package com.example.finalproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestClientException;
public class DuplicateException extends RuntimeException {
  public DuplicateException(String msg) {
    super(msg);
  }
}
