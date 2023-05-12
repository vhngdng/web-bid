package com.example.finalproject.controller;

import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.RefreshToken;
import com.example.finalproject.entity.User;
import com.example.finalproject.request.SignUpRequest;
import com.example.finalproject.response.AuthResponse;
import com.example.finalproject.security.CustomUserDetails;
import com.example.finalproject.service.Impl.RefreshTokenService;
import com.example.finalproject.service.Impl.UserService;
import com.example.finalproject.utils.JwtUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtUtils jwtUtils;
  @Autowired
  private RefreshTokenService refreshTokenService;

  @GetMapping("user/me")
  @PreAuthorize("hasRole('USER')")
  public User getCurrentUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return (User) auth;
  }

  @GetMapping("user")
  @JsonIgnoreProperties("roles")
  public UserDTO getUserByEmail() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return userService.findUserByEmail(email);
  }

  @GetMapping("admin/user/{id}")
  public ResponseEntity<?> findUserInfoById(@PathVariable Long id) {
    return ResponseEntity.ok(userService.findUserInfoById(id));
  }

  @CrossOrigin(value = "*", maxAge = 3600)
  @PostMapping("create/user")
  public ResponseEntity<?> createUser(@RequestBody SignUpRequest request) {
    CustomUserDetails userDetails = (CustomUserDetails) userService.createUser(request);
    String jwtToken = jwtUtils.generateTokenFromEmail(userDetails.getUsername());
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername());
    return ResponseEntity.ok(AuthResponse
        .builder()
        .token(jwtToken)
        .auth(userDetails)
        .refreshToken(refreshToken.getToken())
        .isAuthenticated(true)
        .build());
  }

  @GetMapping("user/notification")
  public ResponseEntity<?> findNotification() {
    return ResponseEntity.ok(userService.findNotification());
  }
}
