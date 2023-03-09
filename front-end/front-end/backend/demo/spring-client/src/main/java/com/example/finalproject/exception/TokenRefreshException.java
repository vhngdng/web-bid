package com.example.finalproject.exception;


public class TokenRefreshException extends RuntimeException {
  private static final long serialVersionUID = 1L;


  public TokenRefreshException(String token,String msg) {
    super(String.format("Failed for [%s]: %s", token, msg));
  }
}
