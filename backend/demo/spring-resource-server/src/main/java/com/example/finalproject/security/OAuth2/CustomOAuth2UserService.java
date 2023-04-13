package com.example.finalproject.security.OAuth2;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.OAuth2AuthenticationProcessingException;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.security.CustomUserDetails;
import com.example.finalproject.security.OAuth2.userInfo.OAuth2UserInfo;
import com.example.finalproject.security.OAuth2.userInfo.OAuth2UserInfoFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
  private final UserRepository userRepository;

  public CustomOAuth2UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    try {
      return processOAuth2User(userRequest, oAuth2User);
    }catch (AuthenticationException ex) {
      throw ex;
    }catch(Exception e) {
      throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
    }
  }

  private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
    log.info(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
    OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
    if(!StringUtils.hasLength(oAuth2UserInfo.getEmail())) {
      throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
    }

    Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
    User user;
    if(userOptional.isPresent()) {
      user = userOptional.get();
      if(!user.getProvider().equals(Provider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase()))) {
        throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                user.getProvider() + " account. Please use your " + user.getProvider() +
                " account to login.");
      }
      user = updateExistingUser(user, oAuth2UserInfo);
    }else {
      user = registerNewUser(oAuth2UserRequest ,oAuth2UserInfo);
    }
    return CustomOAuth2User.create(user);
  }
  @Transactional
  public User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
    User user = User
            .builder()
            .provider(Provider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))
            .providerId(oAuth2UserInfo.getId())
            .username(oAuth2UserInfo.getName())
            .email(oAuth2UserInfo.getEmail())
            .build();

    return userRepository.save(user);
  }
  @Transactional
  public User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
    existingUser.setUsername(oAuth2UserInfo.getName());
    return userRepository.save(existingUser);
  }
}
