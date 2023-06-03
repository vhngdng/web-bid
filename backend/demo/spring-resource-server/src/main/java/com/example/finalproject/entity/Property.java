package com.example.finalproject.entity;

import com.example.finalproject.entity.listener.PropertyListener;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "property", indexes = {
        @Index(name = "o_index", columnList = "owner_id")
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EntityListeners({AuditingEntityListener.class, PropertyListener.class})
public class Property implements Serializable {
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
  @JoinColumn(name = "owner_id", referencedColumnName = "user_id", nullable = false)
  @JsonManagedReference
  private User owner;

  @OneToOne(mappedBy = "property", fetch = FetchType.LAZY)
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
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  @Column(name = "last_modified_date", unique = false)
  protected LocalDateTime lastModifiedDate;

  @CreatedDate
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  @Column(name = "creation_date", updatable = false)
  protected LocalDateTime createdAt;

  @PostLoad
  private void saveOriginalPermission() {
    this.originalPermission = this.permission;
  }
}
