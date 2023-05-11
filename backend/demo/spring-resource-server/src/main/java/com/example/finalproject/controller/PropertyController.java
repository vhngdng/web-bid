package com.example.finalproject.controller;

import com.example.finalproject.dto.PropertyDTO;
import com.example.finalproject.request.UpSertBid;
import com.example.finalproject.request.UpSertProperty;
import com.example.finalproject.service.PropertyService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@Slf4j
public class PropertyController {

  @Autowired
  private PropertyService propertyService;

  @GetMapping("/admin/properties")
  public ResponseEntity<?> findAllProperty(@RequestParam(name = "page", defaultValue = "0") int page,
                                           @RequestParam(name = "size", defaultValue = "8") int size,
                                           @RequestParam(name ="sort", defaultValue = "id,asc") String sort) {
    return ResponseEntity.ok(propertyService.findAll(page, size, sort));
  }

  @GetMapping("admin/properties-not-bid")
  public ResponseEntity<?> findAllPropertyNotBid() {
    return ResponseEntity.ok(propertyService.findAllPropertyNotBid());
  }

  @GetMapping("user/properties")
  public ResponseEntity<?> findPropertyByUserLogin() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return ResponseEntity.ok(propertyService.findPropertyByUserLogin(email));
  }

  @PostMapping("user/properties")
  public ResponseEntity<?> createProperty(@RequestBody @Valid UpSertProperty upSertProperty) {
    return new ResponseEntity<>(propertyService.saveProperty(upSertProperty)
            , HttpStatus.CREATED);
  }
  @GetMapping("user/property/{propertyId}")
  public ResponseEntity<?> findDetailProperty(@PathVariable("propertyId") Integer propertyId) {
    return ResponseEntity.ok(propertyService.findDetailProperty(propertyId));
  }
  @GetMapping("admin/properties/{propertyId}")
  public ResponseEntity<?> findAdminDetailProperty(@PathVariable("propertyId") Integer propertyId) {
    return ResponseEntity.ok(propertyService.findAdminDetailProperty(propertyId));
  }

  @PutMapping("user/properties/{propertyId}")
  public ResponseEntity<?> updateProperty(@RequestBody @NotNull UpSertProperty upSertProperty, @PathVariable("propertyId") Integer propertyId) {
    return ResponseEntity.ok(propertyService.updateProperty(upSertProperty, propertyId));
  }

  @PutMapping("user/register-properties/{propertyId}")
  public ResponseEntity<?> registerProperty(@RequestBody @NotNull UpSertProperty upSertProperty, @PathVariable("propertyId") Integer propertyId) {
    return ResponseEntity.ok(propertyService.registerProperty(upSertProperty, propertyId));
  }
  @DeleteMapping("user/delete-properties/{propertyId}")
  public ResponseEntity<?> deleteProperty(@PathVariable("propertyId") Integer propertyId) {
    return ResponseEntity.ok(propertyService.deleteProperty(propertyId));
  }

  @GetMapping("guest/list-property")
  public ResponseEntity<?> findListPropertyForGuest(@RequestParam(name = "page", defaultValue = "0") int page,
                                                    @RequestParam(name = "size", defaultValue = "8") int size,
                                                    @RequestParam(name = "id", required = false , defaultValue = "") Long id,
                                                    @RequestParam(name = "reservePrice",required = false , defaultValue = "") Long reservePrice,
                                                    @RequestParam(name = "name", required = false , defaultValue = "") String name,
                                                    @RequestParam(name ="sort", defaultValue = "id,asc") String sort) {
    return ResponseEntity.ok(propertyService.findListPropertyForGuest(page, size, sort, id, reservePrice, name));
  }
  @GetMapping("guest/list-property/{propertyId}")
  public ResponseEntity<?> findDetailPropertyForGuest(@PathVariable int propertyId) {
    return ResponseEntity.ok(propertyService.findDetailPropertyForGuest(propertyId));
  }
  @GetMapping("guest/findByPermission/{permission}")
  public ResponseEntity<?> findAllByPermission(@PathVariable String permission) {
    return ResponseEntity.ok(propertyService.findAllByPermission(permission));
  }
}
