package com.example.finalproject.entity;

import com.example.finalproject.entity.listener.BidListener;
import com.fasterxml.jackson.annotation.*;
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

@Table(name = "Bid")
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
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  private LocalDateTime dayOfSale;
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
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST ,CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "auctioneer_id", referencedColumnName = "user_id")

  private User auctioneer;
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST ,CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "winningBidder_id", referencedColumnName = "user_id")
  private User winningBidder;

//  @OneToMany(mappedBy = "bid", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
//  private List<BidParticipant> bidParticipants;
  @ManyToMany(fetch = FetchType.EAGER, mappedBy = "bids")
  private List<Message> messages;
  @OneToOne(mappedBy = "bid", fetch = FetchType.EAGER)
  private Transaction transaction;

  @OneToOne(optional = false, cascade = {CascadeType.DETACH, CascadeType.REFRESH})
  @JoinColumn(name = "property_id", nullable = false, updatable = false)
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






//  @PrePersist
//  public void postPersist() {
//
//  }
}
