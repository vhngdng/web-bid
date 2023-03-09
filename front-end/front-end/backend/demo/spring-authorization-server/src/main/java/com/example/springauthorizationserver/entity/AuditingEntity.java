package com.example.springauthorizationserver.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class AuditingEntity {
  @CreatedDate
  @Column(name = "creationDate", updatable = false)
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  protected LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "lastModifiedBy")
  protected String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "lastModifiedDate")
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  protected LocalDateTime lastModifiedDate;

//  @PrePersist
//  public void prePersist() {
//    this.createdAt = LocalDateTime.now();
//  }
//  @PostUpdate
//  public void preUpdate() {
//    this.lastModifiedDate = LocalDateTime.now();
//  }
}
