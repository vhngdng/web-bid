package com.example.finalproject.response;

import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.projection.ImageProjection;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.jsonwebtoken.io.Deserializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class PropertyResponse implements Serializable {
  @JsonIgnoreProperties("imageId")
  @JsonProperty("property")
  private PropertyDTO propertyDTO;
  private List<ImageProjection> images;
}
