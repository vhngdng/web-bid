package com.example.finalproject.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ImageResponse {
  private String id;
  private String name;
  private Long size;
  private String url;
  private String contentType;
  private String userEmail;
  private Integer propertyId;
}
