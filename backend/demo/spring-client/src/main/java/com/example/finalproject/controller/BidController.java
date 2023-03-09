package com.example.finalproject.controller;

import com.example.finalproject.request.UpSertBid;
import com.example.finalproject.service.BidService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bid-room")
public class BidController {

  @Autowired
  private BidService bidService;

  @GetMapping()
  public ResponseEntity<?> findAllBidRoom() {
    return ResponseEntity.ok(bidService.findAllBid());
  }

  @GetMapping("{id}")
  public ResponseEntity<?> findBidRoomByid(@PathVariable("id") Long id) {
    return ResponseEntity.ok(bidService.findBidRoomByid(id));
  }

  @PostMapping()
  public ResponseEntity<?> createBidRoom(@RequestBody @Valid UpSertBid upSertBid) {
    return ResponseEntity.ok(bidService.createBidRoom(upSertBid));
  }
}
