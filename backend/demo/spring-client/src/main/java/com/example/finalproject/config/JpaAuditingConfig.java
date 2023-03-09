package com.example.finalproject.config;

//import com.example.finalproject.Auditor.CustomAuditorAware;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.LocalDateTime;
import java.util.Optional;

@Configuration
//@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.example.finalproject.repository")
@EnableJpaAuditing(auditorAwareRef = "auditorProvider", dateTimeProviderRef = "auditingDateTimeProvider")
@Slf4j
public class JpaAuditingConfig {
  @Bean(name = "auditorProvider")
  @Scope(value= ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public AuditorAware<String> auditorProvider() {
    return () -> {
      Authentication authentication
              = SecurityContextHolder.getContext().getAuthentication();
      log.debug("current authentication:" + authentication);

      if (authentication == null || !authentication.isAuthenticated()) {
        // return a default value if no user is authenticated
        return Optional.of("anonymous");
      } else {
        // return the username of the authenticated user
        return Optional.of(authentication.getName());
      }

    };

  }

  @Bean(name = "auditingDateTimeProvider")
  public DateTimeProvider dateTimeProvider() {
    return () -> Optional.of(LocalDateTime.now());
  }
}
