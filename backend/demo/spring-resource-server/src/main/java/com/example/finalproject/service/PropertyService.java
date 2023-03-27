package com.example.finalproject.service;

import com.example.finalproject.ENUM.TYPE_IMAGE;
import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.Property;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.UpSertProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
    return mapper.toListPropertyDTO(propertyRepository.findAll());
  }

  public List<PropertyDTO> findPropertyByUserLogin(String email) {
    List<PropertyDTO> propertieDTOs = mapper.toListPropertyDTO(propertyRepository.findByOwnerEmail(email));
    propertieDTOs.forEach(propertyDTO -> {
      Optional<Image> imageOptional = imageRepository.findByPropertyId(propertyDTO.getId());
      imageOptional.ifPresent(image -> propertyDTO.setImageId(image.getId()));
    });
    return propertieDTOs;
  }

  public List<PropertyDTO> findAllPropertyNotBid() {
    return mapper.toListPropertyDTO(propertyRepository.findAllPropertyNotBid());
  }

  public PropertyDTO saveProperty(UpSertProperty upSertProperty) {
    log.info(upSertProperty.getImageId());
    Property property = new Property();
    mapper.createProperty(upSertProperty, property, userRepository);
    Property savedProperty = propertyRepository.save(property);
    Optional<Image> image = imageRepository.findById(upSertProperty.getImageId());
    if (image.isPresent()) {
      image.get().setProperty(savedProperty);
      image.get().setType(TYPE_IMAGE.PROPERTY.name());
      imageRepository.save(image.get());
    }
    return mapper.toDTO(savedProperty);
  }
}
