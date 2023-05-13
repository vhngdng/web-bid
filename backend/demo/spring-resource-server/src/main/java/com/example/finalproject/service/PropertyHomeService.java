package com.example.finalproject.service;

import com.example.finalproject.dto.PropertyViewDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PropertyHomeService {
  Page<Object> findListPropertyForGuest(int page, int size, String sort, Long id, String reservePrice, String name, String category, String owner);
  Page<PropertyViewDto> findPropertyTop5(Pageable pageable);
}
