package com.example.finalproject.entity;

import com.example.finalproject.ENUM.EROLE;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "role")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false, unique = true)
  private EROLE name;

//    @ManyToMany(mappedBy = "roles")
//    private Collection<Employee> employees = new ArrayList<>();

  public Role(EROLE name) {
    this.name = name;
  }
}
