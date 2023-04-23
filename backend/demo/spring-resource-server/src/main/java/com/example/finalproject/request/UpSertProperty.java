package com.example.finalproject.request;

import com.example.finalproject.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpSertProperty {
  private Integer id;
  private String name;
  private String category;
  private String imageId;
  private String bidType;
  private Long reservePrice;
  private String permission;
  private String description;
  private Long quantity;
  private Long auctioneerPrice;
}
