package com.example.finalproject.service;

import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.dto.BidParticipantDTO;
import com.example.finalproject.dto.MessageDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.BidParticipant;
import com.example.finalproject.entity.Message;
import com.example.finalproject.entity.StatusMessage;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.BidMessage;
import com.example.finalproject.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
//@Scope(value="prototype", proxyMode= ScopedProxyMode.TARGET_CLASS)
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MessageService {
  private final UserRepository userRepository;
  private final BidParticipantRepository bidParticipantRepository;
  private final MessageRepository messageRepository;
  private final StatusMessageRepository statusMessageRepository;
  private final Mapper mapper;
  private final BidRepository bidRepository;

//  @Transactional
//  public Object save(MessageDTO messageDTO) {
//    Message message = mapper.toEntity(messageDTO);
//    message.setStatus(statusMessageRepository.findByName(STATUS_MESSAGE.valueOf(messageDTO.getStatus())));
//    messageRepository.save(message);
//    log.info("status", messageDTO.getStatus());
//    if (messageDTO.getStatus().equals("JOIN")) {
//      log.info("save");
//      return saveJoinMessage(messageDTO);
//    }
//    log.info("save without join");
//    return mapper.toDTO(message);
//  }

  public Optional<BidParticipant> findParticipant(MessageDTO messageDTO) {
    return bidParticipantRepository.findByBidAndUser(
            bidRepository
                    .findById(messageDTO.getBid())
                    .orElseThrow(() -> new NotFoundException("Bid is not exist with id: " + messageDTO.getBid())),
            userRepository
                    .findByEmail(messageDTO.getSenderName())
                    .orElseThrow(() -> new NotFoundException("Bid is not exist with id: " + messageDTO.getBid()))
    );
  }
  @Transactional
  public BidParticipantDTO saveJoinMessage(MessageDTO messageDTO) {
    Optional<BidParticipant> participant = findParticipant(messageDTO);
    if (participant.isPresent()) {
      participant.get().setNickName(messageDTO.getNickName());
      BidParticipantDTO bidParticipantDTO = mapper.toDTO(bidParticipantRepository.save(participant.get()));
      bidParticipantDTO.setStatus("JOIN");
      return bidParticipantDTO;
    }
    BidParticipantDTO bidParticipantDTO = mapper.toDTO(bidParticipantRepository.save(BidParticipant
            .builder()
            .bid(bidRepository
                    .findById(messageDTO.getBid())
                    .orElseThrow(() -> new NotFoundException("Bid is not exist with id: " + messageDTO.getBid())))
            .user(userRepository
                    .findByEmail(messageDTO.getSenderName())
                    .orElseThrow(() -> new NotFoundException("Bid is not exist with id: " + messageDTO.getBid())))
            .build()));
    bidParticipantDTO.setStatus("JOIN");
    return bidParticipantDTO;

  }


  public List<MessageDTO> findAllPublic() {
    StatusMessage publicStatus = statusMessageRepository.findById(2).orElseThrow(() -> new UsernameNotFoundException("can find status"));
    return mapper.toListDTO(messageRepository.findByStatusAndReceiverName(publicStatus, "public"));
  }

  public List<MessageDTO> getAllBidMessage(Long id) {
    Bid bid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with id: " + id + " is not found"));
    LocalDateTime time = bid.getDayOfSale();
    // test api
    LocalDateTime timeTest = time.plusDays(1);
    List<Message> messages = messageRepository.findAllMessageInBidRoomActive(id, timeTest);
    return mapper.toListDTO(messages);
  }

  public Object saveWithBidId(MessageDTO messageDTO) {
    Bid bid = bidRepository.findById(messageDTO.getBid()).orElseThrow(() -> new NotFoundException("Bid with id: " + messageDTO.getBid() + " is not found"));
    Message message = mapper.toEntity(messageDTO);
    message.setStatus(statusMessageRepository.findByName(STATUS_MESSAGE.valueOf(messageDTO.getStatus())));
    message.setBids(new HashSet<>());
    message.addBid(bid);
    if(messageDTO.getStatus().equals("LEAVE")) {
      message.setStatus(statusMessageRepository.findByName(STATUS_MESSAGE.valueOf(messageDTO.getStatus())));
      messageRepository.save(message);
      return saveLeaveMessage(messageDTO);
    }
    messageRepository.save(message);
    if (messageDTO.getStatus().equals("JOIN")) {
      log.info("save");
      return saveJoinMessage(messageDTO);
    }

    if (bid.getUpdatePrice() != null) {
      bid.setUpdatePrice(bid.getUpdatePrice() + messageDTO.getIncreaseAmount());
    } else {
      bid.setUpdatePrice(bid.getReservePrice() + messageDTO.getIncreaseAmount());
    }
     bidRepository.save(bid);
    return mapper.toDTO(message);
  }

  private BidParticipantDTO saveLeaveMessage(MessageDTO messageDTO) {
    Optional<BidParticipant> participant = findParticipant(messageDTO);
    if(participant.isPresent()){
      bidParticipantRepository.delete(participant.get());
    }

    BidParticipantDTO bidParticipantDTO = mapper.toDTO(participant.get());
    bidParticipantDTO.setStatus("LEAVE");
    return bidParticipantDTO;
  }
}
