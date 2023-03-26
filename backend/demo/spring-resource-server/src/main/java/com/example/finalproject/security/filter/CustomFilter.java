package com.example.finalproject.security.filter;

import com.example.finalproject.security.CustomUserDetailsService;
import com.example.finalproject.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Slf4j
@Component
@RequiredArgsConstructor
public class CustomFilter extends OncePerRequestFilter {
  @Autowired
  private JwtUtils jwtUtils;
  @Autowired
  private CustomUserDetailsService userDetailsService;
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    //Lấy token ra từ header
    // Authorization Bear
    String authorizationToken = request.getHeader("Authorization");
    if (authorizationToken == null || !authorizationToken.startsWith("Bearer")) {
      filterChain.doFilter(request, response);
      return;
    }
    String token = authorizationToken.substring(7);

    // check validate token
    if (jwtUtils.validateJwtToken(token, response)) {
      String email = jwtUtils.getEmailFromJwtToken(token);
      UserDetails userDetails = userDetailsService.loadUserByUsername(email);
      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    log.error("testttttttttttttttttttttttttttttttt");

    filterChain.doFilter(request, response);
  }
}
