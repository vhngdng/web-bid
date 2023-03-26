package com.example.finalproject.repository;

import com.example.finalproject.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, String> {

  Optional<Image> findByPropertyId (Integer propertyId);

  List<Image> findAllByUserId(Long userId);
  @Query("select i from Image i where i.user.id = :userId and i.type in ('AVATAR', 'BACKGROUND')")
  List<Image> findAllByUserIdAndType(@Param("userId") Long userId);

  @Query("select i from Image i where i.user.id = :userId and i.type = 'AVATAR'")
  Optional<Image> findByUserIdAndTypeAvatar(Long userId);

  @Query("select i from Image i where i.user.id = :userId and i.type = 'BACKGROUND'")
  Optional<Image> findByUserIdAndTypeBackground(Long userId);

  Optional<Image> findByPropertyId(Long propertyId);
}