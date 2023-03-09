package com.example.finalproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestClientException;
@ResponseStatus(HttpStatus.FORBIDDEN)
public class DuplicateException extends RestClientException {
  public DuplicateException(String msg) {
    super(msg);
  }
}
