package com.example.finalproject.service;

import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.response.HomeResponse;
import com.example.finalproject.response.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class HomeService {
  private final UserRepository userRepository;
  @Autowired
  BidRepository bidRepository;
  @Autowired
  PropertyRepository propertyRepository;
  @Autowired
  PaymentService paymentService;

  public HomeResponse findHomeDetail() {
    Pageable pageable = PageRequest.of(0, 5);
    return HomeResponse
            .builder()
            .bidEarliestTop5(bidRepository.findTop5Earliest(pageable, LocalDateTime.now()).getContent())
            .bidFamousTop5(bidRepository.findBidTop5Attend(pageable).getContent())
            .propertyTop5(propertyRepository.findPropertyTop5(pageable).getContent())
            .userRateTop5(userRepository.findUserTop5(pageable).getContent())
            .build();
//    return bidRepository.findBidTop5Attend(pageable).getContent();
  }


  public Object search(String keyword) {
     bidRepository.search(keyword);
    return propertyRepository.search(keyword);
  }
}
