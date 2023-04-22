package com.example.finalproject.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class PropertyNotification {
  private Integer id;
  private String name;
  private String category;
  private String permission;
  private String imageId;
}
