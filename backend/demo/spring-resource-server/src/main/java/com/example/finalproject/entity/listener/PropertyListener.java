package com.example.finalproject.entity.listener;

import com.example.finalproject.entity.Property;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.response.PropertyNotification;
import com.example.finalproject.service.ImageService;
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

  @Autowired
  private ImageService imageService;
  @PostUpdate
  public void onPermissionUpdate(Property property) {
    if(!property.getPermission().equals(property.getOriginalPermission())){
      simpMessagingTemplate.convertAndSendToUser(
              property.getOwner().getEmail(),
              "private",
              PropertyNotification
                      .builder()
                      .id(property.getId())
                      .name(property.getName())
                      .category(property.getCategory())
                      .permission(property.getPermission())
                      .imageId(imageService.getImageWithPropertyIdAndTypeProperty(property.getId()).getId())
                      .build()
      );
    }
  }
}
