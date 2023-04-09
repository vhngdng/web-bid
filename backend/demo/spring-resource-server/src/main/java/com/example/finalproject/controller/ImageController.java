package com.example.finalproject.controller;

import com.example.finalproject.entity.Image;
import com.example.finalproject.request.TypeImageRequest;
import com.example.finalproject.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("images")
@Slf4j
@CrossOrigin(origins = "https://auctionforfun.site", allowCredentials = "true")
public class ImageController {
  @Autowired
  private ImageService imageService;

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
      return ResponseEntity.ok().body(imageService.save(file));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
    }
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

  @GetMapping("all")
  public ResponseEntity<?> getAllImagesByUserLogin() {
    return ResponseEntity.ok(imageService.getAllImagesByUserLogin());
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
    return ResponseEntity.ok(imageService.getImageWithPropertyId(id));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteImage(@PathVariable String id) {
   imageService.delete(id);
   return ResponseEntity.noContent().build();
  }

}
