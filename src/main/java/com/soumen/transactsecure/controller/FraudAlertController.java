package com.soumen.transactsecure.controller;

import com.soumen.transactsecure.model.FraudAlert;
import com.soumen.transactsecure.repository.FraudAlertRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fraud-alerts")
public class FraudAlertController {
    private final FraudAlertRepository fraudAlertRepository;

    public FraudAlertController(FraudAlertRepository fraudAlertRepository) {
        this.fraudAlertRepository = fraudAlertRepository;
    }

    @GetMapping
    public List<FraudAlert> getAllFraudAlerts() {
        return (List<FraudAlert>) fraudAlertRepository.findAll();
    }
}
