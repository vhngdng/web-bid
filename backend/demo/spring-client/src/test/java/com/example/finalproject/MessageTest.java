package com.example.finalproject;

import com.example.finalproject.entity.Message;
import com.example.finalproject.repository.MessageRepository;
import com.example.finalproject.repository.StatusMessageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@SpringBootTest
public class MessageTest {
  @Autowired
  private MessageRepository messageRepository;
  @Autowired
  private StatusMessageRepository statusMessageRepository;
  @Test
  public void findAllMessagePublicTest() {
    System.out.println(messageRepository
            .findByStatusAndReceiverName(statusMessageRepository
                    .findById(2)
                    .get(), "public")
            .stream()
            .map(Message::getMessage).collect(Collectors.toList()));
  }

  @Test
  public void findByIdStatusMessageTest() {
    System.out.println(statusMessageRepository
            .findById(1).get());
  }

  @Test
  public void findAllMessageInBidRoomActiveTest() {
    System.out.println(messageRepository
            .findAllMessageInBidRoomActive(1L, LocalDateTime.now().plusDays(1L))
            .stream()
            .map(Message::getMessage)
            .collect(Collectors.toList()));
  }
}
