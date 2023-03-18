package com.example.finalproject.mapstruct;

import com.example.finalproject.ENUM.STATUS_TRANSACTION;
import com.example.finalproject.dto.*;
import com.example.finalproject.entity.*;
import com.example.finalproject.repository.PropertyRepository;
import com.example.finalproject.repository.TransactionRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.UpSertProperty;
import com.example.finalproject.response.FinishResponse;
import com.example.finalproject.request.UpSertBid;
import com.example.finalproject.response.ImageResponse;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {

  UserDTO toDTO(User user);

  User toEntity(UserDTO userDTO);

  @Mapping(target = "bid", ignore = true)
  MessageDTO toDTO(Message message);

  default Set<Long> toListBidId(Set<Bid> bids) {
    return bids.stream().map(Bid::getId).collect(Collectors.toSet());
  }

  List<MessageDTO> toListDTO(List<Message> messageList);

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

  Property toEntiTy(PropertyDTO propertyDTO);

  PropertyDTO toDTO(Property property);

  List<PropertyDTO> toListPropertyDTO(List<Property> properties);

  List<Property> toListProperty(List<PropertyDTO> propertyDTOS);

  Bid toEntiTy(BidDTO bidDTO);

  BidDTO toDTO(Bid bid);

  List<BidDTO> toListBidDTO(List<Bid> bidList);

  @Mapping(target = "username", source = "user", qualifiedByName = "mapUserToUsername")
  @Mapping(target = "bidId", expression = "java(bidParticipant.getBid().getId())")
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  BidParticipantDTO toDTO(BidParticipant bidParticipant);

  @Named(value = "mapUserToUsername")
  default String mapUserToUsername(User user) {
    return user != null ? user.getEmail() : null;
  }
  //  @Mapping(target = "user", source = "bidParticipant.user")
//   BidParticipantDto toDto(BidParticipant bidParticipant);


  //  @AfterMapping
//  default void handleNullUser(@MappingTarget BidParticipantDTO dto, BidParticipant bidParticipant) {
//    if (bidParticipant.getUser() == null) {
//      dto.setUsername(null);
//    }
//  }
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  List<BidParticipantDTO> toListParticipantDTO(List<BidParticipant> bidParticipantList);


  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//  @Mapping(target = "auctioneer", source = "auctioneerId", qualifiedByName = {"mapUserIdToUser"})
//  @Mapping(target = "winningBidder", source = "winningBidderId", qualifiedByName = {"mapUserIdToUser"})
  @Mapping(target = "auctioneer", ignore = true)
  @Mapping(target = "winningBidder", ignore = true)
  @Mapping(target = "transaction", ignore = true)
  @Mapping(target = "property", ignore = true)
  void updateBid(UpSertBid upSertBid, @MappingTarget Bid bid);


  default User mapUserIdToUser(Long id, @Context UserRepository userRepository) {
    return id != null
            ? userRepository
            .findById(id)
            .get()
            : null;
  }

  default Transaction mapIdToTransaction(Integer transactionId, @Context TransactionRepository transactionRepository) {
    return transactionId != null
            ? transactionRepository
            .findById(transactionId)
            .get()
            : null;
  }




  @Mapping(target = "winningBidder", ignore = true)
  @Mapping(target = "transaction", ignore = true)
  void updateFromFinishRequest(FinishResponse finishRequest,
                               @MappingTarget Bid bid,
                               @Context UserRepository userRepository,
                               @Context TransactionRepository transactionRepository);

  @AfterMapping
  default void mapWinningBidderAndTransaction(FinishResponse finishRequest, @MappingTarget Bid bid, @Context UserRepository userRepository, @Context TransactionRepository transactionRepository) {
    System.out.println(finishRequest.getWinningBidderUsername());
    bid.setWinningBidder(userRepository.findByEmail(finishRequest.getWinningBidderUsername()).get());
    Transaction transaction = Transaction
            .builder()
            .status(STATUS_TRANSACTION.PENDING.name())
            .bid(bid)
            .build();
    transactionRepository.save(transaction);
  }


  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//  @Mapping(target = "auctioneer", source = "auctioneerId", qualifiedByName = {"mapUserIdToUser"})
//  @Mapping(target = "winningBidder", source = "winningBidderId", qualifiedByName = {"mapUserIdToUser"})
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "auctioneer", ignore = true)
  @Mapping(target = "winningBidder", ignore = true)
  @Mapping(target = "transaction", ignore = true)
  @Mapping(target = "property", ignore = true)
  void createBid(UpSertBid upSertBid, @MappingTarget Bid bid, @Context PropertyRepository propertyRepository, @Context UserRepository userRepository);

  default Property mapIdToProperty(Integer propertyId, @Context PropertyRepository propertyRepository) {
    return propertyId != null
            ? propertyRepository
            .findById(propertyId)
            .get()
            : null;
  }

  default void saveAuctioneerBeforeCreateBid(Bid bid, @Context UserRepository userRepository) {
    if(SecurityContextHolder.getContext().getAuthentication().getName() == null) {
      return;
    }
    User auctioneer = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get();
    bid.setAuctioneer(auctioneer);
  }
  @AfterMapping
  default void mapPropertyAndAuctioneerWhenCreate(UpSertBid upSertBid,
                                                  @MappingTarget Bid bid,
                                                  @Context PropertyRepository propertyRepository,
                                                  @Context UserRepository userRepository) {
    Property property = mapIdToProperty(upSertBid.getPropertyId(), propertyRepository);
    saveAuctioneerBeforeCreateBid(bid, userRepository);
    bid.setProperty(property);
  }
  @Mapping(target = "userEmail", expression = "java(image.getUser().getEmail())")
  @Mapping(target = "propertyId", source = "property", qualifiedByName = "mapPropertyToPropertyId")
  @Mapping(target = "url", ignore = true)
  ImageResponse toImageResponse(Image image);

  @Named(value = "mapPropertyToPropertyId")
  default Integer mapPropertyToPropertyId(Property property) {
    return property != null ? property.getId() : null;
  }

  @AfterMapping
  default String mapUrl(Image image) {
    return ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/api/v1/images")
            .path(image.getId())
            .toUriString();
  }

  List<ImageResponse> toListImageResponse(List<Image> imageList);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "owner", ignore = true)
  void createProperty(UpSertProperty upSertProperty, @MappingTarget Property property, @Context UserRepository userRepository);

  @AfterMapping
  default void setOwnerForProperty(UpSertProperty upSertProperty, @MappingTarget Property property, @Context UserRepository userRepository) {
    User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);
    property.setOwner(user);
  }
}
