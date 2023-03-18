package com.example.finalproject.entity;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
@DynamicUpdate
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Column(name = "status", nullable = false, unique = false)
  private String status;
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bid_id")
  @JsonBackReference
  private Bid bid;

  @CreatedDate
  @Column(name = "createdAt", updatable = false, unique = true)
  protected LocalDateTime createdAt;
  @CreatedBy
  @Column(name = "createdBy", updatable = false)
  private String createdBy;
  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  protected String lastModifiedBy;
  @LastModifiedDate
  @Column(name = "lastModifiedDate")
  protected LocalDateTime lastModifiedDate;
}
