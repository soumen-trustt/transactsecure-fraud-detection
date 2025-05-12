package com.soumen.transactsecure.model;

import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import jakarta.persistence.*;

@Entity
@Table(name = "fraud_alerts")
public class FraudAlert {
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private Long transactionId;

    private String reason;
    @Column(name = "alert_time", insertable = false, updatable = false)
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
@com.fasterxml.jackson.databind.annotation.JsonDeserialize(using = com.soumen.transactsecure.config.CustomLocalDateTimeDeserializer.class)
private java.time.LocalDateTime alertTime;

@Column(name = "updated_on", insertable = false, updatable = false)
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
@com.fasterxml.jackson.databind.annotation.JsonDeserialize(using = com.soumen.transactsecure.config.CustomLocalDateTimeDeserializer.class)
private java.time.LocalDateTime updatedOn;

    public FraudAlert() {}

    public FraudAlert(Long transactionId, Long userId, String reason, java.time.LocalDateTime alertTime, java.time.LocalDateTime updatedOn) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.reason = reason;
        this.alertTime = alertTime;
        this.updatedOn = updatedOn;
    }



    public Long getTransactionId() { return transactionId; }
    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }


    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public java.time.LocalDateTime getAlertTime() { return alertTime; }
    public void setAlertTime(java.time.LocalDateTime alertTime) { this.alertTime = alertTime; }

    public java.time.LocalDateTime getUpdatedOn() { return updatedOn; }
    public void setUpdatedOn(java.time.LocalDateTime updatedOn) { this.updatedOn = updatedOn; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    // Optionally add toString(), equals(), hashCode()
}
