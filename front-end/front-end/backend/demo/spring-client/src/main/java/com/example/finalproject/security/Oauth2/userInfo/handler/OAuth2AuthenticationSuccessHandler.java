package com.example.finalproject.security.Oauth2.userInfo.handler;

import com.example.finalproject.security.CustomUserDetails;
import com.example.finalproject.service.UserService;
import com.example.finalproject.utils.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler{
  private final UserService userService;
  private final JwtUtils jwtUtils;
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
    CustomUserDetails oauthUser = (CustomUserDetails) authentication.getPrincipal();
//    log.info(oauthUser.getEmail());
//    String email = authentication.getName();
//    userService.processOAuth2PostLogin(email);
//    String token2 = String.valueOf(token.getAccessToken());
//    log.info(token);
//    Cookie cookie = new Cookie("JWT", token);
//    cookie.setPath("/");
//    response.addCookie(cookie);
//    response.sendRedirect("http://localhost:5173");
  }
}
