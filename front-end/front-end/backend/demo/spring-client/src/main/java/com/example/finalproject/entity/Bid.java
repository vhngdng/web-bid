package com.example.finalproject.entity;

import com.example.finalproject.ENUM.STATUS_BID;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@EntityListeners(AuditingEntityListener.class)
public class Bid {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String type;
  @Column
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

  @OneToMany(mappedBy = "bid", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
  @JsonBackReference
  private List<BidParticipant> bidParticipants;
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "bids")
  private List<Message> messages;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "transaction_id", unique = true)
  private Transaction transaction;

  @OneToOne(optional = false, cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "property_id", nullable = false, updatable = false)
  private Property property;

  @OneToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "status_id", referencedColumnName = "id")
  private StatusBid status;


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
  @Column(name = "lastModifiedDate",updatable = false, unique = true)
  protected LocalDateTime lastModifiedDate;
}
