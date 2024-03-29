package com.example.finalproject.controller;

import com.example.finalproject.dto.MessageDTO;
import com.example.finalproject.service.Impl.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("")
@Slf4j
@RequiredArgsConstructor
public class MessageController {

  private final MessageService messageService;
  private final SimpMessagingTemplate simpMessagingTemplate;
  @GetMapping("message/public")
  public List<MessageDTO> getAllPublicMessage() {
    log.info("Call this method getAllPublicMessage");
    return messageService.findAllPublic();
  }

  @GetMapping("message/bid/{id}")
  public ResponseEntity<?> getAllBidMessage(@PathVariable("id") Long id) {
    return ResponseEntity.ok(messageService.getAllBidMessage(id));
  }

  @GetMapping("message/private")
  public void sendPrivateMessage() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    simpMessagingTemplate.convertAndSendToUser(email, "private", "test");  //  app/user/${name}/private
  }

  @GetMapping("user/message/success-bid/{Payment-id}")
  public ResponseEntity<?> getAllMessageBySuccessBidId(@PathVariable("Payment-id") Integer PaymentId) {
    return ResponseEntity.ok(messageService.getAllMessageBySuccessBidId(PaymentId));
  }
}
