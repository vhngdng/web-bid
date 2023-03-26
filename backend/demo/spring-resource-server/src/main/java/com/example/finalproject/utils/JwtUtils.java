package com.example.finalproject.utils;

import com.example.finalproject.CONST.CONST;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class JwtUtils {
//  @Value("${app.auth.tokenExpirationMsec}")
//  private final long duration = CONST.duration;

  private SecretKey secretKey;

  @Value("${jwt.secret}")
  public void setSecret(String secret) {
    this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  public String generateToken(Authentication authentication) {
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    Map<String, Object> claims = new HashMap<>();
    claims.put("authorities", userDetails.getAuthorities());

    return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + CONST.duration * 1000))
            .signWith(secretKey, SignatureAlgorithm.HS512)
            .compact();
  }

  public String generateTokenFromEmail(String email) {
    // Lưu thông tin Authorities của user vào claims

    return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + CONST.duration * 1000))
            .signWith(secretKey)
            .compact();
  }

  // Lấy thông tin được lưu trong token
  public Claims getClaimsFromToken(String token) {
    // Kiểm tra token có bắt đầu bằng tiền tố
    if (token == null ) return null;
    return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody();
  }

  public String getEmailFromJwtToken(String token) {
    return getClaimsFromToken(token).getSubject();

  }

  public boolean validateJwtToken(String token, HttpServletResponse response) throws IOException {
    try {
      return !Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().isEmpty();
    } catch (AccessDeniedException e) {
      throw new AccessDeniedException("Access denied");
    }  catch (MalformedJwtException e) {
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Invalid JWT token: {}");
    } catch (ExpiredJwtException e) {
      log.error("JWT token is expired: {}", e.getMessage());
      throw e;
    } catch (UnsupportedJwtException e) {
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "JWT token is unsupported: {}");
    } catch (IllegalArgumentException e) {
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "JWT claims string is empty: {}");
    } catch(UsernameNotFoundException e) {
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error");
    }
    return false;
  }


}
