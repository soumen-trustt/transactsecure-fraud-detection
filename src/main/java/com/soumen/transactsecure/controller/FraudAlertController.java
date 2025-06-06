package com.soumen.transactsecure.controller;

import com.soumen.transactsecure.model.FraudAlert;
import com.soumen.transactsecure.repository.FraudAlertRepository;
import com.soumen.transactsecure.service.AuthService;
import com.soumen.transactsecure.service.AlertService;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fraud-alerts")
public class FraudAlertController {
    private final FraudAlertRepository fraudAlertRepository;
    private final AuthService authService;
    private final AlertService alertService;

    public FraudAlertController(FraudAlertRepository fraudAlertRepository, AuthService authService, AlertService alertService) {
        this.fraudAlertRepository = fraudAlertRepository;
        this.authService = authService;
        this.alertService = alertService;
    }

    @GetMapping
    public List<FraudAlert> getUserFraudAlerts(@RequestHeader("Authorization") String authHeader) {
        // Extract email from JWT
        String token = authHeader.replace("Bearer ", "");
        String email = authService.getEmailFromToken(token);
        Optional<com.soumen.transactsecure.model.User> userOpt = authService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            Long userId = userOpt.get().getId();
            return fraudAlertRepository.findByUserId(userId);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @PostMapping
    public FraudAlert createFraudAlert(@RequestBody FraudAlert alert) {
        FraudAlert saved = fraudAlertRepository.save(alert);
        alertService.sendAlert(saved);
        return saved;
    }
}
