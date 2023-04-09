package com.example.finalproject.projection;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface Attendee {
  public Long getId();
  @JsonIgnore
  public String getImageId();
  @JsonIgnore
  public String getAvatarDefault();

  default String getAvatar() {
    if(getImageId() != null) {
      return "https://auctionforfun.site/api/v1/images/read/" + getImageId();
    }else {
      return getAvatarDefault();
    }
  }
}
