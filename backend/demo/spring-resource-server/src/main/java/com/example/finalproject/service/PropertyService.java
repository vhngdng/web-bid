package com.example.finalproject.service;

import com.example.finalproject.ENUM.PERMISSION;
import com.example.finalproject.ENUM.TYPE_IMAGE;
import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.Property;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.ImageProjection;
import com.example.finalproject.projection.home.PropertyHomeProjection;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.UpSertProperty;
import com.example.finalproject.response.DeletePropertyResponse;
import com.example.finalproject.response.ErrorResponse;
import com.example.finalproject.response.PropertyHomeResponse;
import com.example.finalproject.response.PropertyResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class PropertyService {
  @Autowired
  private BidRepository bidRepository;

  @Autowired
  private PropertyRepository propertyRepository;
  @Autowired
  private Mapper mapper;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ImageRepository imageRepository;

  public Page<PropertyDTO> findAll(int page,
                                   int size,
                                   String sort) {
    String[] _sort = sort.split(",");
    Sort.Order order = (new Sort.Order(_sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
            _sort[0]));
    Pageable pageable = PageRequest.of(page, size, Sort.by(order));
    Page<Property> propertyPage = propertyRepository.findAllByPermissionNotNull(pageable);
    return new PageImpl<>(
            mapper.toListPropertyDTO(propertyPage.getContent(), imageRepository),
            pageable,
            propertyPage.getTotalElements());
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

  @Transactional
  public Object deleteProperty(Integer propertyId) {
    Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new NotFoundException("This property not found " + propertyId));
    Optional<Bid> bidOptional = bidRepository.findBidToDelete(propertyId, LocalDateTime.now());
    List<String> bidStatusList = Arrays.asList("ACTIVE", "PROCESSING", "FINISH");
    if (bidOptional.isPresent() && bidStatusList.contains(bidOptional.get().getStatus())) {
      log.error("delete this property v1" + propertyId);
      return ErrorResponse
              .builder()
              .status(HttpStatus.FORBIDDEN)
              .message("You have to wait for response of admin")
              .build();
    } else {
      imageRepository.deleteAllByProperty(property);
      log.error("delete Image already" + propertyId);
      propertyRepository.delete(property);
      log.error("delete this property v2" + propertyId);
      return DeletePropertyResponse
              .builder()
              .idProperty(propertyId)
              .status(HttpStatus.OK)
              .message("The Property #" + propertyId + " is successfully deleted")
              .build();
    }
  }

  public Page<PropertyHomeProjection> findListPropertyForGuest(int page, int size, String sort) {
    String[] _sort = sort.split(",");
    Sort.Order order = (new Sort.Order(_sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
            _sort[0]));
    Pageable pageable = PageRequest.of(page, size, Sort.by(order));
    return propertyRepository.findListPropertyForGuest(pageable);
  }

  public PropertyHomeResponse
  findDetailPropertyForGuest(int propertyId) {
    List<PropertyHomeProjection> propertyHomeProjectionList
            = propertyRepository.findDetailPropertyForGuest(propertyId);
      PropertyHomeResponse propertyHomeResponse = PropertyHomeResponse
              .builder()
              .property(propertyHomeProjectionList.get(0))
              .images(new ArrayList<>())
              .build();
    if (propertyHomeProjectionList.size() > 0) {
      propertyHomeProjectionList.forEach(
              p -> {
                if (p.getImages() != null) {
                  propertyHomeResponse.addImage(p.getImages());
                }
      });
      return propertyHomeResponse;
    }else {
      return null;
    }
  }

  public List<PropertyDTO> findAllByPermission(String permission) {
    return mapper.toListPropertyDTO(propertyRepository.findAllByPermission(permission), imageRepository);
  }
  @Async
  public CompletableFuture<List<PropertyHomeProjection>> search(String keyword) {
    return CompletableFuture.completedFuture(propertyRepository.search(keyword));
  }
}
