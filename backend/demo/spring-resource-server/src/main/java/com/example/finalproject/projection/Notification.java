package com.example.finalproject.projection;

import com.example.finalproject.dto.UserDTO;
import com.example.finalproject.entity.User;

import java.time.LocalDateTime;

public interface Notification {
   Long getBidId();
   UserDTO getReceiver();
   String getMessage();
   String getStatus();
}
