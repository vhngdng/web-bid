package com.example.finalproject.security;


import com.example.finalproject.security.CustomUserDetailsService;
import com.example.finalproject.security.Oauth2.userInfo.handler.OAuth2AuthenticationFailureHandler;
import com.example.finalproject.security.Oauth2.userInfo.handler.OAuth2AuthenticationSuccessHandler;
import com.example.finalproject.security.entryPoint.CustomAccessDenied;
import com.example.finalproject.security.entryPoint.CustomAuthenticationEntryPoint;
import com.example.finalproject.security.filter.CustomFilter;
import com.example.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.cors.CorsConfiguration;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
  //
  private final CustomFilter customFilter;
  private final CustomAuthenticationEntryPoint authEntryPoint;
  private final CustomAccessDenied accessDenied;
  private final AuthenticationProvider authenticationProvider;
  private final CustomUserDetailsService customUserDetailsService;
  private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
  private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
  @Bean
  public AuthorizationRequestRepository<OAuth2AuthorizationRequest>
  authorizationRequestRepository() {

    return new HttpSessionOAuth2AuthorizationRequestRepository();
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http

            .csrf(csrf -> csrf.disable())
            .cors()
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/auth/**", "/oauth2/**", "/ws/**", "/bid/**").permitAll()
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .requestMatchers("/user/**", "/participant/").hasAnyRole("USER", "GUEST", "ADMIN")
            .anyRequest()
            .authenticated()
            .and()
            .formLogin().disable()
            .exceptionHandling()
            .authenticationEntryPoint(authEntryPoint)
            .accessDeniedHandler(accessDenied)
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);

//            .oauth2Login(oauth2 -> {
//                      try {
//                        oauth2
//                                .authorizationEndpoint(e ->
//                                        e
//                                                .baseUri("/oauth2/authorize")
//                                                .authorizationRequestRepository(authorizationRequestRepository())
//                                )
//                                .redirectionEndpoint(r ->
//                                        r.baseUri("/oauth2/callback/*")
//                                )
//                                .userInfoEndpoint().userService(customUserDetailsService)
//                                .and()
//                                .successHandler(oAuth2AuthenticationSuccessHandler)
//                                .failureHandler(oAuth2AuthenticationFailureHandler)
//                                .and()
//                                .logout(l -> l
//                                        .logoutSuccessUrl("/")
//                                        .invalidateHttpSession(true)
//                                        .clearAuthentication(true)
//                                        .deleteCookies("JSESSIONID"));
//                      } catch (Exception e) {
//                        throw new RuntimeException(e);
//                      }
//                    }
//            );
    return http.build();

  }


}
