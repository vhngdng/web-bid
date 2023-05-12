package com.example.finalproject.security.OAuth2.userInfo.handler;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

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
