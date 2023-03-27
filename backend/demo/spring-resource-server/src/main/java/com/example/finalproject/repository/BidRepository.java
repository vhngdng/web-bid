package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Property;
import com.example.finalproject.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

  boolean existsByProperty(Property property);
  @Query("select t.bid from Transaction t where t.bid.auctioneer.email = :auctioneerEmail and t.status = :statusTransaction and t.bid.status = 'FINISH'")
  List<Bid> findListBidRoomBeforeFinish(@Param("auctioneerEmail") String auctioneerEmail, @Param("statusTransaction") String statusTransaction);

  Bid findByIdAndAuctioneerEmail(Long id, String auctioneerEmail);
  @Query("select b from Bid b where b.status is null")
  List<Bid> findAllBidPreparingToRun();

  Optional<Bid> findByTransactionId(Integer transactionId);
}