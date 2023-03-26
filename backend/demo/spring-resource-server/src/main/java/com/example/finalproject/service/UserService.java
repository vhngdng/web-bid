package com.example.finalproject.service;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.User;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private Mapper mapper;
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

  public UserDTO findUserByEmail(String email) {
    return mapper.toDTO(userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email " + email + " is not found")));
  }
}
