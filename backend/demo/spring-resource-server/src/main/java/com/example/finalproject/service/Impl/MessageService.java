package com.example.finalproject.service.Impl;

import com.example.finalproject.ENUM.STATUS_BID;
import com.example.finalproject.ENUM.STATUS_MESSAGE;
import com.example.finalproject.dto.BidParticipantDTO;
import com.example.finalproject.dto.MessageDTO;
import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.BidParticipant;
import com.example.finalproject.entity.Message;
import com.example.finalproject.entity.Payment;
import com.example.finalproject.exception.BadRequestException;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.*;
import com.example.finalproject.request.PaymentRequest;
import com.example.finalproject.response.FinishResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
//@Scope(value="prototype", proxyMode= ScopedProxyMode.TARGET_CLASS)
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MessageService {
  private final ImageRepository imageRepository;
  private final PaymentRepository PaymentRepository;
  private final UserRepository userRepository;
  private final BidParticipantRepository bidParticipantRepository;
  private final MessageRepository messageRepository;
  private final Mapper mapper;
  private final BidRepository bidRepository;

  private final PaymentService paymentService;


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
  @Transactional(noRollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
  public BidParticipantDTO saveJoinMessage(MessageDTO messageDTO) {
    Optional<BidParticipant> participant = findParticipant(messageDTO);
    if (participant.isPresent()) {
      participant.get().setNickName(messageDTO.getNickName());
      BidParticipantDTO bidParticipantDTO = mapper.toDTO(bidParticipantRepository.save(participant.get()), imageRepository);
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
            .build()), imageRepository);
    bidParticipantDTO.setStatus("JOIN");
    return bidParticipantDTO;

  }


  public List<MessageDTO> findAllPublic() {
    return mapper.toListDTO(messageRepository.findByStatusAndReceiverName(STATUS_MESSAGE.MESSAGE.name(), "public"));
  }

  public List<MessageDTO> getAllBidMessage(Long id) {
    Bid bid = bidRepository.findById(id).orElseThrow(() -> new NotFoundException("Bid with id: " + id + " is not found"));
    LocalDateTime time = bid.getDayOfSale();
    // test api
    LocalDateTime finish = bid.getFinishTime();
    List<Message> messages = messageRepository.findAllMessageInBidRoom(id, time, finish);
    return mapper.toListDTO(messages);
  }
  @Async
  public CompletableFuture<Object> saveWithBidId(MessageDTO messageDTO) {
    Bid bid = bidRepository.findById(messageDTO.getBid()).orElseThrow(() -> new NotFoundException("Bid with id: " + messageDTO.getBid() + " is not found"));
    Message message = mapper.toEntity(messageDTO);
    message.setBids(new HashSet<>());
    message.addBid(bid);
    if (messageDTO.getStatus().equals("LEAVE")) {
      messageRepository.save(message);
      return CompletableFuture.completedFuture(saveLeaveMessage(messageDTO));
    }
    messageRepository.save(message);
    if (messageDTO.getStatus().equals("JOIN")) {
      log.info("save");
      return CompletableFuture.completedFuture(saveJoinMessage(messageDTO));
    }

    if (bid.getUpdatePrice() != null) {
      bid.setUpdatePrice(bid.getUpdatePrice() + messageDTO.getIncreaseAmount());
    } else {
      bid.setUpdatePrice(bid.getReservePrice() + messageDTO.getIncreaseAmount());
    }
    bid.setWinningBidder(userRepository
            .findByEmail(messageDTO.getSenderName())
            .orElseThrow(() -> new UsernameNotFoundException("Email of sender: " + messageDTO.getSenderName() + " is not found")));
    bidRepository.save(bid);
    return CompletableFuture.completedFuture(mapper.toDTO(message));
  }
  @Transactional(noRollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
  public BidParticipantDTO saveLeaveMessage(MessageDTO messageDTO) {
    Optional<BidParticipant> participant = findParticipant(messageDTO);

    participant.ifPresent(bidParticipantRepository::delete);
    BidParticipantDTO bidParticipantDTO = mapper.toDTO(participant.orElseThrow(() -> new NotFoundException("participant not found")), imageRepository);
    bidParticipantDTO.setStatus(STATUS_MESSAGE.LEAVE.name());
    return bidParticipantDTO;
  }
  @Async
  public void finishBid(FinishResponse request) {
    Bid bid = bidRepository.findById(request.getId()).orElseThrow(() -> new NotFoundException("Bid with Id: " + request.getId() + " is not found"));
    if(request.getWinningBidderUsername() == null) {
      bid.setStatus(null);
      throw new BadRequestException("The bid is not finish because it has no winner");
    }
    Payment payment = paymentService.createPayment(new PaymentRequest("PENDING", bid.getId()));
    bid.setStatus(STATUS_BID.FINISH.name());
    bid.setPayment(payment);
    mapper.updateFromFinishRequest(request, bid, userRepository);
  }

  public List<MessageDTO> getAllMessageBySuccessBidId(Integer PaymentId) {
    Bid bid = bidRepository.findByPaymentId(PaymentId).orElseThrow(() -> new NotFoundException("Bid with Payment id: " + PaymentId + " is not found"));
    LocalDateTime finishTime = bid.getFinishTime();
    LocalDateTime dayOfSale = bid.getDayOfSale();
    return mapper.toListDTO(messageRepository.findAllMessageBySuccessBidId(bid.getId(), STATUS_MESSAGE.MESSAGE.name(), dayOfSale, finishTime));
  }
}
