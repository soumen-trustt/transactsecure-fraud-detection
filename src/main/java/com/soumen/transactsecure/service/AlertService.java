package com.soumen.transactsecure.service;

import com.soumen.transactsecure.model.FraudAlert;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class AlertService {
    private final JavaMailSender mailSender;

    public AlertService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendAlert(FraudAlert alert) {
        // Example: send email (customize as needed)
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("user@example.com"); // Replace with actual user email
        message.setSubject("Fraud Alert!");
        message.setText("Fraud detected for transaction: " + alert.getTransactionId()
                + "\nReason: " + alert.getReason());
        mailSender.send(message);
    }
}
