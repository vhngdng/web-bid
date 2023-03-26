package com.example.finalproject.entity;

import com.example.finalproject.entity.listener.TransactionListener;
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
@EntityListeners({AuditingEntityListener.class, TransactionListener.class})
@DynamicUpdate
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Column(name = "status", unique = false)
  private String status;
  @OneToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.LAZY)
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

  @Transient
  private String originalStatus;

  @PostLoad
  private void saveOriginalStatus() {
    this.originalStatus = this.status;
  }
}
