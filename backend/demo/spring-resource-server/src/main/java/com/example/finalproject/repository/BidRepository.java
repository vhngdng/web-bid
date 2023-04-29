package com.example.finalproject.repository;

import com.example.finalproject.entity.Bid;
import com.example.finalproject.entity.Property;
import com.example.finalproject.projection.home.BidHomeProjection;
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
  @Query("select b from Bid b inner join b.payment p where b.auctioneer.email = :auctioneerEmail and p.status = :statusPayment and b.status = 'FINISH'")
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
          "b.property.name as propertyName, b.auctioneer.id as auctioneerId, " +
          "b.auctioneer.username as auctioneerName, " +
          "ia.id as auctioneerAvatar, " +
          "b.winningBidder.id as winnerId, b.winningBidder.username as winnerName, " +
          "iw.id as winnerAvatar " +
          "from Bid b left join BidParticipant bp on bp.bid.id = b.id " +
          "left join Image ia on ia.user.id = b.auctioneer.id and ia.type = 'AVATAR' " +
          "left join Image ip on ip.property.id = b.property.id and ip.type = 'PROPERTY' " +
          "left join Image iw on iw.user.id = b.winningBidder.id and iw.type = 'AVATAR' " +
          "group by b.id, ia.id, ip.id, iw.id, b.property.quantity, b.type, b.auctioneer.id, b.winningBidder.username, " +
          "b.winningBidder.id, b.property.id, b.dayOfSale, b.conditionReport, b.status, b.property.name, b.auctioneer.username, " +
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
          "b.property.name as propertyName, b.auctioneer.id as auctioneerId, " +
          "b.auctioneer.username as auctioneerName, " +
          "ia.id as auctioneerAvatar " +
          "from Bid b left join BidParticipant bp on bp.bid.id = b.id " +
          "left join Image ia on ia.user.id = b.auctioneer.id and ia.type = 'AVATAR' " +
          "left join Image ip on ip.property.id = b.property.id and ip.type = 'PROPERTY' " +
          "where b.status in ('DEACTIVE', 'ACTIVE', 'PROCESSING') " +
          "group by b.id, ia.id, ip.id, b.property.quantity, b.type, b.auctioneer.id, " +
          "b.property.id, b.dayOfSale, b.conditionReport, b.status, b.property.name, b.auctioneer.username, " +
          "b.reservePrice, b.priceStep, b.lastPrice, " +
          "b.property.category " +
          "having b.dayOfSale > :time order by b.dayOfSale asc"
  )
  Page<BidHomeProjection> findTop5Earliest(Pageable pageable, @Param("time") LocalDateTime time);

  @Query("select b.id as id, b.type as type, b.dayOfSale as dayOfSale, " +
          "b.conditionReport as conditionReport, b.status as status, " +
          "b.reservePrice as reservePrice, b.priceStep as priceStep, " +
          "b.lastPrice as lastPrice, count(bp.user) as countAttendees, " +
          "b.property.id as propertyId, ip.id as propertyImageId," +
          "b.property.quantity as quantity, b.property.category as category, " +
          "b.property.name as propertyName, b.auctioneer.id as auctioneerId, " +
          "b.auctioneer.username as auctioneerName, " +
          "ia.id as auctioneerAvatar " +
          "from Bid b left join BidParticipant bp on bp.bid.id = b.id " +
          "left join Image ia on ia.user.id = b.auctioneer.id and ia.type = 'AVATAR' " +
          "left join Image ip on ip.property.id = b.property.id and ip.type = 'PROPERTY' " +
          "where b.conditionReport like concat('%', :keyword, '%') or b.property.name like lower(concat('%', :keyword, '%')) " +
          "or b.auctioneer.username like lower(concat('%', :keyword, '%')) or b.winningBidder.username like lower(concat('%', :keyword, '%')) " +
          "or b.type like lower(concat('%', :keyword, '%')) or b.property.permission like lower(concat('%', :keyword, '%')) " +
          "or b.status like lower(concat('%', :keyword, '%')) or cast(b.id as string) like lower(concat('%', :keyword, '%')) " +
          "or cast(b.priceStep as string) like lower(concat('%', :keyword, '%')) or cast(b.reservePrice as string) like lower(concat('%', :keyword, '%')) or " +
          "cast(b.dayOfSale as string) like lower(concat('%', :keyword, '%')) " +
          "group by b.id, ia.id, ip.id, b.property.quantity, b.type, b.auctioneer.id, " +
          "b.property.id, b.dayOfSale, b.conditionReport, b.status, b.property.name, b.auctioneer.username, " +
          "b.reservePrice, b.priceStep, b.lastPrice, b.property.category "

  )
  List<BidHomeProjection> search(@Param("keyword") String keyword);
//  @Query("select b.id as id, b.type as type, b.dayOfSale as dayOfSale, " +
//          "b.conditionReport as conditionReport, b.status as status, " +
//          "b.reservePrice as reservePrice, b.priceStep as priceStep, " +
//          "b.lastPrice as lastPrice, count(bp.user) as countAttendees, " +
//          "b.property.id as propertyId, ip.id as propertyImageId," +
//          "b.property.quantity as quantity, b.property.category as category, " +
//          "b.property.name as propertyName, b.auctioneer.id as auctioneerId, " +
//          "b.auctioneer.username as auctioneerName, " +
//          "ia.id as auctioneerAvatar " +
//          "from Bid b left join BidParticipant bp on bp.bid.id = b.id " +
//          "left join Image ia on ia.user.id = b.auctioneer.id and ia.type = 'AVATAR' " +
//          "left join Image ip on ip.property.id = b.property.id and ip.type = 'PROPERTY' " +
//          "where cast(b.id as string) like concat('%', :keyword, '%') or b.property.name like lower(concat('%', :keyword, '%')) " +
//          "or b.auctioneer.username like lower(concat('%', :keyword, '%')) or b.winningBidder.username like lower(concat('%', :keyword, '%')) " +
//          "or b.type like lower(concat('%', :keyword, '%')) or b.property.permission like lower(concat('%', :keyword, '%')) " +
//          "or b.status like lower(concat('%', :keyword, '%')) " +
//          "group by b.id, ia.id, ip.id, b.property.quantity, b.type, b.auctioneer.id, " +
//          "b.property.id, b.dayOfSale, b.conditionReport, b.status, b.property.name, b.auctioneer.username, " +
//          "b.reservePrice, b.priceStep, b.lastPrice, b.property.category "
//
//  )
//  List<BidHomeProjection> searchInt(String keyword);
}



