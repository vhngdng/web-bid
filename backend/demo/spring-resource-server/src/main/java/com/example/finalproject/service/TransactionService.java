package com.example.finalproject.service;

import com.example.finalproject.dto.TransactionDTO;
import com.example.finalproject.entity.Transaction;
import com.example.finalproject.entity.User;
import com.example.finalproject.exception.NotFoundException;
import com.example.finalproject.mapstruct.Mapper;
import com.example.finalproject.projection.TransactionProject;
import com.example.finalproject.repository.BidRepository;
import com.example.finalproject.repository.TransactionRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.request.TransactionRequest;
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
public class TransactionService {
  @Autowired
  private TransactionRepository transactionRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private Mapper mapper;
  @Autowired
  private BidRepository bidRepository;

  public List<TransactionDTO> findAllTransactionNotSuccess() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email " + email));
    String status = "SUCCESS";
    return mapper.toListTransactionDTO(transactionRepository.findAllByStatusAndBid(status, user.getId()));
  }

  public List<TransactionProject> findAllTransactionByUserLogin() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email " + email));
    return transactionRepository.findAllTransactionByUserLogin(user.getId());
  }

  public TransactionDTO findTransactionByBidId(Long bidId) {
    Optional<Transaction> transaction = transactionRepository.findByBid_Id(bidId);
    if(transaction.isPresent()) {
      return mapper.toDTO(transaction.get());
    }
    throw new NotFoundException("Transaction with bid_id " + bidId + " is not found");
  }

  public TransactionProject findDetailTransactionById(Integer id) {
    return transactionRepository.findDetailTransactionById(id).orElseThrow(() -> new NotFoundException("Transaction not found with id: " + id));
  }

  public void updateStatusTransaction(String status, Long bidId) {
    Transaction transaction = transactionRepository.findByBid_Id(bidId).orElseThrow(() -> new NotFoundException("Transaction not found with id: " + bidId));
    transaction.setStatus(status);
//    transactionRepository.save(transaction);
  }

  public void deleteById(Integer id) {
    if(!transactionRepository.findById(id).isPresent()) throw new NotFoundException("Transaction with Id: " + id + " is not found");
    transactionRepository.deleteById(id);
  }
  public Transaction createTransaction(TransactionRequest request) {
    Optional<Transaction> transactionOptional = transactionRepository.findByBid_Id(request.getBidId());
    if(transactionOptional.isPresent()) {
      log.error(transactionOptional.get().getId().toString());
      transactionRepository.deleteById(transactionOptional.get().getId());
    }
    Transaction transaction = Transaction.builder()
            .status(request.getStatus())
            .bid(bidRepository.findById(request.getBidId()).get())
            .build();
    return transactionRepository.save(transaction);
  }


}
