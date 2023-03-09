package com.example.finalproject.controller;

import com.example.finalproject.dto.MessageDTO;
import com.example.finalproject.entity.Message;
import com.example.finalproject.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WSMessageController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final MessageService messageService;

//  @MessageMapping("/bid-room") //  app/bid-room
//  @SendTo("/public")
//  private Object receivePublicMessage(@Payload MessageDTO messageDTO) {
//    log.info(messageDTO.getMessage());
//     return messageService.save(messageDTO);
//  }
//  @MessageMapping("/private-message")
//  private MessageDTO receivePrivateMessage(@Payload MessageDTO messageDTO) {
//    simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(), "private", messageDTO);  //  api/v1/user/${name}/private
//    messageService.save(messageDTO);
//    return messageDTO;
//  }

  @MessageMapping("/room/{bidId}")  //app/room/{bidId}
  @SendTo("/room/{bidId}")
  private Object receiveMessage(@Payload MessageDTO messageDTO, @DestinationVariable Long bidId) {
    log.info(messageDTO.getMessage());
    log.info(bidId.toString());

    return messageService.saveWithBidId(messageDTO);
  }
}
