package com.example.finalproject.entity;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.Provider;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
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

import java.io.Serializable;
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
public class User implements Serializable{
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

  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
  private boolean isOnline;
  @Enumerated(EnumType.STRING)
  private Provider provider;

  private String providerId;

  @ManyToMany(cascade = {CascadeType.DETACH,
          CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinTable(
          name = "users_roles",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  @JsonManagedReference
  private Set<Role> roles = new HashSet<>();

  @OneToMany(mappedBy = "auctioneer", fetch = FetchType.LAZY)
  @JsonBackReference
  private List<Bid> auctioneerBids;
  @OneToMany(mappedBy = "winningBidder", fetch = FetchType.LAZY)
  @JsonBackReference
  private List<Bid> winningBidderBids;
  @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
  @JsonBackReference
  private List<Property> properties;

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
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  private LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  private String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "lastModifiedDate")
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  private LocalDateTime lastModifiedDate;

}
