package com.example.finalproject.utils;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.quartz.BidJob;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@Slf4j
public class QuartUtil {


  public JobDetail buildJobDetail(Bid bid) {
    JobDataMap jobDataMap = new JobDataMap();
    jobDataMap.put("id", bid.getId());

    return JobBuilder
            .newJob(BidJob.class)
            .withIdentity(UUID.randomUUID().toString(), "bid")
            .withDescription("close bid")
            .usingJobData(jobDataMap)
            .storeDurably()
            .build();
  }

  public Trigger buildJobTrigger(JobDetail jobDetail, Date startAt) {
//    Date start = Date.from(LocalDateTime.now().plusMinutes(1).atZone(ZoneId.systemDefault()).toInstant());
    return TriggerBuilder.newTrigger()
            .forJob(jobDetail)
            .withIdentity(jobDetail.getKey().getName(), "bid-triggers")
            .withDescription("Close Bid Trigger")
            .startAt(startAt)
            .withSchedule(SimpleScheduleBuilder.simpleSchedule().withMisfireHandlingInstructionFireNow())
            .build();
  }
//
//  public Bid convertJobContextToBid(JobExecutionContext context) {
//    JobDataMap jobDataMap = context.getMergedJobDataMap();
//    Long id = jobDataMap.getLongFromString("id");
//    String status = String.valueOf(jobDataMap.get("status"));
//    String type = String.valueOf(jobDataMap.get("type"));
//    Integer propertyId = jobDataMap.getInt("propertyId");
//    String conditionRepost = String.valueOf(jobDataMap.get("conditionReport"));
//    Long auctioneerId = jobDataMap.getLongFromString("auctioneerId");
//    Long lastPrice = jobDataMap.getLongFromString("lastPrice");
//    Integer PaymentId = jobDataMap.getIntegerFromString("PaymentId");
//    LocalDateTime dayOfSale = LocalDateTime.parse(jobDataMap.get("dayOfSale").toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));
//    Long reservePrice = jobDataMap.getLongFromString("reservePrice");
//    Long priceStep = jobDataMap.getLongFromString("priceStep");
//    Long updatePrice = jobDataMap.getLongFromString("updatePrice");
//    Long winningBidderId = jobDataMap.getLongFromString("winningBidderId");
//    return Bid
//            .builder()
//            .id(id)
//            .status(status)
//            .property(propertyRepository.findById(propertyId).orElse(null))
//            .Payment(PaymentRepository.findById(PaymentId).orElse(null))
//            .priceStep(priceStep)
//            .type(type)
//            .reservePrice(reservePrice)
//            .conditionReport(conditionRepost)
//            .auctioneer(userRepository.findById(auctioneerId).orElse(null))
//            .dayOfSale(dayOfSale)
//            .updatePrice(updatePrice)
//            .winningBidder(userRepository.findById(winningBidderId).orElse(null))
//            .lastPrice(lastPrice)
//            .build();
//  }
}

