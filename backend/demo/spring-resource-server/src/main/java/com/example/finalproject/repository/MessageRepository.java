package com.example.finalproject.repository;

import com.example.finalproject.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
  @Query("select m from Message m where m.status = ?1 and m.receiverName = ?2")
  List<Message> findByStatusAndReceiverName(String status, String receiverName);


  @Query("select m from Message m inner join m.bids b " +
          "where b.id = ?1 and b.dayOfSale < ?2")
  List<Message> findAllMessageInBidRoomActive(Long id, LocalDateTime time);

  @Query("select m from Message m inner join m.bids b where m.senderName = b.winningBidder.email and b.id = :id and m.status = :message_status and m.createdAt between :begin and :last_modified_date")
  List<Message> findAllMessageBySuccessBidId(@Param("id") Long id,
                                             @Param("message_status") String status,
                                             @Param("begin") LocalDateTime dayOfSale,
                                             @Param("last_modified_date") LocalDateTime lastModified);

}
