package com.example.finalproject.repository;

import com.example.finalproject.entity.Property;
import com.example.finalproject.projection.home.PropertyHomeProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
  List<Property> findByOwnerEmail(String email);

  @Query("select p from Property p left join Bid b on p.id = b.property.id where b.property.id is null and b.property.permission = 'ACCEPTED'")
  List<Property> findAllPropertyNotBid();

  List<Property> findAllByPermissionNotNull();

  @Query("select p.name as name, p.id as id, p.quantity as quantity, p.description as description, b.lastPrice as lastPrice, i.id as imageProperty " +
          "from Property p inner join Bid b on p.id = b.property.id " +
          "left join Image i on i.property.id = p.id and i.type = 'PROPERTY' " +
          "where b.lastPrice is not null " +
          "order by b.lastPrice desc ")
  Page<PropertyHomeProjection> findPropertyTop5(Pageable pageable);

  @Query("select p.name as name, p.id as id, p.quantity as quantity, p.description as description, p.reservePrice as reservePrice, " +
          "b.lastPrice as lastPrice, p.category as category, p.createdAt as createdAt, " +
          "u.avatar as defaultAvatar,u.username as ownerName, u.id as ownerId, b.id as bidId, b.status as bidStatus, i.id as imageProperty " +
          "from Property p inner join p.bid b inner join p.owner u left join Image i on p.id = i.property.id and i.type = 'PROPERTY' " +
          "left join Image io on io.user.id = u.id and i.type = 'AVATAR' " +
          "where p.bidType is not null")
  Page<PropertyHomeProjection> findListPropertyForGuest(Pageable pageable);

  @Query("select p.name as name, p.id as id, p.quantity as quantity, p.description as description, p.reservePrice as reservePrice, " +
          "b.lastPrice as lastPrice, p.category as category, p.createdAt as createdAt, " +
          "u.avatar as defaultAvatar,u.username as ownerName, u.id as ownerId, b.id as bidId, b.status as bidStatus, i.id as imageId, i.type as imageType " +
          "from Property p inner join p.bid b inner join p.owner u left join Image i on p.id = i.property.id " +
          "left join Image io on io.user.id = u.id and i.type = 'AVATAR' " +
          "where p.id = :propertyId")
  List<PropertyHomeProjection> findDetailPropertyForGuest(@Param("propertyId") int propertyId);

  List<Property> findAllByPermission(String permission);
}