package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.projection.TransactionProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
  @Query("select t from Transaction t where t.status <> :status and (t.bid.auctioneer.id = :userId or t.bid.winningBidder.id =: userId)")
  List<Transaction> findAllByStatusAndBid(@Param("status") String status, @Param("userId") Long userId);
  @Query("select t.id as id,  t.status as status, t.bid.winningBidder.email as winningBidderEmail, t.bid.id as bidId, " +
          "t.bid.auctioneer.email as auctioneerEmail, t.createdAt as createdAt, t.lastModifiedDate as lastModifiedDate " +
          "from Transaction t " +
          "where t.bid.auctioneer.id = :userId or t.bid.winningBidder.id =: userId")
  List<TransactionProject> findAllTransactionByUserLogin(@Param("userId") Long userId);

  @Query("select t.id as id,  t.status as status, t.bid.winningBidder.email as winningBidderEmail, t.bid.id as bidId, " +
          "t.bid.auctioneer.email as auctioneerEmail, t.createdAt as createdAt, t.lastModifiedDate as lastModifiedDate " +
          "from Transaction t " +
          "where t.id = :id")
  Optional<TransactionProject> findDetailTransactionById(@Param("id") Integer id);
  Optional<Transaction> findByBid_Id (long bidId);

  Optional<Transaction> findByBid (Bid bid);
}