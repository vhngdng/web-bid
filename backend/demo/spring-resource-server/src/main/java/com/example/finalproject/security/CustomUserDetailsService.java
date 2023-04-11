package com.example.finalproject.security;

import com.example.finalproject.entity.Role;
import com.example.finalproject.entity.User;

import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Override
  @Transactional
  public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    log.error(email);
    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() -> new NotFoundException("User not found with : " + email));
    return CustomUserDetails.builder()
            .email(user.getEmail())
            .password(user.getPassword())
            .authorities(convertRoleToAuthorities(user.getRoles()))
            .build();
  }

  private Collection<? extends GrantedAuthority> convertRoleToAuthorities(Set<Role> roles) {
    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName().toString())).collect(Collectors.toSet());
  }

//  @Override
//  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//    OAuth2User user = super.loadUser(userRequest);
//    return new CustomUserDetails(user);
//  }
}
