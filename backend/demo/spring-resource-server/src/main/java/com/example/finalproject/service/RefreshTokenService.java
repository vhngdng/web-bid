package com.example.finalproject.service;

import com.example.finalproject.CONST.CONST;
import com.example.finalproject.entity.RefreshToken;
import com.example.finalproject.exception.TokenRefreshException;
import com.example.finalproject.repository.RefreshTokenRepository;
import com.example.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {


  @Autowired
  private RefreshTokenRepository refreshTokenRepository;
  @Autowired
  private UserRepository userRepository;


  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }
  @Transactional
  public RefreshToken createRefreshToken(String email) {
    if(refreshTokenRepository.findByUser_Email(email).isPresent()) {
      refreshTokenRepository.deleteByUser_Email(email);
    }
    RefreshToken refreshToken = RefreshToken
            .builder()
            .user(userRepository.findByEmail(email).get())
            .expiryDate(Instant.now().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).plusSeconds(CONST.refreshTokenDuration).toInstant())
            .token(UUID.randomUUID().toString())
            .build();
    return refreshTokenRepository.save(refreshToken);
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
    if(token.getExpiryDate().isBefore(Instant.now())) {
      userRepository.findByEmail(token.getUser().getEmail()).ifPresent(u -> u.setOnline(false));
      refreshTokenRepository.delete(token);
      throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
    }
    return token;
  }

  @Transactional
  public void deleteByUserId(Long userId) {
    refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
  }

  public void deleteByEmail(String email) {
    refreshTokenRepository.deleteByUser_Email(email);
  }
}
