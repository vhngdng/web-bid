package com.example.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bid-participant")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BidParticipant {
//  @Column
//  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  private Long id;


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
  @JoinColumn(name = "bid_id")
  private Bid bid;


  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
  @JoinColumn(name = "participant_id")
  private User user;

  private String nickName;

}
