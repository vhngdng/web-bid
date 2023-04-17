package com.example.finalproject;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.projection.BidHomeProjection;
import com.example.finalproject.repository.BidRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Random;
import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class BidTest {
  @Autowired
  public BidRepository bidRepository;

  @Test
  public void findBidTop5AttendTest() {
    Pageable pageable = PageRequest.of(0, 5);
    String params = "b.status = 'SUCCESS' order by count(bp.user) desc";
    Page<BidHomeProjection> bidPage = bidRepository.findBidTop5Attend(pageable);
//    Page<Bid> bidPage = bidRepository.findBidTop5(pageable);

    System.out.println(bidPage.getContent().stream().map(BidHomeProjection::getId).collect(Collectors.toList()));
//    System.out.println(bidPage.getContent().stream().map(Bid::getId).collect(Collectors.toList()));

  }
}
