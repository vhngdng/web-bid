package com.example.finalproject.mapstruct;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.dto.*;
import com.example.finalproject.entity.*;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.StatusBidRepository;
import com.example.finalproject.repository.UserRepository;
import org.mapstruct.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {

  UserDTO toDTO(User user);

  User toEntity(UserDTO userDTO);

  @Mapping(target = "status",
          expression = "java(message.getStatus().getName().toString())")
  @Mapping(target = "bid", ignore = true)
  MessageDTO toDTO(Message message);

  default Set<Long> toListBidId(Set<Bid> bids) {
    return bids.stream().map(Bid::getId).collect(Collectors.toSet());
  }
  List<MessageDTO> toListDTO(List<Message> messageList);

  @Mapping(target = "status" , ignore = true)
  @Mapping(target = "bids", ignore = true)
  Message toEntity(MessageDTO messageDTO);
//
//  @AfterMapping
//  default void after(MessageDTO messageDTO, @MappingTarget Message message, @Context BidRepository bidRepository) {
//    Bid bid = bidRepository.findById(message.getId()).orElseThrow(() -> new NotFoundException("Bid with id: " + message.getId() + " is not found"));
////    message.setStatus(statusMessageRepository.findByName(STATUS_MESSAGE.valueOf(messageDTO.getStatus())));
//    message.setBids(new HashSet<>());
//    message.addBid(bid);
//  }

  Property toEntiTy (PropertyDTO propertyDTO);

  PropertyDTO toDTO (Property propertyDT);

  List<PropertyDTO> toListPropertyDTO(List<Property> properties);

  List<Property> toListProperty(List<PropertyDTO> propertyDTOS);
  @Mapping(target = "status", expression = "java(statusBidRepository.findByStatus(STATUS_BID.valueOf(bidDTO.getStatus())))")
  Bid toEntiTy (BidDTO bidDTO, @Context StatusBidRepository statusBidRepository, @Context STATUS_BID STATUS_BID);
  @Mapping(target = "status", expression = "java(bid.getStatus().getStatus().name())")
  BidDTO toDTO (Bid bid);

  List<BidDTO> toListBidDTO(List<Bid> bidList);

  @Mapping(target = "username",expression = "java(bidParticipant.getUser().getEmail())")
  @Mapping(target = "bidId",expression = "java(bidParticipant.getBid().getId())")
  BidParticipantDTO toDTO (BidParticipant bidParticipant);

  List<BidParticipantDTO> toListParticipantDTO(List<BidParticipant> bidParticipantList);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "status", expression = "java(statusBidRepository.findByStatus(STATUS_BID.valueOf(bidDTO.getStatus())))")
  void updateBid(BidDTO bidDTO, @MappingTarget Bid bid, @Context StatusBidRepository statusBidRepository, @Context STATUS_BID STATUS_BID);
}
