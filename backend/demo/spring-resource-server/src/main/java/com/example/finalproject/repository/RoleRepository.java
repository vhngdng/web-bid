package com.example.finalproject.repository;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.entity.Role;
import com.google.common.base.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(EROLE name);
}
