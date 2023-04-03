package com.example.finalproject.controller;

import com.example.finalproject.service.BidParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/participant")
public class BidParticipantController {

  @Autowired
  private BidParticipantService bidParticipantService;

  @GetMapping("/bid/{id}")
  public ResponseEntity<?> getAllParitipantWithBidId(@PathVariable("id") Long id) {
    return ResponseEntity.ok(bidParticipantService.getAllParitipantWithBidId(id));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> delete(@PathVariable("id") Long id) {
            bidParticipantService.delete(id);
            return ResponseEntity.noContent().build();
  }
}
