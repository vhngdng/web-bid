package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class Property {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column
  private String name;
  @Column
  private String category;
  @Column
  private String image;
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST, CascadeType.MERGE ,CascadeType.REFRESH}, fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", referencedColumnName = "user_id")
  private User owner;

  @OneToOne(mappedBy = "property")
  private Bid bid;
}
