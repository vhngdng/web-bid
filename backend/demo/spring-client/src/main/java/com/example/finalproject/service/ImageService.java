package com.example.finalproject.service;

import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.BadRequestException;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.ImageRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.response.ImageResponse;
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
public class ImageService {
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
}
