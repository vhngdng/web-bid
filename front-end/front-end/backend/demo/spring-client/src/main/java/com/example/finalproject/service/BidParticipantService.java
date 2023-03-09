package com.example.finalproject.service;

import com.example.finalproject.dto.BidParticipantDTO;
import com.example.finalproject.entity.BidParticipant;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.BidParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidParticipantService {

  @Autowired
  private BidParticipantRepository bidParticipantRepository;
  @Autowired
  private Mapper mapper;
  public List<BidParticipantDTO> getAllParitipantWithBidId(Long id) {
     return mapper.toListParticipantDTO(bidParticipantRepository.findByBid_Id(id));
  }


}
