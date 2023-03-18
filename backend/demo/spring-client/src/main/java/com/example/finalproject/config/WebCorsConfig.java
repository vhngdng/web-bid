package com.example.finalproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCorsConfig implements WebMvcConfigurer {
  @Value("${app.cors.allowedOrigins}")
  private String[] allowedOrigins;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
            .addMapping("/**")
            .allowedOriginPatterns(allowedOrigins)
            .allowedMethods("GET", "POST", "PUT", "DELETE");
//
//    registry.addMapping("/login")
//            .allowedOrigins("*")
//            .allowedMethods("POST")
//            .maxAge(3600);
//    registry
//            .addMapping("/images")
//            .allowedOriginPatterns(allowedOrigins)
//            .allowCredentials(true)
//            .allowedHeaders("*")
//            .allowedMethods("GET", "POST", "PUT", "DELETE")
//            .maxAge(3600);
  }
}
