package com.example.finalproject.security;


import com.example.finalproject.security.OAuth2.CustomOAuth2UserService;
import com.example.finalproject.security.OAuth2.userInfo.handler.OAuth2AuthenticationFailureHandler;
import com.example.finalproject.security.OAuth2.userInfo.handler.OAuth2AuthenticationSuccessHandler;
import com.example.finalproject.security.entryPoint.CustomAccessDenied;
import com.example.finalproject.security.entryPoint.CustomAuthenticationEntryPoint;
import com.example.finalproject.security.filter.CustomFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

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
  private final CustomOAuth2UserService customOAuth2UserService;
  private final ClientRegistrationRepository clientRegistrationRepository;

  @Bean
  public AuthorizationRequestRepository<OAuth2AuthorizationRequest>
  authorizationRequestRepository() {
    return new HttpSessionOAuth2AuthorizationRequestRepository();
  }

  @Bean
  public OAuth2AuthorizedClientManager authorizedClientManager(
          ClientRegistrationRepository clientRegistrationRepository,
          OAuth2AuthorizedClientRepository authorizedClientRepository) {

    OAuth2AuthorizedClientProvider authorizedClientProvider =
            OAuth2AuthorizedClientProviderBuilder.builder()
                    .authorizationCode()
                    .refreshToken()
                    .clientCredentials()
                    .build();

    DefaultOAuth2AuthorizedClientManager authorizedClientManager =
            new DefaultOAuth2AuthorizedClientManager(
                    clientRegistrationRepository, authorizedClientRepository);
    authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

    return authorizedClientManager;
  }

//  @Bean
//  public RestOperations restOperations() {
//    return new RestTemplate();
//  }


  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http

            .csrf(csrf -> csrf.disable())
            .cors()
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/auth/**", "/oauth2/**", "/ws/**", "/bid/**", "/images/**").permitAll()
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
            .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class)
//            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
//            .oauth2Login()
//            .successHandler(oAuth2AuthenticationSuccessHandler)
//            .oauth2ResourceServer().jwt();
            .oauth2Login(oauth2 -> {
              try {
                oauth2
//                        .authorizationEndpoint(e -> e
//                                        .baseUri("/oauth2/authorize")
//                                                .authorizationRequestRepository(authorizationRequestRepository())
//                        )
//                        .redirectionEndpoint(r ->
//                                r.baseUri("/oauth2/callback/*")
//                        )
//                        .tokenEndpoint().accessTokenResponseClient(new RestOAuth2AccessTokenResponseClient(restOperations()))
                        .userInfoEndpoint().userService(customOAuth2UserService)
                        .and()
//                        .successHandler(oAuth2AuthenticationSuccessHandler)
//                                .failureHandler(oAuth2AuthenticationFailureHandler)
//                                .defaultSuccessUrl("/success", true)
                        .and()
                        .logout(l -> l
                                .logoutSuccessUrl("/")
                                .invalidateHttpSession(true)
                                .clearAuthentication(true)
                                .deleteCookies("JSESSIONID"));
              } catch (Exception e) {
                throw new RuntimeException(e);
              }
            });
//            .oauth2Client(client -> client);
    return http.build();

  }


}
