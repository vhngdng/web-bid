package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.descriptor.jdbc.BinaryJdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Types;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "image")
@EntityListeners(AuditingEntityListener.class)
public class Image {
  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  private String id;

  @Lob
  @JdbcType(VarbinaryJdbcType.class)
  @Column(name = "data", columnDefinition = "bytea")
  private byte[] data;
  @Column
  private String name;
  @Column
  private String contentType;
  @Column
  private Long size;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;

  @OneToOne
  @JoinColumn(name = "property_id")
  @JsonIgnore
  private Property property;

  @CreatedDate
  @Column(name = "created_date", updatable = false)
  protected LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "last_modified_by")
  protected String lastModifiedBy;

  @CreatedBy
  @Column(name = "created_by")
  protected String createdBy;

  @LastModifiedDate
  @Column(name = "last_modified_date")
  protected LocalDateTime lastModifiedDate;
}
