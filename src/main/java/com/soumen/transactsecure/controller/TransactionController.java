package com.soumen.transactsecure.controller;

import com.soumen.transactsecure.model.Transaction;
import com.soumen.transactsecure.repository.TransactionRepository;
import com.soumen.transactsecure.service.AuthService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @GetMapping("/fraud")
    public List<Transaction> getFraudTransactions() {
        return transactionRepository.findByStatus("FRAUD");
    }
    private final TransactionRepository transactionRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final AuthService authService;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository, KafkaTemplate<String, Object> kafkaTemplate, AuthService authService) {
        this.transactionRepository = transactionRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.authService = authService;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return (List<Transaction>) transactionRepository.findAll();
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction, @RequestHeader("Authorization") String authHeader) {
        transaction.setStatus("PENDING");

        // Extract email from JWT
        String token = authHeader.replace("Bearer ", "");
        String email = authService.getEmailFromToken(token);
        var userOpt = authService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            transaction.setUserId(userOpt.get().getId()); // user.getId() must be UUID
        } else {
            throw new RuntimeException("User not found for transaction");
        }

        Transaction saved = transactionRepository.save(transaction);
        kafkaTemplate.send("transactions", saved);
        return saved;
    }
}
