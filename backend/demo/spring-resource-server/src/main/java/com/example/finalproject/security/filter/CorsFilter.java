//package com.example.finalproject.security.filter;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//public class CorsFilter extends OncePerRequestFilter {
//  private final String allowedOrigin;
//
//  public CorsFilter(String allowedOrigin) {
//    this.allowedOrigin = allowedOrigin;
//  }
//
//  @Override
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
//    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//    response.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
//    response.setHeader("Access-Control-Allow-Credentials", "true");
//    response.setHeader("Access-Control-Max-Age", "3600");
//  }
//}
