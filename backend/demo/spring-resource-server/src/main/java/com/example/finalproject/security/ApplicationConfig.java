package com.example.finalproject.security;

import com.example.finalproject.entity.Role;
import com.example.finalproject.entity.User;
import com.example.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
public class ApplicationConfig {

  @Autowired
  private UserRepository userRepository;

  // Tạo đối tượng mã hóa
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Tạo đối tượng UserDetailsService để tìm kiếm user
  @Bean
  public UserDetailsService userDetailsService() {
    return new UserDetailsService() {
      @Override
      public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with : " + email));
        return CustomUserDetails.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .authorities(convertRoleToAuthorities(user.getRoles()))
                .build();
      }
    };
  }
  private Collection<? extends GrantedAuthority> convertRoleToAuthorities(Set<Role> roles) {
    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName().toString())).collect(Collectors.toSet());
  }

  @Bean
  @Scope(value= ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
    daoAuthenticationProvider.setUserDetailsService(userDetailsService());
    return daoAuthenticationProvider;
  }


}
