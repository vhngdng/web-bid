package com.example.finalproject.entity;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.Provider;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class User {
  @Id
  @Column(name = "user_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "username")
  @Size(min = 6, max = 64, message = "The length of username is not valid")
  private String username;
  @Column
  @Size(min = 6, max = 64, message = "The length of password is not valid")
  private String password;
  @Column
  @Email
  private String email;
  @Column(nullable = false, columnDefinition = "boolean default false")
  private boolean emailVerified;
  @Column
  private String avatar;

  @Column(name = "enabled", nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
  private boolean enabled = true;

  @Enumerated(EnumType.STRING)
  private Provider provider;

  private String providerId;

  @ManyToMany(cascade = {CascadeType.DETACH,
          CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinTable(
          name = "users_roles",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<Role> roles = new HashSet<>();

  @OneToMany(mappedBy = "auctioneer", fetch = FetchType.LAZY)
  @JsonIgnore
  private List<Bid> auctioneerBids;
  @OneToMany(mappedBy = "winningBidder", fetch = FetchType.LAZY)
  @JsonIgnore
  private List<Bid> winningBidderBids;
  @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
  @JsonBackReference
  private List<Property> properties;

//  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//  private List<BidParticipant> bidParticipants;
  public void addRole(Role role) {
    this.roles.add(role);
  }

  public User(String username, String password, String email, boolean enabled, Provider provider, Set<Role> roles) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.enabled = enabled;
    this.provider = provider;
    this.roles = roles;
  }
  @CreatedDate
  @Column(name = "creationDate", updatable = false)
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  private LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  private String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "lastModifiedDate")
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  private LocalDateTime lastModifiedDate;
//  @CreatedDate
//  @Column(name = "creationDate", updatable = false)
//  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
//  protected LocalDateTime createdAt;
//
//  @LastModifiedBy
//  @Column(name = "lastModifiedBy")
//  protected String lastModifiedBy;
//
//  @LastModifiedDate
//  @Column(name = "lastModifiedDate")
//  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
//  protected LocalDateTime lastModifiedDate;

//  @Override
//  public Collection<? extends GrantedAuthority> getAuthorities() {
//    return convertRoleToAuthorities(this.roles);
//  }
//
//  @JsonIgnore
//  @Override
//  public String getPassword() {
//    return new BCryptPasswordEncoder().encode(this.password);
//  }
//  @JsonIgnore
//  @Override
//  public String getUsername() {
//    return this.email;
//  }
//  @JsonIgnore
//  @Override
//  public boolean isAccountNonExpired() {
//    return true;
//  }
//  @JsonIgnore
//  @Override
//  public boolean isAccountNonLocked() {
//    return true;
//  }
//  @JsonIgnore
//  @Override
//  public boolean isCredentialsNonExpired() {
//    return true;
//  }
//  @JsonIgnore
//  @Override
//  public boolean isEnabled() {
//    return true;
//  }
//
//
//  private Collection<? extends GrantedAuthority> convertRoleToAuthorities(Set<Role> roles) {
//    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName().toString())).collect(Collectors.toSet());
//  }
}
