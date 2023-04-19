package com.example.finalproject.response;

import com.example.finalproject.projection.home.PropertyHomeProjection;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyHomeResponse {
  @JsonIgnoreProperties("imageProperty")
  private PropertyHomeProjection property;

  private List<PropertyHomeProjection.ImageProperty> images = new ArrayList<>();

  public void addImage(PropertyHomeProjection.ImageProperty image) {
    images.add(image);
  }
}
