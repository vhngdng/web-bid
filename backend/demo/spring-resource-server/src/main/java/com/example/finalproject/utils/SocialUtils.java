package com.example.finalproject.utils;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.OAuth2AuthenticationProcessingException;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.RoleRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.security.CustomUserDetails;
import com.example.finalproject.security.CustomUserDetailsService;
import com.example.finalproject.security.OAuth2.CustomOAuth2User;
import com.example.finalproject.security.OAuth2.userInfo.OAuth2UserInfo;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SocialUtils {
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private ImageRepository imageRepository;
  @Value("${spring.security.oauth2.client.registration.google.client-id}")
  private String CLIENT_ID_GOOGLE;

  @Autowired
  private CustomUserDetailsService customUserDetailsService;
  @Autowired
  private UserRepository userRepository;

  public UserDetails handleOAuth2Login(String idTokenString) throws GeneralSecurityException, IOException {
    HttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();
    JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            .setAudience(Collections.singletonList(CLIENT_ID_GOOGLE)).build();
    log.error(verifier.getIssuer());
    GoogleIdToken idToken = verifier.verify(idTokenString);
    GoogleIdToken.Payload payload;
    if (idToken != null) {
      payload = idToken.getPayload();

      // Print user identifier
      String userId = payload.getSubject();
      System.out.println("User ID: " + userId);

      // Get profile information from payload
      String email = payload.getEmail();
//      boolean emailVerified = payload.getEmailVerified();
//      String name = (String) payload.get("name");
//      String pictureUrl = (String) payload.get("picture");
//      String locale = (String) payload.get("locale");
//      String familyName = (String) payload.get("family_name");
//      String givenName = (String) payload.get("given_name");
      System.out.println("Email: " + idToken.getPayload().getEmail());
      Optional<User> userOptional = userRepository.findByEmail(email);
      User user;
      if (userOptional.isPresent()) {
        user = userOptional.get();
        user = updateExistingUser(user, payload);
      } else {
        user = registerNewUser(payload);
      }
      List<GrantedAuthority> authorities = Collections.
              singletonList(new SimpleGrantedAuthority("ROLE_USER"));
      return new CustomUserDetails(user.getEmail(), null, authorities);

    } else {
      throw new GeneralSecurityException("IdToken fail");
    }

  }

  @Transactional
  private User registerNewUser(GoogleIdToken.Payload payload) {
    User user = User
            .builder()
            .provider(Provider.GOOGLE)
            .providerId(payload.getSubject())
            .username((String) payload.get("name"))
            .email(payload.getEmail())
            .roles(new HashSet<>())
            .build();
    user.addRole(roleRepository.findById(1).get());
    return userRepository.save(user);
  }

  @Transactional
  private User updateExistingUser(User existingUser, GoogleIdToken.Payload payload) {
    existingUser.setUsername((String) payload.get("name"));
    if (existingUser.getAvatar() == null &&
            !imageRepository.findByUserIdAndTypeAvatar(existingUser.getId()).isPresent() &&
            payload.get("picture") != null
    ) {
      existingUser.setAvatar((String) payload.get("picture"));
    }
    return userRepository.save(existingUser);
  }

}

