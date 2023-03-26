package com.example.finalproject.security.OAuth2.userInfo.handler;


import com.example.finalproject.entity.User;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.security.OAuth2.CustomOAuth2User;
import com.example.finalproject.service.RefreshTokenService;
import com.example.finalproject.service.UserService;
import com.example.finalproject.utils.JwtUtils;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientId;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//    super.onAuthenticationSuccess(request, response, authentication);
//    response.setStatus(200);
//    Cookie cookie = new Cookie("JSESSIONID", null);
//    cookie.setHttpOnly(true);
//    cookie.setSecure(true);
//    cookie.setPath("/");
//    cookie.setMaxAge(0);
//    response.addCookie(cookie);
////    Optional<OAuth2AuthorizedClientEntity> oAuth2AuthorizedClient = oAuth2AuthorizedClientRepo.findById(new OAuth2AuthorizedClientId(((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId(), authentication.getName()));
//    if (oAuth2AuthorizedClient.isPresent() ) {
//      response.getWriter().write(gson.toJson(authenticationService.loginWithCryptedPassword(oAuth2AuthorizedClient.get().getUserDetails().getUsername(), oAuth2AuthorizedClient.get().getUserDetails().getPassword())));
//      response.setContentType("application/json");
//      response.setCharacterEncoding("UTF-8");
//      response.getWriter().flush();
//    } else {
//      response.setHeader("Authorization", jwtService.createTempToken(((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId(), authentication.getName()));
//    }
  }

  @Override
  protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response) {
    return "";
  }
}
