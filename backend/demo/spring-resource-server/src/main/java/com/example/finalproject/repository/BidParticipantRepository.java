package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.BidParticipant;
import com.example.finalproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BidParticipantRepository extends JpaRepository<BidParticipant, Long> {
  @Query("select b from BidParticipant b " +
          "where b.bid.id = ?1 and b.user is not null "
          )
  List<BidParticipant> findByBid_Id(Long id);

  Optional<BidParticipant> findByBidAndUser(Bid bid, User user);


}