package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
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
public class Message implements Serializable {
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
  @JsonManagedReference
  private Set<Bid> bids = new HashSet<>();
  @Column(updatable = false)
  private String message;

  @Column
  private Long increaseAmount;
  @Column(name = "status", nullable = false)
  private String status;

  @CreatedDate
  @Column(name = "created_Date", updatable = false)
  protected LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "last_modified_by")
  protected String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "last_modified_date")
  protected LocalDateTime lastModifiedDate;


  public void addBid(Bid bid) {
    this.bids.add(bid);
  }
}
