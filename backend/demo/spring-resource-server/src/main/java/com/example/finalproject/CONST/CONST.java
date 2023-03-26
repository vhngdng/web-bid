package com.example.finalproject.CONST;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public interface CONST {

  String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";

  String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";

  int cookieExpireSeconds = 180;

  // Token có hạn trong vòng 10' kể từ thời điểm tạo, thời gian tính theo giây
  Integer duration = 10 * 60 * 60 ;

  // RefreshTokenDuration có hạn trong vòng 24 giờ kể từ thời điểm tạo, thời gian tính theo giây
  Integer refreshTokenDuration = 24 * 60 * 60;
}
