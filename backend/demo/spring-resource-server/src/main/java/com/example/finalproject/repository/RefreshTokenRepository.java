package com.example.finalproject.repository;


import com.example.finalproject.entity.RefreshToken;
import com.example.finalproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
  Optional<RefreshToken> findByToken(String token);
  Optional<RefreshToken> findByUser_Email(String email);

  @Modifying
  int deleteByUser(User user);

  @Modifying
  void deleteByUser_Email(String email);
}
