CREATE TABLE IF NOT EXISTS fraud_alerts (
    id BIGSERIAL PRIMARY KEY,
    transaction_id BIGINT,
    user_id BIGINT NOT NULL,
    reason VARCHAR(255),
    alert_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_fraud_alert
      FOREIGN KEY(user_id)
      REFERENCES users(id)
);
