package com.soumen.transactsecure.repository;

import com.soumen.transactsecure.model.FraudAlert;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FraudAlertRepository extends CrudRepository<FraudAlert, Long> {
    FraudAlert findByTransactionId(Long transactionId);
}
