package com.example.finalproject.service.Impl;

import com.example.finalproject.dao.PropertyHomeDao;
import com.example.finalproject.dto.PropertyViewDto;
import com.example.finalproject.entity.PropertyView;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.home.PropertyHomeProjection;
import com.example.finalproject.service.PropertyHomeService;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PropertyHomeServiceImpl implements PropertyHomeService {
  @Autowired
  private PropertyHomeDao propertyHomeDao;
  @Autowired
  private Mapper mapper;

  @Override
  public Page<Object> findListPropertyForGuest(int page, int size, String sort, Long id, String reservePrice, String name, String category, String owner) {
    String[] _sort = sort.split(",");
    Sort.Order order = (new Sort.Order(_sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
            _sort[0]));
    Pageable pageable = PageRequest.of(page, size, Sort.by(order));
    Specification<PropertyView> specification = (root, query, builder) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (id != null) {
        predicates.add(builder.equal(root.get("id"), id));
      }
      if (!StringUtils.isBlank(reservePrice) && reservePrice.split(",").length == 2) {
        String[] _reservePrice = reservePrice.split(",");
        predicates.add(_reservePrice[1].equalsIgnoreCase("greater")
                ? builder.greaterThanOrEqualTo(root.get("reservePrice"), Long.parseLong(_reservePrice[0]))
                : builder.lessThanOrEqualTo(root.get("reservePrice"), Long.parseLong(_reservePrice[0]))
        );
      }
      predicates.add(builder.isNotNull(root.get("bidType")));
      if (!StringUtils.isBlank(name)) {
//        Expression<String> expression = builder.literal("%" + name + "%" + " COLLATE for latin1_general_cs");
        Expression<String> expression1 = builder.literal("%" + name + "%");
//        predicates.add(builder.like(root.get("name"), "%" + name + "%" + expression));
//                predicates.add(builder.like(builder.function("COLLATION for latin1_general_cs", String.class, root.get("name")), "%" + name + "%"));

        predicates.add(builder.like(root.get("name"), expression1));
      }
      if (!StringUtils.isBlank(category)) {
        predicates.add(builder.like(root.get("category"), "%" + category + "%"));
      }
      if (!StringUtils.isBlank(owner)) {
        predicates.add(builder.like(root.get("ownerName"), "%" + owner + "%"));
      }
      return builder.and(predicates.toArray(new Predicate[0]));
    };
    return propertyHomeDao.findAll(specification, pageable).map(propertyView -> mapper.toDto(propertyView));

  }

  @Override
  public Page<PropertyViewDto> findPropertyTop5(Pageable pageable) {
    Pageable pageable1 = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.Direction.DESC, "lastPrice");
    Specification<PropertyView> specification = (root, query, builder) -> {
      List<Predicate> predicates = new ArrayList<>();
      predicates.add(builder.isNotNull(root.get("lastPrice")));
      return builder.and(predicates.toArray(new Predicate[0]));
    };
    return propertyHomeDao.findAll(specification, pageable1).map(propertyView -> mapper.toDto(propertyView));
  }
}
