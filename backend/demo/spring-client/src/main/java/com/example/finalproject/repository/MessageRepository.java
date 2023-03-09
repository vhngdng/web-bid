package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Message;
import com.example.finalproject.entity.StatusMessage;
import com.example.finalproject.projection.BidMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
  @Query("select m from Message m where m.status = ?1 and m.receiverName = ?2")
  List<Message> findByStatusAndReceiverName(StatusMessage status, String receiverName);


  @Query("select m from Message m inner join m.bids b " +
          "where b.id = ?1 and b.dayOfSale < ?2")
  List<Message> findAllMessageInBidRoomActive(Long id, LocalDateTime time);
}
