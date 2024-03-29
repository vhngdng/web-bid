package com.example.finalproject.service.Impl;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.DuplicateException;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.UserInfo;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.RoleRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.SignUpRequest;
import com.example.finalproject.response.Notification;
import com.example.finalproject.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
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
  @Autowired
  private CustomUserDetailsService customUserDetailsService;
  @Value("${jwt.secret}")
  private String Secret;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private PaymentService paymentService;
  @Autowired
  private PropertyRepository propertyRepository;

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
@Transactional
  public UserDetails createUser(SignUpRequest request) {
    Optional<User> user = userRepository.findByEmail(request.getEmail());
    if(user.isPresent()){
      throw new DuplicateException("Email " + request.getEmail() + " is existed");
    }
    User newUser = User
            .builder()
            .username(request.getUsername())
            .password(request.getPassword())
            .email(request.getEmail())
            .enabled(true)
            .roles(new HashSet<>())
            .build();
    if(request.getSecret() != null && request.getSecret().equals(Secret)) {
      newUser.addRole(roleRepository.findByName(EROLE.ROLE_ADMIN).get());
    }
    newUser.addRole(roleRepository.findByName(EROLE.ROLE_USER).get());
    userRepository.save(newUser);
    return customUserDetailsService.loadUserByUsername(newUser.getEmail());
  }

  public Notification findNotification() {
    return Notification.builder()
            .paymentNotifications(paymentService.getAllPaymentBidFinish())
            .propertyNotifications(mapper.toListPropertyNotification(propertyRepository.findNotificationByUser(SecurityContextHolder.getContext().getAuthentication().getName())))
            .build();
  }

  public void handleLogInLogOut(String email, String type) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User with email: " + email + "is not found"));
    user.setOnline(type.equalsIgnoreCase("online"));
  }

  public List<User> findAdminOnline() {
    return userRepository.findAdminOnline();
  }
}
