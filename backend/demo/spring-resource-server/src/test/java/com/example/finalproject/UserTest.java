package com.example.finalproject;

import com.example.finalproject.entity.User;
import com.example.finalproject.projection.Attendee;
import com.example.finalproject.repository.RoleRepository;
import com.example.finalproject.repository.UserRepository;
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
  private RoleRepository roleRepository;

  @Autowired
  private UserRepository userRepository;

  @Test
  public void findAllAttendeeByBidIdTest() {
    System.out.println(userRepository
            .findAllAttendeeByBidId(62L)
            .stream()
            .map(Attendee::getImageId).collect(Collectors.toList()));

  }

  @Test
  public void findUserInfoByIdTest() {
    System.out.println(userRepository
            .findUserInfoById(12L)
            .getNumberOfParticipating()
    );

    System.out.println(userRepository
            .findUserInfoById(12L)
            .getNumberOfWinning()
    );
  }

  @Test
  public void findRoleTest() {
    System.out.println(userRepository.test(17));

  }

  @Test
  public void adminIsOnlineTest() {
    System.out.println(userRepository.findAdminOnline().stream().map(User::getId).collect(Collectors.toList()).toString());

  }


}
