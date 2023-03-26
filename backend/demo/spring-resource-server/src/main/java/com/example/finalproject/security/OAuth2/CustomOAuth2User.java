package com.example.finalproject.security.OAuth2;

import com.example.finalproject.entity.User;
import com.example.finalproject.security.CustomUserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {
  private String email;

  private Collection<? extends GrantedAuthority> authorities;
  private Map<String, Object> attributes;

  public CustomOAuth2User(String email, Collection<? extends GrantedAuthority> authorities) {
    this.email = email;
    this.authorities = authorities;
  }

  public static CustomOAuth2User create(User user) {
    List<GrantedAuthority> authorities = Collections.
            singletonList(new SimpleGrantedAuthority("ROLE_USER"));

    return new CustomOAuth2User(
            user.getEmail(),
            authorities
    );
  }
//  private static CustomOAuth2User create(User user, Map<String, Object> attributes) {
//    CustomOAuth2User userPrincipal = CustomOAuth2User.create(user);
//    userPrincipal.setAttributes(attributes);
//    return userPrincipal;
//  }
  @Override
  public Map<String, Object> getAttributes() {
    return this.attributes;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.authorities;
  }

  @Override
  public String getName() {
    return this.email;
  }

  public void setAttributes(Map<String, Object> attributes) {
    this.attributes = attributes;
  }
}
