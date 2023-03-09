package com.example.finalproject.service;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.entity.User;
import com.example.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public void processOAuth2PostLogin(String email) {
    Optional<User> user = userRepository.findByEmail(email);
    if(!user.isPresent()) {
      User newUser = User
              .builder()
              .email(email)
              .provider(Provider.GOOGLE)
              .enabled(true)
              .build();

      userRepository.save(newUser);
    }
  }
}
