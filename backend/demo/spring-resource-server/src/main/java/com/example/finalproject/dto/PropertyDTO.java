package com.example.finalproject.dto;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyDTO {

  private Integer id;
  private String name;
  private String category;
  private String imageId;
  private String bidType;
  private String permission;
  private Long reservePrice;
  private String description;
  private Long quantity;
  @JsonIgnoreProperties("roles")
  private UserDTO owner;
  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  protected LocalDateTime lastModifiedDate;
}
