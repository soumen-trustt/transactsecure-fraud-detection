package com.soumen.transactsecure.kafka;

import com.soumen.transactsecure.model.Transaction;
import com.soumen.transactsecure.model.FraudAlert;
import com.soumen.transactsecure.repository.FraudAlertRepository;
import com.soumen.transactsecure.repository.TransactionRepository;
import com.soumen.transactsecure.service.AlertService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.Instant;

@Service
public class FraudDetectionConsumer {
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(FraudDetectionConsumer.class);
    private final AlertService alertService;
    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository fraudAlertRepository;

    public FraudDetectionConsumer(AlertService alertService, TransactionRepository transactionRepository, FraudAlertRepository fraudAlertRepository) {
        this.alertService = alertService;
        this.transactionRepository = transactionRepository;
        this.fraudAlertRepository = fraudAlertRepository;
    }

    @KafkaListener(topics = "${fraud.transaction-topic}", groupId = "fraud-detection-group")
    public void consumeTransaction(Transaction transaction) {
        logger.info("Received transaction: {}", transaction);

        // Store transaction to DB (repository code not shown)
        // fraudRule: if amount > 10000
        if (transaction.getAmount().compareTo(new BigDecimal("10000")) > 0) {
            logger.info("Transaction {} is flagged as FRAUD. Amount: {}", transaction.getId(), transaction.getAmount());
            transaction.setStatus("FRAUD");
            transactionRepository.save(transaction);
            // Prevent duplicate alerts for the same transaction
            if (fraudAlertRepository.findByTransactionId(transaction.getId()) == null) {
                FraudAlert alert = new FraudAlert();
                alert.setTransactionId(transaction.getId());
                alert.setUserId(transaction.getUserId());
                alert.setReason("High value transaction");

                logger.info("Attempting to save FraudAlert for transaction {}: {}", transaction.getId(), alert);
                fraudAlertRepository.save(alert);
                logger.info("Saved FraudAlert for transaction {}", transaction.getId());
                alertService.sendAlert(alert);
            } else {
                logger.info("FraudAlert for transaction {} already exists. Skipping duplicate.", transaction.getId());
            }
        } else {
            transaction.setStatus("APPROVED");
            transactionRepository.save(transaction);
            logger.info("Transaction {} is approved. Amount: {}", transaction.getId(), transaction.getAmount());
        }
    }
}

