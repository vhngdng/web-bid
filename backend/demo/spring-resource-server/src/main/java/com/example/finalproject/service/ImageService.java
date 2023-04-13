package com.example.finalproject.service;

import com.example.finalproject.ENUM.TYPE_IMAGE;
import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.BadRequestException;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.TypeImageRequest;
import com.example.finalproject.response.ImageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class ImageService {
  @Autowired
  private PropertyRepository propertyRepository;
  @Autowired
  private ImageRepository imageRepository;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private Mapper mapper;

  @Transactional
  public ImageResponse save(MultipartFile file) throws IOException {
    Image img = new Image();
    img.setName(StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename())));
    img.setContentType(file.getContentType());
    img.setData(file.getBytes());
    img.setSize(file.getSize());

    // find user
    String emailLogin = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(emailLogin).orElseThrow(() -> new UsernameNotFoundException("Username with email: " + emailLogin + " is not found"));
    img.setUser(user);

    // check img of property
    Image image = imageRepository.save(img);
    return mapper.toImageResponse(image);
  }

  public List<ImageResponse> findAllImage() {
    return mapper.toListImageResponse(imageRepository.findAll());
  }

  public Image getImage(String id) {
    return imageRepository.findById(id).orElseThrow(() -> new NotFoundException("not found image!"));
  }

  public byte[] readImage(String id) {
    Image image = imageRepository.findById(id).orElseThrow(() -> new NotFoundException("image Id not found " + id));

    return image.getData();
  }

  public List<ImageResponse> getAllImagesByUserLogin() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username with email: " + email + " is not found"));
    return mapper.toListImageResponse(imageRepository.findAllByUserId(user.getId()));
  }

  public List<ImageResponse> getAllImagesByUserLoginWithAvatarAndBackGround() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username with email: " + email + " is not found"));
    return mapper.toListImageResponse(imageRepository.findAllByUserIdAndType(user.getId()));
  }

  @Transactional
  public ImageResponse updateType(String id, TypeImageRequest request) {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username with email: " + email + " is not found"));
    Image newImage = imageRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Image with id: " + id + " is not found"));
    Image duplicateImage = null;
    if (newImage.getType() != null && !newImage.getType().equalsIgnoreCase(request.getType())) {
      duplicateImage = Image.builder()
              .contentType(newImage.getContentType())
              .name(newImage.getName())
              .size(newImage.getSize())
              .data(newImage.getData())
              .user(newImage.getUser())
              .build();
    }
    Optional<Image> imageOptional = imageRepository.findByUserIdAndType(user.getId(), request.getType());
    imageOptional.ifPresent(image -> image.setType(null));
    switch (request.getType()) {
      case "AVATAR":
      case "BACKGROUND": {
        if (duplicateImage == null) {
          newImage.setType(request.getType());
        } else {
          duplicateImage.setType(request.getType());
          return mapper.toImageResponse(imageRepository.save(duplicateImage));
        }
        break;
      }
      case "PROPERTY": {
        Optional<Image> imageProperty = imageRepository.findByPropertyId(request.getPropertyId());
        imageProperty.ifPresent(image -> {
          image.setType(null);
        });
        newImage.setType(TYPE_IMAGE.PROPERTY.name());
        newImage.setProperty(
                propertyRepository.findById(
                        request.getPropertyId())
                        .orElseThrow( () ->
                                new NotFoundException("Property with id " + request.getPropertyId() + " is not found")));
        break;
      }
      default:
        throw new BadRequestException("The type of image is not valid");
    }
    return mapper.toImageResponse(newImage);
  }

  public ImageResponse getAvatar() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username with email: " + email + " is not found"));
    return mapper.toImageResponse(imageRepository
            .findByUserIdAndType(user.getId(), TYPE_IMAGE.AVATAR.name())
            .orElse(null)
    );
  }

  public ImageResponse getBackground() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username with email: " + email + " is not found"));
    return mapper.toImageResponse(imageRepository
            .findByUserIdAndType(user.getId(), TYPE_IMAGE.BACKGROUND.name())
            .orElse(null)
    );
  }

  public ImageResponse getImageWithPropertyId(Integer id) {
    return mapper.toImageResponse(imageRepository.findByPropertyId(id).orElseThrow(() -> new NotFoundException("Property with Id : " + id + " is not found")));
  }

  public void delete(String id) {
    imageRepository.deleteById(id);
  }
}
