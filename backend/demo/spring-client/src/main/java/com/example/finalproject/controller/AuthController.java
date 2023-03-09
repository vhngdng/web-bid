package com.example.finalproject.controller;

import com.example.finalproject.entity.RefreshToken;
import com.example.finalproject.exception.TokenRefreshException;
import com.example.finalproject.request.LoginRequest;
import com.example.finalproject.request.TokenRefreshRequest;
import com.example.finalproject.response.AuthResponse;
import com.example.finalproject.response.TokenRefreshResponse;
import com.example.finalproject.service.RefreshTokenService;
import com.example.finalproject.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@Slf4j
public class AuthController {
  @Autowired
  private AuthenticationConfiguration authenticationConfiguration;

  @Autowired
  private JwtUtils jwtUtils;
  @Autowired
  private RefreshTokenService refreshTokenService;

  @CrossOrigin(value = "*", maxAge = 3600)
  @PostMapping("login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
    // Tao doi tuong
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            loginRequest.getEmail(),
            loginRequest.getPassword()
    );
    // Xác thực từ username và password.

    Authentication authentication = authenticationConfiguration.getAuthenticationManager().authenticate(token);
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String jwtToken = jwtUtils.generateToken(authentication);
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername());
    return ResponseEntity.ok(AuthResponse
            .builder()
            .token(jwtToken)
            .auth(userDetails)
            .refreshToken(refreshToken.getToken())
            .isAuthenticated(true)
            .build());

  }
  @PostMapping("refresh-token")
  public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
    String requestRefreshToken = request.getRefreshToken();
    return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
              String token = jwtUtils.generateTokenFromEmail(user.getEmail());
              log.info(token);

              return ResponseEntity.ok(TokenRefreshResponse.builder().accessToken(token).refreshToken(requestRefreshToken).build());
            })
            .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                    "Refresh token is not in database!"));
  }
}
