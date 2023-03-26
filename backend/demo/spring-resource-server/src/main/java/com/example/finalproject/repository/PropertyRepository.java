package com.example.finalproject.repository;

import com.example.finalproject.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
  List<Property> findByOwnerEmail(String email);
  @Query("select p from Property p left join Bid b on p.id = b.property.id where b.property.id is null")
  List<Property> findAllPropertyNotBid();
}