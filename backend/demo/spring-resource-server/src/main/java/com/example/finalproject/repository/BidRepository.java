package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

  boolean existsByProperty(Property property);
  @Query("select t.bid from Payment t where t.bid.auctioneer.email = :auctioneerEmail and t.status = :statusPayment and t.bid.status = 'FINISH'")
  List<Bid> findListBidRoomBeforeFinish(@Param("auctioneerEmail") String auctioneerEmail, @Param("statusPayment") String statusPayment);

  Bid findByIdAndAuctioneerEmail(Long id, String auctioneerEmail);
  @Query("select b from Bid b where (b.status is null or b.status = 'DEACTIVE') and b.dayOfSale > :now ")
  List<Bid> findAllBidPreparingToRun(@Param("now") LocalDateTime now);

  Optional<Bid> findByPaymentId(Integer PaymentId);

  Page<Bid> findAllByType (String type,
                           Pageable pageable);
  @Query("select b from Bid b where b.property.id = :propertyId and b.dayOfSale > :now ")
  Optional<Bid> findBidToDelete(@Param("propertyId") Integer propertyId, @Param("now") LocalDateTime now);
}