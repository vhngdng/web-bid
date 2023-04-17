package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Property;
import com.example.finalproject.projection.BidHomeProjection;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
  @Query("select b.id as id, b.type as type, b.dayOfSale as dayOfSale, " +
          "b.conditionReport as conditionReport, b.status as status, " +
          "b.reservePrice as reservePrice, b.priceStep as priceStep, " +
          "b.lastPrice as lastPrice, count(bp.user) as countAttendees, " +
          "b.property.id as propertyId, ip.id as propertyImageId," +
          "b.property.quantity as quantity, b.property.category as category, " +
          "b.auctioneer.id as auctioneerId, " +
          "ia.id as auctioneerAvatar, " +
          "b.winningBidder.id as winnerId, " +
          "iw.id as winnerAvatar " +
          "from Bid b left join BidParticipant bp on bp.bid.id = b.id " +
          "left join Image ia on ia.user.id = b.auctioneer.id and ia.type = 'AVATAR' " +
          "left join Image ip on ip.property.id = b.property.id and ip.type = 'PROPERTY' " +
          "left join Image iw on iw.user.id = b.winningBidder.id and iw.type = 'AVATAR' " +
          "group by b.id, ia.id, ip.id, iw.id, b.property.quantity, b.type, b.auctioneer.id, " +
          "b.winningBidder.id, b.property.id, b.dayOfSale, b.conditionReport, b.status, " +
          "b.reservePrice, b.priceStep, b.lastPrice, b.winningBidder.id, b.property.category " +
          "having b.status = 'SUCCESS' order by count(bp.user) desc")
  Page<BidHomeProjection> findBidTop5Attend(Pageable pageable);

  @Query("select b from Bid b " +
          "left join BidParticipant bp on bp.bid.id = b.id " +
          "where b.status = 'SUCCESS' " +
          "group by b.id " +
          "order by count(bp.user) desc")
  Page<Bid> findBidTop5(Pageable pageable);

  @Query("select b.id as id, b.type as type, b.dayOfSale as dayOfSale, " +
          "b.conditionReport as conditionReport, b.status as status, " +
          "b.reservePrice as reservePrice, b.priceStep as priceStep, " +
          "b.lastPrice as lastPrice, count(bp.user) as countAttendees, " +
          "b.property.id as propertyId, ip.id as propertyImageId," +
          "b.property.quantity as quantity, b.property.category as category, " +
          "b.auctioneer.id as auctioneerId, " +
          "ia.id as auctioneerAvatar, " +
          "b.winningBidder.id as winnerId, " +
          "iw.id as winnerAvatar " +
          "from Bid b left join BidParticipant bp on bp.bid.id = b.id " +
          "left join Image ia on ia.user.id = b.auctioneer.id and ia.type = 'AVATAR' " +
          "left join Image ip on ip.property.id = b.property.id and ip.type = 'PROPERTY' " +
          "left join Image iw on iw.user.id = b.winningBidder.id and iw.type = 'AVATAR' " +
          "group by b.id, ia.id, ip.id, iw.id, b.property.quantity, b.type, b.auctioneer.id, " +
          "b.winningBidder.id, b.property.id, b.dayOfSale, b.conditionReport, b.status, " +
          "b.reservePrice, b.priceStep, b.lastPrice, b.winningBidder.id, b.property.category " +
          "having b.dayOfSale > :time order by b.dayOfSale asc")
  Page<BidHomeProjection> findTop5Earliest(Pageable pageable, @Param("time") LocalDateTime time);
}



//  public Long getId();
//  public String getType();
//  public LocalDateTime getDayOfSale();
//  public String getConditionReport();
//  public Long getReservePrice();
//  public Long getPriceStep();
//  public Long getLastPrice();
//  public int getCountAttendees();
//  public Integer getPropertyId();
//  public String getPropertyImageId();
//  public Long getQuantity();
//  public String getCategory();
//  public Long getAuctioneerId();
//  public String getAuctioneerAvatar();
//  public Long getWinnerId();
//  public String getWinnerAvatar();
