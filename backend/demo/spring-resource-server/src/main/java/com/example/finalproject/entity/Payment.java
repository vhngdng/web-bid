package com.example.finalproject.entity;

import com.example.finalproject.entity.listener.PaymentListener;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
@EntityListeners({AuditingEntityListener.class, PaymentListener.class})
@DynamicUpdate
@Table(name = "payment")
public class Payment implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Column(name = "status", unique = false)
  private String status;
  @OneToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
  @JoinColumn(name = "bid_id", nullable = false)
  @JsonManagedReference
  private Bid bid;

  @CreatedDate
  @Column(name = "createdAt", updatable = false, unique = true)
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  protected LocalDateTime createdAt;
  @CreatedBy
  @Column(name = "createdBy", updatable = false)
  private String createdBy;
  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  protected String lastModifiedBy;
  @LastModifiedDate
  @Column(name = "lastModifiedDate")
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  protected LocalDateTime lastModifiedDate;

  @Transient
  private String originalStatus;

  @PostLoad
  private void saveOriginalStatus() {
    this.originalStatus = this.status;
  }
}
