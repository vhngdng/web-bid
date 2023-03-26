package com.example.finalproject.security.OAuth2.userInfo;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {
  public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
    if(registrationId.equalsIgnoreCase(Provider.GOOGLE.name())){
      return new GoogleOAuth2UserInfo(attributes);
    }else {
      throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
    }
  }
}
