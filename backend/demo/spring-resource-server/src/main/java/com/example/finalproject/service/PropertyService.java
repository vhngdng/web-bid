package com.example.finalproject.service;

import com.example.finalproject.ENUM.PERMISSION;
import com.example.finalproject.ENUM.TYPE_IMAGE;
import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.Property;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.ImageProjection;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.UpSertProperty;
import com.example.finalproject.response.PropertyResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PropertyService {

  @Autowired
  private PropertyRepository propertyRepository;
  @Autowired
  private Mapper mapper;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ImageRepository imageRepository;

  public List<PropertyDTO> findAll() {
    return mapper.toListPropertyDTO(propertyRepository.findAllByPermissionNotNull(), imageRepository);
  }

  public List<PropertyDTO> findPropertyByUserLogin(String email) {
    List<PropertyDTO> propertieDTOs = mapper.toListPropertyDTO(propertyRepository.findByOwnerEmail(email), imageRepository);
    propertieDTOs.forEach(propertyDTO -> {
      Optional<Image> imageOptional = imageRepository.findByPropertyIdAndType(propertyDTO.getId(), "PROPERTY");
      imageOptional.ifPresent(image -> propertyDTO.setImageId(image.getId()));
    });
    return propertieDTOs;
  }

  public List<PropertyDTO> findAllPropertyNotBid() {
    return mapper.toListPropertyDTO(propertyRepository.findAllPropertyNotBid(), imageRepository);
  }

  public PropertyDTO saveProperty(UpSertProperty upSertProperty) {
    log.info(upSertProperty.getImageId());
    Property property = new Property();
    property.setPermission(PERMISSION.NOTCHECK.name());
    mapper.createProperty(upSertProperty, property, userRepository);
    Property savedProperty = propertyRepository.save(property);
    Optional<Image> image = imageRepository.findById(upSertProperty.getImageId());
    if (image.isPresent()) {
      image.get().setProperty(savedProperty);
      image.get().setType(TYPE_IMAGE.PROPERTY.name());
      imageRepository.save(image.get());
    }
    return mapper.toDTO(savedProperty, imageRepository);
  }

  public PropertyResponse findDetailProperty(Integer propertyId) {
    Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new NotFoundException("Property with id " + propertyId + " is not found"));
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return PropertyResponse.builder()
            .propertyDTO(mapper.toDTO(property, imageRepository))
            .images(imageRepository.findByPropertyIdAndUserEmail(propertyId, email))
            .build();
  }

  public PropertyResponse findAdminDetailProperty(Integer propertyId) {
    Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new NotFoundException("Property with id " + propertyId + " is not found"));
    List<ImageProjection> images = imageRepository.findByPropertyId(propertyId);
    return PropertyResponse.builder()
            .propertyDTO(mapper.toDTO(property, imageRepository))
            .images(images)
            .build();
  }

  public PropertyResponse updateProperty(UpSertProperty upSertProperty, Integer propertyId) {
    Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new NotFoundException("Property with id is not found " + propertyId));
    mapper.updateProperty(upSertProperty, property);
    propertyRepository.save(property);
    List<ImageProjection> images = imageRepository.findByPropertyId(propertyId);
    return PropertyResponse.builder()
            .propertyDTO(mapper.toDTO(property, imageRepository))
            .images(images)
            .build();
  }

  public PropertyResponse registerProperty(UpSertProperty upSertProperty, Integer propertyId) {
    upSertProperty.setPermission(PERMISSION.NOTCHECK.name());
    return updateProperty(upSertProperty, propertyId);
  }
}
