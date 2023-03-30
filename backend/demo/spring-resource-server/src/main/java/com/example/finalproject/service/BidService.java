package com.example.finalproject.service;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import com.example.finalproject.dto.BidDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Property;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.*;
import com.example.finalproject.request.UpSertBid;
import com.example.finalproject.utils.QuartUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BidService {
  private final ImageRepository imageRepository;
  private final TransactionRepository transactionRepository;
  private final PropertyRepository propertyRepository;
  private final UserRepository userRepository;
  private final BidRepository bidRepository;
  private final Mapper mapper;
  private final Scheduler scheduler;
  private final QuartUtil quartUtil;

  public List<BidDTO> findAllBid() {
    return mapper.toListBidDTO(bidRepository.findAll(), userRepository, imageRepository);
  }



  public BidDTO findBidRoomByid(Long id) {
    return mapper.toDTO(bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with: " + id + " is not found")), userRepository, imageRepository);
  }
  public BidDTO createBidRoom(UpSertBid upSertBid) {
    Bid bid = new Bid();

    mapper.createBid(upSertBid, bid, propertyRepository, userRepository);
    bidRepository.save(bid);
//    schedulerChangeBidStatus(bidRepository.save(bid));
    return mapper.toDTO(bid, userRepository, imageRepository);
  }

  public BidDTO closeBidRoom(UpSertBid upSertBid, Long id) {
    log.debug("check error");
    Bid oldBid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with id " + id + " was not found"));
    if (upSertBid.getAuctioneerId() != null) {
      oldBid.setAuctioneer(
              userRepository
                      .findById(upSertBid.getAuctioneerId())
                      .orElseThrow(() -> new NotFoundException("Auctionner with id " + upSertBid.getAuctioneerId() + " not found")));
    }
    if (upSertBid.getWinningBidderId() != null) {
      oldBid.setWinningBidder(
              userRepository
                      .findById(upSertBid.getWinningBidderId())
                      .orElseThrow(() -> new NotFoundException("Auctionner with id " + upSertBid.getWinningBidderId() + " not found")));
    }
    if (upSertBid.getStatus().equalsIgnoreCase("DEACTIVE")) {

      mapper.updateBid(upSertBid, oldBid);
      log.info(oldBid.getAuctioneer().getEmail());
    } else if (upSertBid.getStatus().equalsIgnoreCase("FINISH")) {
      mapper.updateBid(upSertBid, oldBid);
    } else {
      return BidDTO.builder()
              .status("ACTIVE")
              .build();
    }
    return mapper.toDTO(oldBid, userRepository, imageRepository);
  }
  public BidDTO updateBidRoom(UpSertBid upSertBid, Long id) {
    Bid bid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with id " + id + " was not found"));
    if(upSertBid.getStatus().equalsIgnoreCase(STATUS_BID.FINISH.name())) {
      Optional<Transaction> transactionOptional = transactionRepository.findByBid(bid);
      log.error("==========================");
      if(transactionOptional.isPresent()) {
        log.error(transactionOptional.get().getId().toString());
        transactionRepository.deleteById(transactionOptional.get().getId());
      }
      transactionRepository.save(Transaction.builder().bid(bid).status("PENDING").build());
    }
    mapper.updateBid(upSertBid, bid);
    schedulerChangeBidStatus(bid);
    return mapper.toDTO(bid, userRepository, imageRepository);
  }

  public void schedulerChangeBidStatus(Bid bid) {
    try {
      Date startAt = Date.from(bid.getDayOfSale().atZone(ZoneId.systemDefault()).toInstant());
//      if(dayOfSale.before(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))){
//        throw new BadRequestException("Day of sale is not valid");
//      }


      if (bid.getStatus().equalsIgnoreCase(STATUS_BID.DEACTIVE.name())) {
        log.info("check status before create job and trigger", bid.getStatus());
        JobDetail jobDetailActive = quartUtil.buildJobDetail(bid);
//        Date timeToClose = Date.from(bid.getDayOfSale().plusMinutes(15L).atZone(ZoneId.systemDefault()).toInstant());
//        Date timeToProcess = Date.from(bid.getDayOfSale().plusMinutes(5L).atZone(ZoneId.systemDefault()).toInstant());
        Date timeToClose = Date.from(LocalDateTime.now().plusMinutes(3L).atZone(ZoneId.systemDefault()).toInstant());
        Date timeToProcess = Date.from(LocalDateTime.now().plusMinutes(2L).atZone(ZoneId.systemDefault()).toInstant());
        // trigger process
        JobDetail jobDetailProcess = quartUtil.buildJobDetail(bid);
        Trigger triggerProcess = quartUtil.buildJobTrigger(jobDetailProcess, timeToProcess);
        // trigger close
        JobDetail jobDetailClose = quartUtil.buildJobDetail(bid);
        Trigger triggerClose = quartUtil.buildJobTrigger(jobDetailClose, timeToClose);

//      } else if (bid.getStatus().equalsIgnoreCase(STATUS_BID.ACTIVE.name())) {
//        startAt = Date.from(bid.getDayOfSale().plusMinutes(15L).atZone(ZoneId.systemDefault()).toInstant());
//      } else if (bid.getStatus().equalsIgnoreCase(STATUS_BID.PROCESSING.name())) {
//        startAt = Date.from(bid.getDayOfSale().plusMinutes(5L).atZone(ZoneId.systemDefault()).toInstant());
//      }
        // trigger active
        Date start = Date.from(LocalDateTime.now().plusMinutes(1).atZone(ZoneId.systemDefault()).toInstant());
        Trigger triggerActive = quartUtil.buildJobTrigger(jobDetailActive, start);
        scheduler.scheduleJob(jobDetailActive, triggerActive);
        scheduler.scheduleJob(jobDetailProcess, triggerProcess);
        scheduler.scheduleJob(jobDetailClose, triggerClose);
      }
    } catch (SchedulerException e) {
      throw new RuntimeException(e);
    }
  }

  public List<BidDTO> findListBidRoomBeforeFinish(String auctioneerEmail) {
//    Bid bid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with id: " + id + " is not found"));
//    if (!auctioneerEmail.equalsIgnoreCase(bid.getAuctioneer().getEmail())) {
//      throw new BadRequestException("The email of auctioneer is not valid");
//    }
    List<Bid> listBidFinish = bidRepository.findListBidRoomBeforeFinish(auctioneerEmail, STATUS_TRANSACTION.SUCCESS.name());
    return mapper.toListBidDTO(listBidFinish, userRepository, imageRepository);
  }

  public BidDTO upDateBidRoomSuccess(String auctioneerEmail, Long id) {
    Bid bid = bidRepository.findByIdAndAuctioneerEmail(id, auctioneerEmail);
    bid.setStatus(STATUS_BID.SUCCESS.name());
    Property property = bid.getProperty();
    property.setOwner(bid.getWinningBidder());
    propertyRepository.save(property);
    return mapper.toDTO(bidRepository.save(bid), userRepository, imageRepository);
  }

  public List<BidDTO> getAllBidPreparingToRun() {
    return mapper.toListBidDTO(bidRepository.findAllBidPreparingToRun(), userRepository, imageRepository);
  }

  public List<BidDTO> findBidRoomBeforeStartDate(Long id) {
    return null;
  }

  public Page<BidDTO> findAllBidRoomPaging(int page, int size, String[] sort) {
    List<Sort.Order> orders = new ArrayList<>();
      if (sort[0].contains(",")) {
        for(String sortOrder : sort) {
          String[] _sort = sortOrder.split(",");
          orders.add(new Sort.Order(_sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, _sort[0]));
        }
      } else {
        orders.add(new Sort.Order(sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sort[0]));
      }
    Pageable pageable = PageRequest.of(page, size, Sort.by(orders));
    Page<Bid> bidPage = bidRepository.findAll(pageable);
    List<BidDTO> bidDTOList = mapper.toListBidDTO(bidPage.getContent(), userRepository, imageRepository);
    return new PageImpl<>(bidDTOList, pageable, bidPage.getTotalElements());
  }



}
