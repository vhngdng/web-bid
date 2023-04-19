package com.example.finalproject.projection.home;

import com.example.finalproject.projection.ImageProjection;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

public interface PropertyHomeProjection {
  //  p.name, p.quantity, p.description, b.lastPrice, i.id
  Long getId();

  String getName();

  String getCategory();

  Long getQuantity();

  @JsonIgnore
  String getImageType();

  @JsonIgnore
  String getImageId();

  String getDescription();

  Long getLastPrice();

  String getImageProperty();

  LocalDateTime getCreatedAt();

  Long getReservePrice();

  @JsonIgnore
  String getDefaultAvatar();

  @JsonIgnore
  String getAvatar();

  @JsonIgnore
  default String getOwnerAvatar() {
    return getAvatar() != null ? getAvatar() : getDefaultAvatar();
  }

  @JsonIgnore
  String getOwnerName();

  @JsonIgnore
  Long getOwnerId();

  Long getBidId();

  String getBidStatus();

  default Owner getOwner() {
    return Owner.builder()
            .avatar(getOwnerAvatar())
            .id(getOwnerId())
            .name(getOwnerName())
            .build();
  }

  @JsonIgnore
  default ImageProperty getImages() {
    return getImageId() == null ? null : ImageProperty.builder()
            .id(getImageId())
            .type(getImageType())
            .build();
  }

  @AllArgsConstructor
  @Builder
  class Owner {
    public Long id;
    public String name;
    public String avatar;
  }

  @AllArgsConstructor
  @Builder
  class ImageProperty {
    public String id;
    public String type;
  }
}

// u.avatar as defaultAvatar, i.id as ownerAvatar, u.username as ownerName, u.id as ownerId, b.id as bidId " +
