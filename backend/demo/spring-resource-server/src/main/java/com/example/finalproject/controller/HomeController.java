package com.example.finalproject.controller;

import com.example.finalproject.service.BidService;
import com.example.finalproject.service.HomeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("guest")
@Slf4j
public class HomeController {
  @Autowired
  HomeService homeService;

  @GetMapping("home")
  public ResponseEntity<?> findHomeDetail() {
    return ResponseEntity.ok(homeService.findHomeDetail());
  }
}
