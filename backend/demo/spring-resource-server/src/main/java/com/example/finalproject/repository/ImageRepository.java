package com.example.finalproject.repository;

import com.example.finalproject.entity.Image;
import com.example.finalproject.entity.Property;
import com.example.finalproject.projection.ImageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, String> {

  Optional<Image> findByPropertyIdAndType (Integer propertyId, String type);

  List<Image> findAllByUserId(Long userId);
  @Query("select i from Image i where i.user.id = :userId and i.type in ('AVATAR', 'BACKGROUND')")
  List<Image> findAllByUserIdAndType(@Param("userId") Long userId);

  @Query("select i from Image i where i.user.id = :userId and i.type = :type")
  Optional<Image> findByUserIdAndType(@Param("userId")Long userId, @Param("type") String type);

//  @Query("select i from Image i where i.user.id = :userId and i.type = 'BACKGROUND'")
//  Optional<Image> findByUserIdAndTypeBackground(Long userId);

  List<ImageProjection> findByPropertyIdAndUserEmail(Integer propertyId, String email);
  List<ImageProjection> findByPropertyId(Integer propertyId);
  @Query("select i.id from Image i where i.user.email = :email and i.type = 'AVATAR'")
  String findImageAva(@Param("email")String email);

  @Query("select i from Image i where i.user.email = :email and i.property is null")
  List<Image> findAllImageByEmailNotProperty(@Param("email")String email);
}