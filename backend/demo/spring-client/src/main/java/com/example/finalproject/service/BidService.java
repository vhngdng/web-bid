package com.example.finalproject.service;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.dto.BidDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.StatusBid;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.StatusBidRepository;
import com.example.finalproject.request.UpSertBid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BidService {
  private final BidRepository bidRepository;
  private final Mapper mapper;
  @Autowired
  private StatusBidRepository statusBidRepository;

  public List<BidDTO> findAllBid() {
    return mapper.toListBidDTO(bidRepository.findAll());
  }

  public BidDTO findBidRoomByid(Long id) {
    return mapper.toDTO(bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with: " + id + " is not found")));
  }

  public BidDTO createBidRoom(UpSertBid upSertBid) {
    StatusBid status = statusBidRepository.findByStatus(STATUS_BID.valueOf("DEACTIVE"));
    bidRepository.save(
            Bid
                    .builder()
                    .property(upSertBid.getProperty())
                    .dayOfSale(upSertBid.getDayOfSale())
                    .conditionReport(upSertBid.getConditionReport())
                    .reservePrice(upSertBid.getReservePrice())
                    .type(upSertBid.getType())
                    .priceStep(upSertBid.getPriceStep())
                    .transaction(upSertBid.getTransaction())
                    .property(upSertBid.getProperty())
                    .status(status)
            .build());
    return null;
  }
}
