package com.example.finalproject;

import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.entity.*;
import com.example.finalproject.repository.*;
import com.github.javafaker.Faker;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class InitTest {
  @Autowired
  private Faker faker;
  @Autowired
  private PropertyRepository propertyRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private BidRepository bidRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private BidParticipantRepository bidParticipantRepository;

  @Test
  @Rollback(value = false)
  void save_bid() {
    Random rd = new Random();
    Role role = roleRepository.findById(2).get();
    List<User> userAdmin = userRepository
            .findAll()
            .stream()
            .filter(u -> u.getRoles().contains(role))
            .collect(Collectors.toList());

    for (int i = 0; i < 2; i++) {

      System.out.println(propertyRepository.count());

      Property property;
      boolean isPropertyUsedInBid;
      do {
        property = propertyRepository
                .findAll()
                .get((int) (Math.random() * propertyRepository.count()));
        isPropertyUsedInBid = bidRepository.existsByProperty(property);
        log.debug(property.getName());
      } while (isPropertyUsedInBid);
      Bid bid = Bid.builder()
              .property(property)
              .auctioneer(userAdmin
                      .get((int) (Math.random() * userAdmin.size())))
              .conditionReport(faker.lorem().sentence())
              .dayOfSale(LocalDateTime.now())
              .reservePrice(9000000000L)
              .priceStep(10000000L)
              .build();
      bidRepository.save(bid);

      for (int j = 0; j < 3; j++) {
        BidParticipant participant = new BidParticipant();
        participant.setBid(bid);
        participant.setUser(userRepository
                .findAll()
                .get((int) (Math.random() * userRepository.count())));
        bidParticipantRepository.save(participant);

      }
    }
  }

  @Test
  @Rollback(value = false)
  void save_property() {
    Random rd = new Random();
    for (int i = 0; i < 5; i++) {
      Property property = Property.builder()
              .name(faker.commerce().productName())
              .category(faker.commerce().material())
              .owner(userRepository
                      .findAll()
                      .get((int) (Math.random() * userRepository.count())))
              .build();
      propertyRepository.save(property);
    }
  }
}
