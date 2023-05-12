package com.example.finalproject.entity.listener;

import com.example.finalproject.entity.Property;
import com.example.finalproject.response.PropertyNotification;
import jakarta.persistence.PostUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PropertyListener {
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  @PostUpdate
  public void onPermissionUpdate(Property property) {
    if(!property.getPermission().equals(property.getOriginalPermission())){
      log.error("Check message working", property.getId());
      simpMessagingTemplate.convertAndSendToUser(
              property.getOwner().getEmail(),
              "private",
              PropertyNotification
                      .builder()
                      .id(property.getId())
                      .name(property.getName())
                      .category(property.getCategory())
                      .permission(property.getPermission())
                      .auctioneerPrice(property.getAuctioneerPrice())
                      .reservePrice(property.getReservePrice())
                      .notification("PROPERTY")
                      .build()
      );
    }
  }
}
