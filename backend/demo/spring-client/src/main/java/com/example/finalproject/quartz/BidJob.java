package com.example.finalproject.quartz;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.dto.MessageDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.TransactionRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.ChangeBidStatusRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Component
@Slf4j
@EnableAsync
@Transactional
public class BidJob extends QuartzJobBean {
  @Autowired
  private BidRepository bidRepository;


  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;



  @Override
  @Async
  protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
    log.info("Executing Job with key {}", context.getJobDetail().getKey());
    JobDataMap jobDataMap = context.getMergedJobDataMap();
    Long id = (Long) jobDataMap.get("id");
    Bid bid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid id: " + id + " is not found"));
    setScheduler(bid);
  }

  protected void setScheduler(Bid bid) {
    if (bid.getStatus().equalsIgnoreCase(STATUS_BID.DEACTIVE.name())) {
      openActiveScheduler(bid);
    } else if (bid.getStatus().equalsIgnoreCase(STATUS_BID.ACTIVE.name())) {
      processBidScheduler(bid);
    } else if (bid.getStatus().equalsIgnoreCase(STATUS_BID.PROCESSING.name())) {
      closeBidScheduler(bid);
    }
  }

  /// convert
  protected void openActiveScheduler(Bid bid) {
//    log.info("bid status open before time:", bidRepository.findById(bid.getId()).get().getStatus());
    ChangeBidStatusRequest request = ChangeBidStatusRequest
            .builder()
            .status(STATUS_BID.ACTIVE.name())
            .build();
    String destination = "/room/" + bid.getId().toString();
    simpMessagingTemplate.convertAndSend(destination, request);
    bid.setStatus(STATUS_BID.ACTIVE.name());
    bidRepository.save(bid);
  }

  protected void processBidScheduler(Bid bid) {
    log.info("bid status open before time:", bidRepository.findById(bid.getId()).get().getStatus());
    ChangeBidStatusRequest request = ChangeBidStatusRequest
            .builder()
            .status(STATUS_BID.PROCESSING.name())
            .build();
    String destination = "/room/" + bid.getId().toString();
    simpMessagingTemplate.convertAndSend(destination, request);
    bid.setStatus(STATUS_BID.PROCESSING.name());
    bidRepository.save(bid);

  }

  protected void closeBidScheduler(Bid bid) {
    log.info("bid status close: ", bidRepository.findById(bid.getId()).get().getStatus());
    ChangeBidStatusRequest request = ChangeBidStatusRequest
            .builder()
            .status(STATUS_BID.FINISH.name())
            .build();
    String destination = "/room/" + bid.getId().toString();
    simpMessagingTemplate.convertAndSend(destination, request);
    bid.setStatus(STATUS_BID.FINISH.name());
    bidRepository.save(bid);

  }

//  protected void closeAfterSuccess(Bid bid) {
//    if(bid.getStatus().equalsIgnoreCase(STATUS_BID.PROCESSING.name())) {
//      bid.setStatus(STATUS_BID.ACTIVE.name());
//      bidRepository.save(bid);
//      log.info("bid status open before time:" ,bidRepository.findById(bid.getId()).get().getStatus());
//    }
//  }
}
