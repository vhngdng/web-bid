package com.example.finalproject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BidDetailsDTO {
  @JsonProperty(value = "bid")
  public BidDTO bidDTO;
  @JsonProperty(value = "messages")
  public List<MessageDTO> messageDTOs;
}
