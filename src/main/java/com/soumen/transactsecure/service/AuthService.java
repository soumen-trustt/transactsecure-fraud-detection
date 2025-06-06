package com.soumen.transactsecure.service;

import com.soumen.transactsecure.model.User;
import com.soumen.transactsecure.model.PasswordResetToken;
import com.soumen.transactsecure.repository.UserRepository;
import com.soumen.transactsecure.repository.PasswordResetTokenRepository;
import com.soumen.transactsecure.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AlertService alertService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User signup(String email, String password) {
        String hashed = passwordEncoder.encode(password);
        User user = new User(email, hashed);
        User savedUser = userRepository.save(user);
        // Send signup email with plain password
        alertService.sendSignupEmail(email, password);
        return savedUser;
    }

    public Optional<User> authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return userOpt;
        }
        return Optional.empty();
    }

    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }

    public String getEmailFromToken(String token) {
        return jwtUtil.getEmailFromToken(token);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // If any method uses Long userId, change to UUID

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    public boolean initiatePasswordReset(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return false;
        User user = userOpt.get();
        // Remove old tokens for user
        passwordResetTokenRepository.deleteByUser(user);
        // Generate secure token
        String token = java.util.UUID.randomUUID().toString().replace("-", "");
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(30);
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setExpiresAt(expiresAt);
        resetToken.setUsed(false);
        passwordResetTokenRepository.save(resetToken);
        // Basic rate limiting: max 3 reset requests per hour per user (in-memory)
        if (!PasswordResetRateLimiter.allow(email)) {
            System.err.println("[RATE LIMIT] Password reset rate limit exceeded for: " + email);
            return false;
        }
        // Send reset email with link
        alertService.sendPasswordResetEmail(email, token);
        return true;
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) return false;
        PasswordResetToken resetToken = tokenOpt.get();
        if (resetToken.isUsed() || resetToken.getExpiresAt().isBefore(LocalDateTime.now())) return false;
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
        return true;
    }
}
