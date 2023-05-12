package com.example.finalproject.service.Impl;

import com.example.finalproject.dto.BidParticipantDTO;
import com.example.finalproject.entity.BidParticipant;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.BidParticipantRepository;
import com.example.finalproject.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidParticipantService {

  @Autowired
  private BidParticipantRepository bidParticipantRepository;
  @Autowired
  private Mapper mapper;
  @Autowired
  private ImageRepository imageRepository;

  public List<BidParticipantDTO> getAllParitipantWithBidId(Long id) {
     return mapper.toListParticipantDTO(bidParticipantRepository.findByBid_Id(id), imageRepository);
  }


  public void delete(Long id) {
     bidParticipantRepository.deleteById(id);
  }
}
