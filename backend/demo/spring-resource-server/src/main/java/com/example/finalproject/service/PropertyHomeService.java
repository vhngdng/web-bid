package com.example.finalproject.service;

import com.example.finalproject.entity.PropertyView;
import org.springframework.data.domain.Page;


public interface PropertyHomeService {
  Page<Object> findListPropertyForGuest(int page, int size, String sort, Long id, String reservePrice, String name, String category, String owner);
}
