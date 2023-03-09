package com.example.springauthorizationserver.entity;

import com.example.springauthorizationserver.ENUM.Provider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
@EntityListeners(AuditingEntityListener.class)
public class User extends AuditingEntity {
  @Id
  @Column(name = "user_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column(name = "username", unique = true)
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
}
