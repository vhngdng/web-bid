package com.example.finalproject.dto;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyDTO {

  private Integer id;
  private String name;
  private String category;
  private String image;
  private UserDTO owner;
}
