package com.example.finalproject.repository;

import com.example.finalproject.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, String> {

  Optional<Image> findByPropertyId (Integer propertyId);
}