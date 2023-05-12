package com.example.finalproject.dao;

import com.example.finalproject.entity.PropertyView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PropertyHomeDao extends JpaRepository<PropertyView, Long>, JpaSpecificationExecutor<PropertyView> {

}
