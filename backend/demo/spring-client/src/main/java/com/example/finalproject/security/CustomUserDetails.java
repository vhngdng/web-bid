package com.example.finalproject.security;

import com.example.finalproject.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Builder
public class CustomUserDetails implements UserDetails {
//        , OAuth2User {
  private String email;
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

//  private OAuth2User oauth2User;

  public CustomUserDetails(String email, String password, Collection<? extends GrantedAuthority> authorities) {
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

//  public CustomUserDetails(OAuth2User oauth2User) {
//    this.oauth2User = oauth2User;
//  }

//
//  @Override
//  public Map<String, Object> getAttributes() {
//    return oauth2User.getAttributes();
//  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
//    if(oauth2User != null) {
//      return oauth2User.getAuthorities();
//    }
    return this.authorities;
  }
  @JsonIgnore
  @Override
  public String getPassword() {
    return new BCryptPasswordEncoder().encode(this.password);
  }

  @JsonProperty("email")
  @Override
  public String getUsername() {
    return this.email;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isEnabled() {
    return true;
  }

//  @Override
//  public String getName() {
//    return oauth2User.getAttribute("name");
//  }
//
//  public String getEmail() {
//    return oauth2User.getAttribute("email");
//  }


}
