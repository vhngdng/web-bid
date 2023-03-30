package com.example.finalproject;

import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.entity.Message;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.Attendee;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.service.BidService;
import com.example.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
@RequiredArgsConstructor
public class UserTest {
  @Autowired
  private BidRepository bidRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  BidService bidService;
  @Test
  public void findAllAttendeeByBidIdTest() {
    System.out.println(userRepository
            .findAllAttendeeByBidId(62L)
            .stream()
            .map(Attendee::getImageId).collect(Collectors.toList()));

  }


}