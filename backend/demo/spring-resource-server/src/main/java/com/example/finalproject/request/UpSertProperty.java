package com.example.finalproject.request;

import com.example.finalproject.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpSertProperty {
  private Integer id;
  private String name;
  private String category;
  private String imageId;
  private String bidType;
  private long reservePrice;
  private String permission;
  private String description;
  private Long quantity;
  private Long auctioneerPrice;
}
