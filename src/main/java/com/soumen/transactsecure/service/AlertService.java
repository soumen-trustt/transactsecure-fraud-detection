package com.soumen.transactsecure.service;

import com.soumen.transactsecure.model.FraudAlert;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.soumen.transactsecure.model.User;
import com.soumen.transactsecure.repository.UserRepository;
import java.util.Optional;

@Service
public class AlertService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    public AlertService(JavaMailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    public void sendAlert(FraudAlert alert) {
        Optional<User> userOpt = userRepository.findById(alert.getUserId());
        if (userOpt.isPresent()) {
            String email = userOpt.get().getEmail();
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Fraud Alert!");
            message.setText("Fraud detected for transaction: " + alert.getTransactionId()
                    + "\nReason: " + alert.getReason());
            System.out.println("[ALERT SERVICE] Attempting to send fraud alert email to: " + email);
            try {
                mailSender.send(message);
                System.out.println("[ALERT SERVICE] Successfully sent fraud alert email to: " + email);
            } catch (Exception e) {
                System.err.println("[ALERT SERVICE] Failed to send fraud alert email to: " + email);
                e.printStackTrace();
            }
        } else {
            System.err.println("[ALERT SERVICE] User not found for fraud alert userId: " + alert.getUserId());
        }
    }
}
