package com.example.finalproject.controller;

import com.example.finalproject.dto.BidDTO;
import com.example.finalproject.request.UpSertBid;
import com.example.finalproject.response.CreateBidResponse;
import com.example.finalproject.service.BidService;
import com.example.finalproject.utils.QuartUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.SchedulingException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("")
@Slf4j
public class BidController {

  @Autowired
  private BidService bidService;

  @GetMapping("bid-room")
  public ResponseEntity<?> findAllBidRoom() {
    return ResponseEntity.ok(bidService.findAllBid());
  }

  @GetMapping("admin/bid-room/paging")
  public ResponseEntity<?> findAllBidRoomPaging(@RequestParam(name = "page", defaultValue = "0") int page,
                                                @RequestParam(name = "size", defaultValue = "10") int size,
                                                @RequestParam(name ="sort", defaultValue = "dayOfSale,desc") String[] sort
                                                ) {
    return ResponseEntity.ok(bidService.findAllBidRoomPaging(page, size, sort));
  }

  @GetMapping("bid-room/{id}")
  public ResponseEntity<?> findBidRoomByid(@PathVariable("id") Long id) {
    return ResponseEntity.ok(bidService.findBidRoomByid(id));
  }

  @PostMapping("admin/bid-room")
  public ResponseEntity<?> createBidRoom(@RequestBody @Valid UpSertBid upSertBid) {
    return ResponseEntity.ok(bidService.createBidRoom(upSertBid));
  }

  @PostMapping("admin/close-bidroom/{id}")
  public ResponseEntity<?> closeBidRoom(@RequestBody @Valid UpSertBid upSertBid, @PathVariable("id") Long id) {
    return ResponseEntity.ok(bidService.closeBidRoom(upSertBid, id));
  }

  @PostMapping("admin/update/{id}")
  public ResponseEntity<?> updateBidRoom(@RequestBody @Valid UpSertBid upSertBid, @PathVariable("id") Long id) {
    return ResponseEntity.ok(bidService.updateBidRoom(upSertBid, id));
  }

  @GetMapping("/admin/bid-room/before-finish") // bid-room/before-finish/{id}
  public ResponseEntity<?> findBidRoomBeforeFinish() {
    String auctioneerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
    return ResponseEntity.ok(bidService.findListBidRoomBeforeFinish(auctioneerEmail));
  }

  @GetMapping("/admin/bid-room/{id}-success")
  public ResponseEntity<?> updateBidRoomSuccess(@PathVariable("id") Long id) {
    String auctioneerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
    return ResponseEntity.ok(bidService.upDateBidRoomSuccess(auctioneerEmail, id));
  }

  @GetMapping("/admin/bid-room/prepare")
  public ResponseEntity<?> getAllBidPreparingToRun() {
    return ResponseEntity.ok(bidService.getAllBidPreparingToRun());
  }

  @GetMapping("bid-room/ready/{id}")
  public ResponseEntity<?> findBidRoomBeforeStartDate(@PathVariable("id") Long id) {
    return ResponseEntity.ok(bidService.findBidRoomBeforeStartDate(id));
  }

  @GetMapping("/admin/bid-room/{id}")
  public ResponseEntity<?> findDetailBidRoomById(@PathVariable("id") Long id) {
    return ResponseEntity.ok(bidService.findDetailBidRoomById(id));
  }
}
