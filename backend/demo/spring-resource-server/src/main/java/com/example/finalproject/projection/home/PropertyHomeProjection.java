package com.example.finalproject.projection.home;

public interface PropertyHomeProjection {
//  p.name, p.quantity, p.description, b.lastPrice, i.id
  String getId();
  String getName();

  Long getQuantity();

  String getDescription();

  Long getLastPrice();

  String getImageProperty();
}
