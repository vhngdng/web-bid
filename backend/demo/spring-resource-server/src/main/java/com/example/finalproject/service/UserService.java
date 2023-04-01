package com.example.finalproject.service;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.UserInfo;
import com.example.finalproject.repository.ImageRepository;
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
  @Autowired
  private ImageRepository imageRepository;

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
    return mapper.toDTO(userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email " + email + " is not found")), imageRepository);
  }

  public UserDTO findUserById(Long id) {
    return mapper.toDTO(userRepository.findById(id).orElseThrow(() -> new NotFoundException("User with id: " + id + " is not found")), imageRepository);
  }

  public UserInfo findUserInfoById(Long id) {
    return userRepository.findUserInfoById(id);
  }
}
