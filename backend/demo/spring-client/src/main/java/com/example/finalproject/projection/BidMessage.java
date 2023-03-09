package com.example.finalproject.projection;

import java.time.LocalDateTime;

public interface BidMessage {
   Long getId();
   String getSenderName();
   String getReceiverName();
   String getMessage();
   String getStatus();
   Long getBid();
   LocalDateTime getCreatedAt();
}
