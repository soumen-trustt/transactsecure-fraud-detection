package com.soumen.transactsecure.repository;

import com.soumen.transactsecure.model.PasswordResetToken;
import com.soumen.transactsecure.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user);
}
