package com.example.finalproject.entity;

import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "statusTransaction")
public class StatusTransaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, unique = true)
  private STATUS_TRANSACTION name;

  @OneToMany(mappedBy = "status", fetch = FetchType.EAGER)
  @JsonBackReference
  private List<Transaction> message;

  public StatusTransaction(STATUS_TRANSACTION name) {
    this.name = name;
  }
}
