package com.example.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "image")
@EntityListeners({AuditingEntityListener.class})
public class Image implements Serializable{
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
  @Column
  private String type;
  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE}, fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER)
  @JoinColumn(name = "property_id")
  private Property property;

  @CreatedDate
  @Column(name = "created_date", updatable = false)
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  protected LocalDateTime createdAt;

  @LastModifiedBy
  @Column(name = "last_modified_by")
  protected String lastModifiedBy;

  @CreatedBy
  @Column(name = "created_by")
  protected String createdBy;

  @LastModifiedDate
  @Column(name = "last_modified_date")
  @JsonSerialize(using= LocalDateTimeSerializer.class)
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  protected LocalDateTime lastModifiedDate;


}
