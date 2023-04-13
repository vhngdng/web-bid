package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Payment;
import com.example.finalproject.projection.PaymentProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
  @Query("select t from Payment t where t.status <> :status and (t.bid.auctioneer.id = :userId or t.bid.winningBidder.id =: userId)")
  List<Payment> findAllByStatusAndBid(@Param("status") String status, @Param("userId") Long userId);
  @Query("select t.id as id,  t.status as status, t.bid.winningBidder.email as winningBidderEmail, t.bid.id as bidId, t.bid.lastPrice as lastPrice, " +
          "t.bid.auctioneer.email as auctioneerEmail, t.createdAt as createdAt, t.lastModifiedDate as lastModifiedDate " +
          "from Payment t " +
          "where t.bid.auctioneer.id = :userId or t.bid.winningBidder.id =: userId")
  List<PaymentProject> findAllPaymentByUserLogin(@Param("userId") Long userId);

  @Query("select t.id as id,  t.status as status, t.bid.winningBidder.email as winningBidderEmail, t.bid.id as bidId, t.bid.lastPrice as lastPrice, " +
          "t.bid.auctioneer.email as auctioneerEmail, t.createdAt as createdAt, t.lastModifiedDate as lastModifiedDate " +
          "from Payment t " +
          "where t.id = :id")
  Optional<PaymentProject> findDetailPaymentById(@Param("id") Integer id);
  Optional<Payment> findByBid_Id (long bidId);

  Optional<Payment> findByBid (Bid bid);

  @Query("select t from Payment t where t.bid.status = :status and (t.bid.auctioneer.id = :userId or t.bid.winningBidder.id =: userId)")
  List<Payment> findAllByBidStatus(@Param("status") String status, @Param("userId") Long id);
}