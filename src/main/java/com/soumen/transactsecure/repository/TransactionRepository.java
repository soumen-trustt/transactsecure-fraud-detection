package com.soumen.transactsecure.repository;

import com.soumen.transactsecure.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {
    List<Transaction> findByStatus(String status);
    List<Transaction> findByUserId(Long userId);
}
