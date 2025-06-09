package com.soumen.transactsecure.repository;

import com.soumen.transactsecure.model.FraudRule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FraudRuleRepository extends JpaRepository<FraudRule, Long> {
    List<FraudRule> findByStatus(String status);
}
