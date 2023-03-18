package com.example.finalproject.controller;

import com.example.finalproject.dto.MessageDTO;
import com.example.finalproject.response.FinishResponse;
import com.example.finalproject.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WSMessageController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final MessageService messageService;


  @MessageMapping("/private-message")
  private MessageDTO receivePrivateMessage(@Payload MessageDTO messageDTO) {
    simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(), "private", messageDTO);  //  app/user/${name}/private
    return messageDTO;
  }

  @MessageMapping("/room/{bidId}")  //  app/room/{bidId}
  @SendTo("/room/{bidId}")
  private Object receiveMessage(@Payload MessageDTO messageDTO, @DestinationVariable Long bidId) {
    log.info(messageDTO.getMessage());
    log.info(bidId.toString());

    return messageService.saveWithBidId(messageDTO);
  }

  @MessageMapping("/finish/room/{bidId}")  // app/finish/room/{bidId}
  private void receiveMessage(@Payload FinishResponse request, @DestinationVariable Long bidId) {
    log.info(bidId.toString());
    messageService.finishBid(request);
  }
}
