package com.example.finalproject.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class PropertyViewDto {
  private Long id;
  private String name;
  private String category;
  private Long quantity;
  private String description;
  private Long lastPrice;
  private String imageProperty;
  private LocalDateTime createdAt;
  private Long reservePrice;
  private Long bidId;
  private String bidStatus;
  private Owner owner;
  private String bidType;
  private final String typeSearch = "PROPERTY";

  @AllArgsConstructor
  @Builder
  public static class Owner {
    public Long id;
    public String name;
    public String avatar;
  }
}
