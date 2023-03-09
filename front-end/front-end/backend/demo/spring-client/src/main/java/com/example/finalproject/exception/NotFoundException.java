package com.example.finalproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestClientException;
@ResponseStatus(HttpStatus.OK  )
public class NotFoundException extends RestClientException {

  public NotFoundException(String msg) {
    super(msg);
  }

}
