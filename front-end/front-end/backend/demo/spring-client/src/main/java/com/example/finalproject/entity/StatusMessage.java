package com.example.finalproject.entity;

import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "statusMessage")
public class StatusMessage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, unique = true)
  private STATUS_MESSAGE name;

  @OneToMany(mappedBy = "status", fetch = FetchType.EAGER)
  @JsonBackReference
  private List<Message> message;

  public StatusMessage(STATUS_MESSAGE name) {
    this.name = name;
  }


}
