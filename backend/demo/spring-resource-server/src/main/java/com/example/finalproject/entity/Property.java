package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Property {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column
  private String name;
  @Column
  private String category;
  @Column
  private Long auctioneerPrice;

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE ,CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "owner_id", referencedColumnName = "user_id")
  @JsonManagedReference
  private User owner;

  @OneToOne(mappedBy = "property", fetch = FetchType.EAGER)
  @JsonBackReference
  private Bid bid;

  @Transient
  private String originalPermission;

  @Column
  private String bidType;
  @Column
  private String permission;
  @Column
  private Long reservePrice;

  @Column
  private String description;
  @Column
  private Long quantity;

  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  protected String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "lastModifiedDate", unique = false)
  protected LocalDateTime lastModifiedDate;

  @CreatedDate
  @Column(name = "creationDate", updatable = false)
  protected LocalDateTime createdAt;

  @PostLoad
  private void saveOriginalPermission() {
    this.originalPermission = this.permission;
  }
}
