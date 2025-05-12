package com.soumen.transactsecure.service;

import com.soumen.transactsecure.model.User;
import com.soumen.transactsecure.repository.UserRepository;
import com.soumen.transactsecure.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User signup(String email, String password) {
        String hashed = passwordEncoder.encode(password);
        User user = new User(email, hashed);
        return userRepository.save(user);
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

}
