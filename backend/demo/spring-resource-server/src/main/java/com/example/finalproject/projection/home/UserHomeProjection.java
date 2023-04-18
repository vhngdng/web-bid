package com.example.finalproject.projection.home;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Value;

public interface UserHomeProjection {
  String getName();

  Long getId();

  @JsonIgnore
  String getImageId();

  @JsonIgnore
  String getAvatarDefault();

  default String getAvatar() {
    if (getImageId() != null) {
      return "https://auctionforfun.site/api/v1/images/read/" + getImageId();
    } else {
      return getAvatarDefault();
    }
  }

  Integer getNumberEntries();

  Integer getNumberWinning();
}
