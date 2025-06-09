package com.soumen.transactsecure.controller;

import com.soumen.transactsecure.model.FraudRule;
import com.soumen.transactsecure.repository.FraudRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@RestController
@RequestMapping("/api/fraud-rules")
public class FraudRuleController {

    @Autowired
    private FraudRuleRepository fraudRuleRepository;

    @Autowired
    private com.soumen.transactsecure.service.AuthService authService;

    @GetMapping
    public List<FraudRule> getAllRules() {
        return fraudRuleRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<FraudRule> createRule(@RequestBody Map<String, Object> payload, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String ruleText = (String) payload.get("ruleText");
        if (ruleText == null || ruleText.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        // Example: Parse "Do not allow transactions between 2 am and 4 am"
        String name = ruleText;
        String ruleJson = null;
        String action = "block";
        String status = "ACTIVE";
        Pattern pattern = Pattern.compile("(?:between|from)?\\s*(\\d{1,2}) ?am\\s*(?:to|and)\\s*(\\d{1,2}) ?am", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(ruleText);
        if (matcher.find()) {
            int startHour = Integer.parseInt(matcher.group(1));
            int endHour = Integer.parseInt(matcher.group(2));
            // Build a JSON rule that can be used by RuleEngineService
            // We'll use a synthetic field 'hourOfDay' for evaluation
            ruleJson = String.format("{\"conditions\":[{\"field\":\"hourOfDay\",\"operator\":\">=\",\"value\":%d},{\"field\":\"hourOfDay\",\"operator\":\"<\",\"value\":%d}],\"logic\":\"AND\",\"action\":\"block\"}", startHour, endHour);
        } else {
            // Fallback: store the text as a condition for manual review or future NLP
            ruleJson = String.format("{\"conditions\":[{\"field\":\"text\",\"operator\":\"=\",\"value\":\"%s\"}],\"logic\":\"AND\",\"action\":\"flag\"}", ruleText.replace("\"", "\\\""));
            action = "flag";
        }
        FraudRule rule = new FraudRule();
        rule.setName(name);
        rule.setRuleJson(ruleJson);
        rule.setStatus(status);
        rule.setAction(action);
        // Set createdBy to user id if available from JWT
        String createdBy = "SYSTEM";
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.replace("Bearer ", "");
                // Use AuthService to extract email and then get user id
                String email = authService.getEmailFromToken(token);
                var userOpt = authService.getUserByEmail(email);
                if (userOpt.isPresent()) {
                    createdBy = String.valueOf(userOpt.get().getId());
                }
            } catch (Exception ignored) {}
        }
        rule.setCreatedBy(createdBy);
        rule.setCreatedAt(java.time.LocalDateTime.now());
        // Optionally: add createdBy from security context
        FraudRule saved = fraudRuleRepository.save(rule);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FraudRule> updateRule(@PathVariable Long id, @RequestBody FraudRule updatedRule) {
        return fraudRuleRepository.findById(id)
                .map(rule -> {
                    rule.setName(updatedRule.getName());
                    rule.setRuleJson(updatedRule.getRuleJson());
                    rule.setStatus(updatedRule.getStatus());
                    rule.setAction(updatedRule.getAction());
                    rule.setCreatedBy(updatedRule.getCreatedBy());
                    rule.setCreatedAt(updatedRule.getCreatedAt());
                    fraudRuleRepository.save(rule);
                    return ResponseEntity.ok(rule);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRule(@PathVariable Long id) {
        if (fraudRuleRepository.existsById(id)) {
            fraudRuleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
