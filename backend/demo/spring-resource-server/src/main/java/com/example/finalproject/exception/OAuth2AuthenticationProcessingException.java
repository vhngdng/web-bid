package com.example.finalproject.exception;

import org.springframework.web.client.RestClientException;

public class OAuth2AuthenticationProcessingException extends RuntimeException {
  public OAuth2AuthenticationProcessingException(String msg) {
    super(msg);
  }

  public OAuth2AuthenticationProcessingException(String msg, Throwable ex) {
    super(msg, ex);
  }
}
