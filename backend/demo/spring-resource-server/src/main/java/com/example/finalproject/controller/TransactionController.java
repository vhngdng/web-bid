package com.example.finalproject.controller;

import com.example.finalproject.request.TransactionRequest;
import com.example.finalproject.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/transaction")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @GetMapping("/not-success")
  public ResponseEntity<?> getAllTransactionNotSuccess() {
    return ResponseEntity.ok(transactionService.findAllTransactionNotSuccess());
  }
  @GetMapping("/bid-finish")
  public ResponseEntity<?> getAllTransactionBidNotSuccess() {
    return ResponseEntity.ok(transactionService.getAllTransactionBidFinish());
  }
  @GetMapping("")
  public ResponseEntity<?> findAllTransactionByUserLogin() {
    return ResponseEntity.ok(transactionService.findAllTransactionByUserLogin());
  }
  @GetMapping("bid/{id}")
  public ResponseEntity<?> findTransactionByBidId(@PathVariable("id") Long id) {
    return ResponseEntity.ok(transactionService.findTransactionByBidId(id));
  }

  @GetMapping("{id}")
  public ResponseEntity<?> findDetailTransactionById(@PathVariable("id") Integer id) {
    return ResponseEntity.ok(transactionService.findDetailTransactionById(id));
  }



  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteById(@PathVariable("id") Integer id) {
    transactionService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("")
  public ResponseEntity<?> createTransaction(@RequestBody TransactionRequest request) {
    return ResponseEntity.ok(transactionService.createTransaction(request));
  }

  @PutMapping("update-status")
  public ResponseEntity<?> updateStatusTransaction(@RequestBody TransactionRequest request) {
    transactionService.updateStatusTransaction(request.getStatus(), request.getBidId());
    return ResponseEntity.noContent().build();
  }

}
