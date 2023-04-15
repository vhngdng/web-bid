package com.example.finalproject.repository;

import com.example.finalproject.entity.Property;
import com.example.finalproject.projection.ImageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
  List<Property> findByOwnerEmail(String email);
  @Query("select p from Property p left join Bid b on p.id = b.property.id where b.property.id is null and b.property.permission = 'ACCEPTED'")
  List<Property> findAllPropertyNotBid();

  List<Property> findAllByPermissionNotNull();
}