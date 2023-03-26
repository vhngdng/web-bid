package com.example.finalproject.quartz;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.TransactionRepository;
import com.example.finalproject.request.TransactionRequest;
import com.example.finalproject.service.BidService;
import com.example.finalproject.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Component
@Slf4j
@EnableAsync
@Transactional
public class BidJob extends QuartzJobBean {
  @Autowired
  private BidRepository bidRepository;
  @Autowired
  private BidService bidService;

  @Autowired
  private TransactionService transactionService;
  @Override
  protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
    log.info("Executing Job with key {}", context.getJobDetail().getKey());
    JobDataMap jobDataMap = context.getMergedJobDataMap();
    Long id = (Long) jobDataMap.get("id");
    Bid bid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid id: " + id + " is not found"));
    setScheduler(bid);
  }

  protected void setScheduler(Bid bid) {
    if (bid.getStatus().equalsIgnoreCase(STATUS_BID.DEACTIVE.name())) {
      bid.setStatus(STATUS_BID.ACTIVE.name());
      bidRepository.save(bid);
    } else if (bid.getStatus().equalsIgnoreCase(STATUS_BID.ACTIVE.name())) {
      bid.setStatus(STATUS_BID.PROCESSING.name());
      bidRepository.save(bid);
    } else if (bid.getStatus().equalsIgnoreCase(STATUS_BID.PROCESSING.name())) {
//      log.error("========================================================================");
//

//      log.error("before save transaction");
//      Transaction transaction = transactionRepository.save(Transaction.builder().bid(bid).status("PENDING").build());
//      log.error(transaction.getStatus());
      Transaction transaction = transactionService.createTransaction(new TransactionRequest("PENDING", bid.getId()));
      bid.setStatus(STATUS_BID.FINISH.name());
      bid.setTransaction(transaction);
      log.info(bid.getTransaction().getStatus());

      bidRepository.save(bid);
    }
  }


}
