package com.example.finalproject.controller;

import com.example.finalproject.service.Impl.HomeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("guest")
@Slf4j
public class HomeController {
  @Autowired
  HomeService homeService;

  @GetMapping("home")
  public ResponseEntity<?> findHomeDetail() throws ExecutionException, InterruptedException {
    return ResponseEntity.ok(homeService.findHomeDetail().get());
  }

  @GetMapping("search/{keyword}")
  public ResponseEntity<?> searchWord(
          @RequestParam(name = "page", defaultValue = "0") int page,
          @RequestParam(name = "size", defaultValue = "8") int size,
          @PathVariable("keyword") String keyword) throws ExecutionException, InterruptedException {
    log.error("page", page);
    return ResponseEntity.ok(homeService.search(keyword, page, size));
  }

}
