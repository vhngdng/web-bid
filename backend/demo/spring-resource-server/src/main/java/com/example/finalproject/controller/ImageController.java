package com.example.finalproject.controller;

import com.example.finalproject.entity.Image;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.request.TypeImageRequest;
import com.example.finalproject.service.Impl.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("images")
@Slf4j
@CrossOrigin(origins = {"https://auctionforfun.site", "http://localhost:3000"}, allowCredentials = "true")
public class ImageController {
  @Autowired
  private ImageService imageService;
  @Autowired
  private Mapper mapper;
  @GetMapping("")
  public ResponseEntity<?> getAllImages() {
    return ResponseEntity.ok(imageService.findAllImage());
  }

  @PostMapping("")
  public ResponseEntity<?> uploadImage(@ModelAttribute("file") MultipartFile file) {
    try {
      if (file == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("File cannot be null!");
      }
      log.info(file.getOriginalFilename());
      return ResponseEntity.ok().body(mapper.toImageResponse(imageService.save(file)));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
    }
  }
  @PostMapping(value = "multi-file/{propertyId}")
  public ResponseEntity<?> uploadMultiImageProperty(@RequestPart("files") MultipartFile [] files, @PathVariable("propertyId") Integer propertyId) {
    if (files == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body("File cannot be null!");
    }
    List<String> fileNames = new ArrayList<>();
    Arrays.stream(files).forEach(file -> {
      try {

        imageService.saveImageProperty(file, propertyId);
        fileNames.add("Uploaded the file successfully: " + file.getOriginalFilename());
      } catch (IOException e) {
        fileNames.add(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
      }

    });
    return ResponseEntity.ok().body(fileNames);

  }

  @GetMapping("{id}")
  public ResponseEntity<?> downloadImage(@PathVariable("id") String id) {
    Image img = imageService.getImage(id);
    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + img.getName() + "\"")
            .contentType(MediaType.valueOf(img.getContentType()))
            .body(img.getData());
  }

  @GetMapping("/read/{id}")
  public ResponseEntity<?> readImage(@PathVariable String id) {
    Image img = imageService.getImage(id);
    return ResponseEntity.ok()
            .contentType(MediaType.valueOf(img.getContentType()))
            .body(img.getData());
  }

  @GetMapping("not-property/all")
  public ResponseEntity<?> getAllImagesNotPropertyByUserLogin() {
    return ResponseEntity.ok(imageService.getAllImagesNotPropertyByUserLogin());
  }

  @GetMapping("/avatar-background")
  public ResponseEntity<?> getAllImagesByUserLoginWithAvatarAndBackGround() {
    return ResponseEntity.ok(imageService.getAllImagesByUserLoginWithAvatarAndBackGround());
  }

  @GetMapping("/avatar")
  public ResponseEntity<?> getAvatar() {
    return ResponseEntity.ok(imageService.getAvatar());
  }

  @GetMapping("/background")
  public ResponseEntity<?> getBackground() {
    return ResponseEntity.ok(imageService.getBackground());
  }

  @PutMapping("{id}")
  public ResponseEntity<?> upDateType(@PathVariable String id, @RequestBody TypeImageRequest request) {
    return ResponseEntity.ok(imageService.updateType(id, request));
  }

  @GetMapping("/property/{id}")
  public ResponseEntity<?> getImageWithPropertyId(@PathVariable Integer id) {
    return ResponseEntity.ok(imageService.getImageWithPropertyIdAndTypeProperty(id));
  }

  @GetMapping("/property-all-images/{id}")
  public ResponseEntity<?> getAllImageOfProperty(@PathVariable Integer id) {
    return ResponseEntity.ok(imageService.getAllImageOfProperty(id));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteImage(@PathVariable String id) {
   imageService.delete(id);
   return ResponseEntity.noContent().build();
  }

}
