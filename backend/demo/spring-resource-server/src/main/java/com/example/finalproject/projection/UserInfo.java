package com.example.finalproject.projection;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface UserInfo {
  Long getId();
  String getName();
  String getEmail();
  Integer getNumberOfParticipating();
  Integer getNumberOfWinning();

  @JsonIgnore
  public String getImageId();
  @JsonIgnore
  public String getAvatarDefault();

  default String getAvatar() {
    if(getImageId() != null) {
      return "http://localhost:8080/api/v1/images/read/" + getImageId();
    }else {
      return getAvatarDefault();
    }
  }
}
