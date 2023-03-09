package com.example.finalproject.service;

import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.entity.Property;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

  @Autowired
  private PropertyRepository propertyRepository;
  @Autowired
  private Mapper mapper;

  public List<PropertyDTO> findAll() {
    return mapper.toListPropertyDTO(propertyRepository.findAll());
  }
}
