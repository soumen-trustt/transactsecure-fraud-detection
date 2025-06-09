CREATE TABLE fraud_rules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rule_json TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    action VARCHAR(50),
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
