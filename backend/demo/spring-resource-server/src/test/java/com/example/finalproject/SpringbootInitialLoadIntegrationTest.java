package com.example.finalproject;

import com.example.finalproject.repository.RoleRepository;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;

@Sql({"/init.sql"})
public class SpringbootInitialLoadIntegrationTest {
  @Autowired
  private RoleRepository roleRepository;

  @Test
  public void testLoadDataForTestClass() {
    Assert.isTrue(roleRepository.findAll().size() == 2);
  }
}
