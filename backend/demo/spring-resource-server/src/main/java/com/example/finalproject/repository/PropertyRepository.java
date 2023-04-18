package com.example.finalproject.repository;

import com.example.finalproject.entity.Property;
import com.example.finalproject.projection.home.PropertyHomeProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
  List<Property> findByOwnerEmail(String email);

  @Query("select p from Property p left join Bid b on p.id = b.property.id where b.property.id is null and b.property.permission = 'ACCEPTED'")
  List<Property> findAllPropertyNotBid();

  List<Property> findAllByPermissionNotNull();

  @Query("select p.name as name, p.quantity as quantity, p.description as description, b.lastPrice as lastPrice, i.id as imageProperty " +
          "from Property p left join Bid b on b.property.id = p.id " +
          "left join Image i where i.property.id = p.id and i.type = 'PROPERTY' " +
          "order by lastPrice desc ")
  Page<PropertyHomeProjection> findPropertyTop5(Pageable pageable);
}