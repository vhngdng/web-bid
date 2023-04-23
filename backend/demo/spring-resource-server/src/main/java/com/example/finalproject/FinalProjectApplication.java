package com.example.finalproject;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.ENUM.PERMISSION;
import com.example.finalproject.ENUM.Provider;
import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.config.UserLoginProperties;
import com.example.finalproject.entity.*;
import com.example.finalproject.repository.*;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

@SpringBootApplication
@EnableConfigurationProperties(UserLoginProperties.class)
@EnableAsync
public class FinalProjectApplication {


  public static void main(String[] args) {
    SpringApplication.run(FinalProjectApplication.class, args);
  }

  @Bean
  Faker faker() {
    return new Faker();
  }

  @Bean
  public Executor asyncExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(5);
    executor.setQueueCapacity(500);
    executor.setThreadNamePrefix("WebBidAsync-");
    executor.initialize();
    return executor;
  }
  @Bean
  public CommandLineRunner initialValue(RoleRepository roleRepository,
                                        UserRepository userRepository,
                                        PropertyRepository propertyRepository,
                                        BidRepository bidRepository,
                                        BidParticipantRepository bidParticipantRepository,
                                        PaymentRepository paymentRepository
  ) {
    return (args -> {
      if (!roleRepository.findByName(EROLE.ROLE_USER).isPresent()) {
        roleRepository.save(new Role("ROLE_USER"));
      }
      ;
      if (!roleRepository.findByName(EROLE.ROLE_ADMIN).isPresent()) {
        roleRepository.save(new Role("ROLE_ADMIN"));
      }
      ;
      if (!roleRepository.findByName(EROLE.ROLE_GUEST).isPresent()) {
        roleRepository.save(new Role("ROLE_GUEST"));
      }
      ;
      if (userRepository.count() < 30) {
        initUser(userRepository, roleRepository);
      }
      if (bidRepository.count() < 20) {
        initProperty(propertyRepository, userRepository);

        initBid(propertyRepository,
                roleRepository,
                userRepository,
                bidRepository,
                bidParticipantRepository,
                paymentRepository);
      }
    });

  }

  @Transactional
  public void initUser(UserRepository userRepository, RoleRepository roleRepository) {
    Faker faker;

    for (int i = 0; i < 20; i++) {
      Set<Role> roles = new HashSet<>();
      String email = this.faker().internet().emailAddress();
      if (!userRepository.findByEmail(email).isPresent()) {
        User user = User.builder()
                .username(this.faker().name().fullName())
                .email(email)
                .password(this.faker().internet().password())
                .roles(roles)
                .enabled(true)
                .provider(Provider.LOCAL)
                .build();
        for (int j = 0; j < 2; j++) {
          int rd = new Random().nextInt(4);
          Optional<Role> role = roleRepository.findById(rd);
          role.ifPresent(user::addRole);

        }
        userRepository.save(user);
      }
    }
  }

  @Transactional
  public void initBid(PropertyRepository propertyRepository,
                      RoleRepository roleRepository,
                      UserRepository userRepository,
                      BidRepository bidRepository,
                      BidParticipantRepository bidParticipantRepository,
                      PaymentRepository paymentRepository) {
    Random rd = new Random();
    Role role = roleRepository.findById(2).get();
    List<User> userAdmin = userRepository
            .findAll()
            .stream()
            .filter(u -> u.getRoles().contains(role))
            .collect(Collectors.toList());

    for (int i = 0; i < 20; i++) {

      System.out.println(propertyRepository.count());
       List<Property> properties = propertyRepository
              .findAllPropertyNotBid();
      Property property = properties.get((int) (Math.random() *( properties.size())));

      long randomNumberInRange = rd.nextInt(10000);
      Bid bid = Bid.builder()
              .property(property)
              .auctioneer(userAdmin
                      .get((int) (Math.random() * userAdmin.size())))
              .conditionReport(this.faker().lorem().sentence())
              .dayOfSale(rd.nextInt(3) % 2 == 0
                      ? LocalDateTime.now().plusMinutes(randomNumberInRange)
                      : LocalDateTime.now().minusMinutes(randomNumberInRange))
              .reservePrice(property.getReservePrice())
              .type("PRIVATE")
              .priceStep(10000000L)
              .status(Arrays.asList("SUCCESS", "DEACTIVE", "ACTIVE", "PROCESSING", "FINISH").get(rd.nextInt(5)))
              .build();
      Bid finalBid = bidRepository.save(bid);
      for (int j = 0; j < 10; j++) {
        BidParticipant participant = new BidParticipant();
        participant.setBid(bid);
        User user;
        do {
          user = userRepository
                  .findAll()
                  .get((int) (Math.random() * userRepository.count()));
        } while (bidParticipantRepository.findByBidAndUser(bid, user).isPresent());
        participant.setUser(user);
        bidParticipantRepository.save(participant);
      }
      if (Arrays.asList("SUCCESS", "FINISH").contains(bid.getStatus())) {
        List<User> userParticipants = userRepository.findAllUserInBid(bid.getId()).stream().filter(u -> u.getId() != finalBid.getAuctioneer().getId()).collect(Collectors.toList());
        bid.setWinningBidder(userParticipants.get((int) (Math.random() * userParticipants.size())));
        bid.setFinishTime(bid.getDayOfSale().plusMinutes(30L));
        bid.setLastPrice((long) (bid.getReservePrice() + Math.random() * 3000000));
        Optional<Payment> paymentOptional = paymentRepository.findByBid(bid);
        paymentOptional.ifPresent(payment -> paymentRepository.deleteById(payment.getId()));
        Payment payment = bid.getStatus().equalsIgnoreCase("SUCCESS")
                ? paymentRepository.save(Payment.builder().bid(bid).status("SUCCESS").build())
                : paymentRepository
                .save(Payment.builder().bid(bid).status(Arrays.asList("PENDING", "FINISH")
                        .get(rd.nextInt(2))).build());
        bidRepository.save(finalBid);
      }


    }
  }

  void initProperty(PropertyRepository propertyRepository, UserRepository userRepository) {
    Random rd = new Random();
    for (int i = 0; i < 20; i++) {
      Property property = Property.builder()
              .name(this.faker().commerce().productName())
              .category(this.faker().commerce().material())
              .description(this.faker().lorem().sentence())
              .bidType("PRIVATE")
              .permission(Arrays.asList("ACCEPTED", "REFUSED", "NOTCHECK").get(rd.nextInt(3)))
              .reservePrice(1200000L)
              .quantity((long) (rd.nextInt(9) + 1))
              .auctioneerPrice(rd.nextInt(3) % 2 == 0 ? 1200000L : null)
              .owner(userRepository
                      .findAll()
                      .get((int) (Math.random() * userRepository.count())))
              .build();
      propertyRepository.save(property);
      if(propertyRepository.countAcceptedProperty() <= 20) i = 0;
    }
  }
}
