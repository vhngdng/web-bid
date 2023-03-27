package com.example.finalproject.repository;

import com.example.finalproject.entity.User;
import com.example.finalproject.projection.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findUserByUsername(String username);

  Optional<User> findByEmail(String email);

  @Query("select u.id as id, i.id as imageId from User u inner join BidParticipant bp on bp.user.id = u.id " +
          "left join Image i on i.user.id = u.id " +
          "and i.type = 'AVATAR' " +
          "where bp.bid.id = :bidId "
//          "and (i.type = 'AVATAR' or i.type)"
  )
  List<Attendee> findAllAttendeeByBidId(@Param("bidId") Long bidId);
}
