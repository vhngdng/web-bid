package com.example.finalproject.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BidParticipantDTO {
  private Long id;
  private Long bidId;
  private String username;
  private String nickName;
  private String status;
  private String imageId;
}
