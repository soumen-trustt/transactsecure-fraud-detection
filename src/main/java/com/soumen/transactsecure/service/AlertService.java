package com.soumen.transactsecure.service;

import com.soumen.transactsecure.model.FraudAlert;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.soumen.transactsecure.model.User;
import com.soumen.transactsecure.repository.UserRepository;
import java.util.Optional;
import com.soumen.transactsecure.model.EmailHistory;
import com.soumen.transactsecure.repository.EmailHistoryRepository;
import java.time.LocalDateTime;

@Service
public class AlertService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final EmailHistoryRepository sentEmailRepository;

    public AlertService(JavaMailSender mailSender, UserRepository userRepository, EmailHistoryRepository sentEmailRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.sentEmailRepository = sentEmailRepository;
    }

    public void sendAlert(FraudAlert alert) {
        Optional<User> userOpt = userRepository.findById(alert.getUserId());
        if (userOpt.isPresent()) {
            String email = userOpt.get().getEmail();
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Fraud Alert!");
            message.setText("Fraud detected for transaction id: " + alert.getTransactionId()
                    + "\nReason: " + alert.getReason());
            System.out.println("[ALERT SERVICE] Attempting to send fraud alert email to: " + email);
            try {
                mailSender.send(message);
                System.out.println("[ALERT SERVICE] Successfully sent fraud alert email to: " + email);

                // Store sent email in the database
                EmailHistory sentEmail = new EmailHistory();
                sentEmail.setRecipient(email);
                sentEmail.setSender(message.getFrom() != null ? message.getFrom() : "tapanvai342@gmail.com");
                sentEmail.setSubject(message.getSubject());
                sentEmail.setBody(message.getText());
                sentEmail.setSentAt(LocalDateTime.now());
                sentEmailRepository.save(sentEmail);
            } catch (Exception e) {
                System.err.println("[ALERT SERVICE] Failed to send fraud alert email to: " + email);
                e.printStackTrace();
            }
        } else {
            System.err.println("[ALERT SERVICE] User not found for fraud alert userId: " + alert.getUserId());
        }
    }

    public void sendSignupEmail(String email, String plainPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Welcome to TransactSecure!");
        message.setText("Thank you for signing up. Your password is: " + plainPassword + "\nPlease keep it safe.");
        System.out.println("[ALERT SERVICE] Sending signup email to: " + email);
        try {
            mailSender.send(message);
            System.out.println("[ALERT SERVICE] Successfully sent signup email to: " + email);
            EmailHistory sentEmail = new EmailHistory();
            sentEmail.setRecipient(email);
            sentEmail.setSender(message.getFrom() != null ? message.getFrom() : "tapanvai342@gmail.com");
            sentEmail.setSubject(message.getSubject());
            sentEmail.setBody(message.getText());
            sentEmail.setSentAt(LocalDateTime.now());
            sentEmailRepository.save(sentEmail);
        } catch (Exception e) {
            System.err.println("[ALERT SERVICE] Failed to send signup email to: " + email);
            e.printStackTrace();
        }
    }

    public void sendPasswordResetEmail(String email, String token) {
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("You requested to reset your password. Please click the link below to reset your password:\n" + resetLink + "\n\nIf you did not request this, please ignore this email. This link will expire in 30 minutes.");
        System.out.println("[ALERT SERVICE] Sending password reset email to: " + email);
        try {
            mailSender.send(message);
            System.out.println("[ALERT SERVICE] Successfully sent password reset email to: " + email);
            EmailHistory sentEmail = new EmailHistory();
            sentEmail.setRecipient(email);
            sentEmail.setSender(message.getFrom() != null ? message.getFrom() : "tapanvai342@gmail.com");
            sentEmail.setSubject(message.getSubject());
            sentEmail.setBody(message.getText());
            sentEmail.setSentAt(LocalDateTime.now());
            sentEmailRepository.save(sentEmail);
        } catch (Exception e) {
            System.err.println("[ALERT SERVICE] Failed to send password reset email to: " + email);
            e.printStackTrace();
        }
    }
}
