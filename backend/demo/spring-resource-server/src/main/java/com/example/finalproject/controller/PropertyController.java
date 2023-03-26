package com.example.finalproject.controller;

import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.request.UpSertBid;
import com.example.finalproject.request.UpSertProperty;
import com.example.finalproject.service.PropertyService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@Slf4j
public class PropertyController {

  @Autowired
  private PropertyService propertyService;

  @GetMapping("/admin/properties")
  public ResponseEntity<?> findAllProperty() {
    return ResponseEntity.ok(propertyService.findAll());
  }

  @GetMapping("/admin/properties-not-bid")
  public ResponseEntity<?> findAllPropertyNotBid() {
    return ResponseEntity.ok(propertyService.findAllPropertyNotBid());
  }

  @GetMapping("user/properties")
  public ResponseEntity<?> findPropertyByUserLogin() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return ResponseEntity.ok(propertyService.findPropertyByUserLogin(email));
  }

  @PostMapping("user/properties")
  public ResponseEntity<?> createProperty(@RequestBody @Valid UpSertProperty upSertProperty) {
    return new ResponseEntity<>(propertyService.saveProperty(upSertProperty)
            , HttpStatus.CREATED);
  }
}
