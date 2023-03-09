package com.example.springauthorizationserver.repository;

import com.example.springauthorizationserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findUserByUsername(String username);

  Optional<User> findByEmail(String email);

}
