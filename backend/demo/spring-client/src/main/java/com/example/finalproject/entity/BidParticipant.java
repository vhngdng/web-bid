package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bid-participant")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
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
  @JsonIgnoreProperties(value = {"createdAt", "lastModifiedBy", "lastModifiedDate"})
  private Bid bid;

  @JsonInclude(JsonInclude.Include.NON_NULL)
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
  @JoinColumn(name = "participant_id")
  @JsonIgnoreProperties(value = {"createdAt", "lastModifiedBy", "lastModifiedDate"})
  private User user;

  private String nickName;

}
