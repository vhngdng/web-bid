package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.BidParticipant;
import com.example.finalproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BidParticipantRepository extends JpaRepository<BidParticipant, Long> {

  List<BidParticipant> findByBid_Id(Long id);

  Optional<BidParticipant> findByBidAndUser(Bid bid, User user);
}