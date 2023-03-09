package com.example.finalproject.controller;

import com.example.finalproject.service.PropertyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/properties")
@Slf4j
public class PropertyController {

  @Autowired
  private PropertyService propertyService;

  @GetMapping("")
  public ResponseEntity<?> findAllProperty () {
    return ResponseEntity.ok(propertyService.findAll());
  }
}
