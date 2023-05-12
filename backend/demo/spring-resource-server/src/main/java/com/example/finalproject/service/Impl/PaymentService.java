package com.example.finalproject.service.Impl;

import com.example.finalproject.dto.PaymentDTO;
import com.example.finalproject.entity.Payment;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.PaymentProject;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.PaymentRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.PaymentRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class PaymentService {
  @Autowired
  private PaymentRepository PaymentRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private Mapper mapper;
  @Autowired
  private BidRepository bidRepository;

  public List<PaymentDTO> findAllPaymentNotSuccess() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email " + email));
    String status = "SUCCESS";
    return mapper.toListPaymentDTO(PaymentRepository.findAllByStatusAndBid(status, user.getId()));
  }

  public List<PaymentProject> findAllPaymentByUserLogin() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email " + email));
    return PaymentRepository.findAllPaymentByUserLogin(user.getId());
  }

  public PaymentDTO findPaymentByBidId(Long bidId) {
    Optional<Payment> Payment = PaymentRepository.findByBid_Id(bidId);
    if(Payment.isPresent()) {
      return mapper.toDTO(Payment.get());
    }
    throw new NotFoundException("Payment with bid_id " + bidId + " is not found");
  }

  public PaymentProject findDetailPaymentById(Integer id) {
    return PaymentRepository.findDetailPaymentById(id).orElseThrow(() -> new NotFoundException("Payment not found with id: " + id));
  }

  public void updateStatusPayment(String status, Long bidId) {
    Payment payment = PaymentRepository.findByBid_Id(bidId).orElseThrow(() -> new NotFoundException("Payment not found with id: " + bidId));
    payment.setStatus(status);
//    PaymentRepository.save(Payment);
  }

  public void deleteById(Integer id) {
    if(!PaymentRepository.findById(id).isPresent()) throw new NotFoundException("Payment with Id: " + id + " is not found");
    PaymentRepository.deleteById(id);
  }
  public Payment createPayment(PaymentRequest request) {
    Optional<Payment> PaymentOptional = PaymentRepository.findByBid_Id(request.getBidId());
    if(PaymentOptional.isPresent()) {
      log.error(PaymentOptional.get().getId().toString());
      PaymentRepository.deleteById(PaymentOptional.get().getId());
    }
    Payment payment = Payment.builder()
            .status(request.getStatus())
            .bid(bidRepository.findById(request.getBidId()).get())
            .build();
    return PaymentRepository.save(payment);
  }


  public List<PaymentDTO> getAllPaymentBidFinish() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email " + email));
    String status = "FINISH";
    return mapper.toListPaymentDTO(PaymentRepository.findAllByBidStatus(status, user.getId()));
  }
}
