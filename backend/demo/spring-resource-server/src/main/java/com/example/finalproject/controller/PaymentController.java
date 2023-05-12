package com.example.finalproject.controller;

import com.example.finalproject.request.PaymentRequest;
import com.example.finalproject.service.Impl.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/Payment")
public class PaymentController {

  @Autowired
  private PaymentService PaymentService;

  @GetMapping("/not-success")
  public ResponseEntity<?> getAllPaymentNotSuccess() {
    return ResponseEntity.ok(PaymentService.findAllPaymentNotSuccess());
  }
  @GetMapping("/bid-finish")
  public ResponseEntity<?> getAllPaymentBidNotSuccess() {
    return ResponseEntity.ok(PaymentService.getAllPaymentBidFinish());
  }
  @GetMapping("")
  public ResponseEntity<?> findAllPaymentByUserLogin() {
    return ResponseEntity.ok(PaymentService.findAllPaymentByUserLogin());
  }
  @GetMapping("bid/{id}")
  public ResponseEntity<?> findPaymentByBidId(@PathVariable("id") Long id) {
    return ResponseEntity.ok(PaymentService.findPaymentByBidId(id));
  }

  @GetMapping("{id}")
  public ResponseEntity<?> findDetailPaymentById(@PathVariable("id") Integer id) {
    return ResponseEntity.ok(PaymentService.findDetailPaymentById(id));
  }



  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteById(@PathVariable("id") Integer id) {
    PaymentService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("")
  public ResponseEntity<?> createPayment(@RequestBody PaymentRequest request) {
    return ResponseEntity.ok(PaymentService.createPayment(request));
  }

  @PutMapping("update-status")
  public ResponseEntity<?> updateStatusPayment(@RequestBody PaymentRequest request) {
    PaymentService.updateStatusPayment(request.getStatus(), request.getBidId());
    return ResponseEntity.noContent().build();
  }

}
