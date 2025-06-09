package com.soumen.transactsecure.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soumen.transactsecure.model.FraudRule;
import com.soumen.transactsecure.model.DynamicRule;
import com.soumen.transactsecure.model.Transaction; // Adjust import as per your Transaction class location
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RuleEngineService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public boolean evaluateRules(List<FraudRule> rules, Transaction txn) {
        for (FraudRule rule : rules) {
            try {
                DynamicRule dynamicRule = objectMapper.readValue(rule.getRuleJson(), DynamicRule.class);
                if (evaluateDynamicRule(dynamicRule, txn)) {
                    // Apply action, e.g., flag, block, etc.
                    // You can also return the action/tag for further processing
                    return true;
                }
            } catch (Exception e) {
                // Handle invalid rule JSON
                e.printStackTrace();
            }
        }
        return false;
    }

    private boolean evaluateDynamicRule(DynamicRule rule, Transaction txn) {
        boolean result = rule.logic.equalsIgnoreCase("AND");
        for (DynamicRule.Condition cond : rule.conditions) {
            boolean condResult = evaluateCondition(cond, txn);
            if (rule.logic.equalsIgnoreCase("AND")) {
                result &= condResult;
            } else {
                result |= condResult;
            }
        }
        return result;
    }

    private boolean evaluateCondition(DynamicRule.Condition cond, Transaction txn) {
        Object fieldValue = txn.getFieldValue(cond.field); // Implement getFieldValue in Transaction
        if (fieldValue == null) return false;
        switch (cond.operator) {
            case ">": return Double.parseDouble(fieldValue.toString()) > Double.parseDouble(cond.value.toString());
            case "<": return Double.parseDouble(fieldValue.toString()) < Double.parseDouble(cond.value.toString());
            case "=": return fieldValue.toString().equals(cond.value.toString());
            case "!=": return !fieldValue.toString().equals(cond.value.toString());
            case "IN": return ((List<?>) cond.value).contains(fieldValue);
            case "NOT IN": return !((List<?>) cond.value).contains(fieldValue);
            default: return false;
        }
    }
}
