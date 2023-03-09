package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @CreatedBy
  @Column(name = "createdBy", updatable = false)
  private String createdBy;
  @Column(name = "sender_name")
  private String senderName;
  @Column(name = "nick_name")
  private String nickName;
  @Column(name = "receiver_name")
  private String receiverName;
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
          name = "message_bid",
          joinColumns = @JoinColumn(name = "message_id"),
          inverseJoinColumns = @JoinColumn(name = "bid_id")
  )
  private Set<Bid> bids = new HashSet<>();
  @Column(updatable = false)
  private String message;

  @Column
  private Long increaseAmount;

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST ,CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "status_id", referencedColumnName = "id")
  private StatusMessage status;

  @CreatedDate
  @Column(name = "creationDate", updatable = false, unique = true)
  protected LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  protected String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "lastModifiedDate",updatable = false, unique = true)
  protected LocalDateTime lastModifiedDate;


  public void addBid(Bid bid) {
    this.bids.add(bid);
  }
}
