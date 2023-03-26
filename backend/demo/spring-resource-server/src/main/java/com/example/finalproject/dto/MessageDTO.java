package com.example.finalproject.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDTO {
  private String senderName;
  private String nickName;
  private String receiverName;
  private String message;
  private String status;
  private Long bid;
  private LocalDateTime createdAt;
  private Long increaseAmount;
}
