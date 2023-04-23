package com.example.finalproject.response;

import com.example.finalproject.dto.PaymentDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Notification {
  private List<PaymentDTO> paymentNotifications;
  private List<PropertyNotification> propertyNotifications;
}
