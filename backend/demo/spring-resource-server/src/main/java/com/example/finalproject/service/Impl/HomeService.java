package com.example.finalproject.service.Impl;

import com.example.finalproject.projection.home.BidHomeProjection;
import com.example.finalproject.projection.home.PropertyHomeProjection;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.response.HomeResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

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
  @Autowired
  BidService bidService;
  @Autowired
  PropertyService propertyService;
  @Async
  public CompletableFuture<HomeResponse> findHomeDetail() {
    Pageable pageable = PageRequest.of(0, 5);
    return CompletableFuture.completedFuture(HomeResponse
            .builder()
            .bidEarliestTop5(bidRepository.findTop5Earliest(pageable, LocalDateTime.now()).getContent())
            .bidFamousTop5(bidRepository.findBidTop5Attend(pageable).getContent())
            .propertyTop5(propertyRepository.findPropertyTop5(pageable).getContent())
            .userRateTop5(userRepository.findUserTop5(pageable).getContent())
            .build());
  }

  public Page<Object> search(String keyword, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    List<Object> result = new ArrayList<>();

    CompletableFuture<List<BidHomeProjection>> bid = bidService.searchBid(keyword);
    CompletableFuture<List<PropertyHomeProjection>> property = propertyService.search(keyword);
    CompletableFuture
            .allOf(bid, property)
            .thenApplyAsync(v -> {
              result.addAll(bid.join());
              result.addAll(property.join());
              return result;
            })
            .join();
    int offset = page * size;
    int endIndex = Math.min(offset + size, result.size());
    List<Object> content = result.subList(offset, endIndex);
    return new PageImpl<>(content, pageable, result.size());
  }


}
