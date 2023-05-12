package com.example.finalproject;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.entity.Role;
import com.example.finalproject.entity.User;
import com.example.finalproject.repository.RoleRepository;
import com.example.finalproject.repository.UserRepository;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.Rollback;

import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InitUserTest {
  @Autowired
  private Faker faker;


  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RoleRepository roleRepository;

  @Test
  @Rollback(value = false)
  void save_role() {
    roleRepository.save(new Role("ROLE_USER"));
    roleRepository.save(new Role("ROLE_ADMIN"));
    roleRepository.save(new Role("ROLE_GUEST"));
  }

  @Test
  @Rollback(value = false)
  void save_user() {
    for (int i = 0; i < 5; i++) {
      Set<Role> roles = new HashSet<>();
      User user = User.builder()
              .username(faker.name().fullName())
              .email(faker.internet().emailAddress())
              .password(faker.internet().password())
              .roles(roles)
              .enabled(true)
              .provider(Provider.LOCAL)
              .build();
      for (int j = 0; j < 3; j++) {
        int rd = new Random().nextInt(4);
        Optional<Role> role = roleRepository.findById(rd);
        role.ifPresent(user::addRole);

      }
      userRepository.save(user);

    }
  }


}

