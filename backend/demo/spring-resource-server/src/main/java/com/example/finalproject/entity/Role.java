package com.example.finalproject.entity;

import com.example.finalproject.ENUM.EROLE;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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



  public Role(String name) {
    this.name = EROLE.valueOf(name.toUpperCase());
  }


}
