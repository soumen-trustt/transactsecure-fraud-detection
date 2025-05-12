package com.soumen.transactsecure.model;

import java.math.BigDecimal;
import java.util.UUID;
import jakarta.persistence.*;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;
    private String merchant;
    private String status;
    @Column(name = "timestamp")
    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
    @com.fasterxml.jackson.databind.annotation.JsonDeserialize(using = com.soumen.transactsecure.config.CustomLocalDateTimeDeserializer.class)
    private java.time.LocalDateTime timestamp;

    @Column(name = "updated_on", insertable = false, updatable = false)
    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
    @com.fasterxml.jackson.databind.annotation.JsonDeserialize(using = com.soumen.transactsecure.config.CustomLocalDateTimeDeserializer.class)
    private java.time.LocalDateTime updatedOn;

    public Transaction() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }




    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public java.time.LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(java.time.LocalDateTime timestamp) { this.timestamp = timestamp; }

    public java.time.LocalDateTime getUpdatedOn() { return updatedOn; }
    public void setUpdatedOn(java.time.LocalDateTime updatedOn) { this.updatedOn = updatedOn; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    // Optionally add toString(), equals(), hashCode()
}
