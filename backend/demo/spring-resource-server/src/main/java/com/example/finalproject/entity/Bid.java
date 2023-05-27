package com.example.finalproject.entity;

import com.example.finalproject.entity.listener.BidListener;
import com.fasterxml.jackson.annotation.*;
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
import java.util.List;

@Table(name = "bid")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
@EntityListeners({AuditingEntityListener.class, BidListener.class})
@DynamicUpdate
public class Bid implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String type;
  @Column
  private LocalDateTime dayOfSale;
  @Column
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  private LocalDateTime finishTime;
  @Column(name = "conditionReport", columnDefinition = "TEXT")
  private String conditionReport;
  @Column
  private Long reservePrice;   // giá khởi điểm
  @Column
  private Long priceStep;  // bước giá
  @Column
  private Long updatePrice;
  @Column
  private Long lastPrice;
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE ,CascadeType.REFRESH}, fetch = FetchType.LAZY)
  @JoinColumn(name = "auctioneer_id", referencedColumnName = "user_id")
  @JsonManagedReference
  private User auctioneer;
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE ,CascadeType.REFRESH}, fetch = FetchType.LAZY)
  @JoinColumn(name = "winningBidder_id", referencedColumnName = "user_id")
  @JsonManagedReference
  private User winningBidder;


  @ManyToMany(fetch = FetchType.LAZY, mappedBy = "bids")
  @JsonIgnore
  @JsonBackReference
  private List<Message> messages;
  @OneToOne(mappedBy = "bid", fetch = FetchType.LAZY)
  @JsonBackReference
  private Payment payment;

  @OneToOne(optional = false, cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
  @JoinColumn(name = "property_id", nullable = false, updatable = false)
  @JsonManagedReference
  private Property property;
  @Column(name = "status",nullable = true, updatable = true , columnDefinition = "varchar(255) default 'DEACTIVE'")
  private String status;
  @Transient
  private String originalStatus;

  @PostLoad
  private void saveOriginalStatus() {
    this.originalStatus = this.status;
  }

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






//  @PrePersist
//  public void postPersist() {
//
//  }
}
