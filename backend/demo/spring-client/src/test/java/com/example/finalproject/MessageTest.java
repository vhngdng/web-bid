package com.example.finalproject;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Message;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.MessageRepository;
import com.example.finalproject.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.stream.Collectors;

@SpringBootTest
public class MessageTest {
  @Autowired
  private MessageRepository messageRepository;
  @Autowired
  private BidRepository bidRepository;
  @Autowired
  private UserRepository userRepository;


  @Test
  public void findAllMessagePublicTest() {
    System.out.println(messageRepository
            .findByStatusAndReceiverName(STATUS_MESSAGE.MESSAGE.name(), "public")
            .stream()
            .map(Message::getMessage).collect(Collectors.toList()));

  }



  @Test
  public void findAllMessageInBidRoomActiveTest() {
    System.out.println(messageRepository
            .findAllMessageInBidRoomActive(1L, LocalDateTime.now().plusDays(1L))
            .stream()
            .map(Message::getMessage)
            .collect(Collectors.toList()));
  }

  @Test
  public void messageTest() {
    Long id = 2L;
    String destination = "/room/" + id.toString();
    System.out.println(destination);
    Bid bid = bidRepository.findById(40L).get();
    Date dayOfSale = Date.from(bid.getDayOfSale().atZone(ZoneId.systemDefault()).toInstant());
    System.out.println(dayOfSale);
  }


}
