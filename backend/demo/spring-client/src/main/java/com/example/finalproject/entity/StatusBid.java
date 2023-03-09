package com.example.finalproject.entity;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "statusBid")
public class StatusBid {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, unique = true)
  private STATUS_BID status;

  @OneToOne(mappedBy = "status", fetch = FetchType.EAGER)
  @JsonBackReference
  private Bid bid;

  public StatusBid(STATUS_BID status) {
    this.status = status;
  }
}
