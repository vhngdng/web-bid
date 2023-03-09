package com.example.finalproject.entity;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, unique = true)
  private STATUS_TRANSACTION status;

  public Transaction(STATUS_TRANSACTION status) {
    this.status = status;
  }
}
