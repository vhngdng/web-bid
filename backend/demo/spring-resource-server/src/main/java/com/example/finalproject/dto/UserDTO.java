package com.example.finalproject.dto;

import com.example.finalproject.entity.Role;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class UserDTO implements Serializable {
  private Long id;
  private String username;
  private String email;
  private String avatar;
  private Set<Role> roles = new HashSet<>();
}
