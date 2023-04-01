package com.example.finalproject.controller;

import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.User;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.service.UserService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserService userService;

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
}
