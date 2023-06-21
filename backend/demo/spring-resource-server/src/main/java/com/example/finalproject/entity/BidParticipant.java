package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "bid_participant")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BidParticipant implements Serializable{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(cascade = {CascadeType.DETACH,
          CascadeType.MERGE, CascadeType.REFRESH} , fetch = FetchType.EAGER)
  @JoinColumn(name = "bid_id")
  private Bid bid;

  @ManyToOne(cascade = {CascadeType.DETACH,
          CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "participant_id")
  private User user;
  @Column
  private String nickName;



//  @PostRemove
//  public void postRemove() {
//    this.bid = null;
//    this.user= null;
//  }
}
