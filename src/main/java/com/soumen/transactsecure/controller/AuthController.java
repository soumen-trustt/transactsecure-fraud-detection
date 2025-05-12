package com.soumen.transactsecure.controller;

import com.soumen.transactsecure.payload.AuthRequest;
import com.soumen.transactsecure.payload.AuthResponse;
import com.soumen.transactsecure.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest request) {
        if (authService.emailExists(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        authService.signup(request.getEmail(), request.getPassword());
        return ResponseEntity.ok("Signup successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        var userOpt = authService.authenticate(request.getEmail(), request.getPassword());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = authService.generateToken(request.getEmail());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    // For JWT, logout is handled client-side by deleting the token
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logged out (client should delete JWT token)");
    }
}
