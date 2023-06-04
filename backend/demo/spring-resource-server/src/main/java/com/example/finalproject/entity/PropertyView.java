//package com.example.finalproject.entity;
//
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//import lombok.*;
//import org.hibernate.annotations.Immutable;
//
//import java.time.LocalDateTime;
//
//@Table(name = "vproperty")
//@Entity
//@Immutable
//@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
//public class PropertyView {
//
//  @Id
//  @Column(name = "property_home_id")
//  private Long propertyHomeId;
//  @Column
//  private String name;
//  @Column
//  private Long id;
//  @Column
//  private Long quantity;
//  @Column
//  private String description;
//  @Column(name = "reserve_price")
//  private Long reservePrice;
//  @Column(name = "last_price")
//  private Long lastPrice;
//  @Column
//  private String category;
//  @Column(name = "created_at")
//  private LocalDateTime createdAt;
//  @Column(name = "default_avatar")
//  private String defaultAvatar;
//  @Column(name = "owner_name")
//  private String ownerName;
//  @Column(name = "owner_id")
//  private Long ownerId;
//  @Column(name = "bid_id")
//  private Long bidId;
//  @Column(name = "bid_status")
//  private String bidStatus;
//  @Column(name = "image_property")
//  private String imageProperty;
//  @Column(name = "image_type")
//  private String imageType;
//  @Column(name = "image_avatar")
//  private String avatar;
//  @Column(name = "bid_type")
//  private String bidType;
//  public class Owner {
//  }
//}
