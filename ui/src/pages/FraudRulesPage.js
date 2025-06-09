import React, { useState, useEffect } from 'react';

function FraudRulesPage() {
  const [rules, setRules] = useState([]);
  const [ruleText, setRuleText] = useState("");

  // Fetch rules from backend
  useEffect(() => {
    fetch('/api/fraud-rules')
      .then(async res => {
        if (!res.ok) throw new Error('Failed to load rules');
        const text = await res.text();
        if (!text) return [];
        try {
          return JSON.parse(text);
        } catch (e) {
          return [];
        }
      })
      .then(setRules)
      .catch(() => setRules([]));
  }, []);

  // Handle form submission for plain English rule
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ruleText.trim()) return;
    await fetch('/api/fraud-rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleText })
    });
    setRuleText("");
    // Refresh rules
    fetch('/api/fraud-rules')
      .then(async res => {
        if (!res.ok) throw new Error('Failed to load rules');
        const text = await res.text();
        if (!text) return [];
        try {
          return JSON.parse(text);
        } catch (e) {
          return [];
        }
      })
      .then(setRules)
      .catch(() => setRules([]));
  };


  // Handle rule deletion
  const deleteRule = async (id) => {
    await fetch(`/api/fraud-rules/${id}`, { method: 'DELETE' });
    // Refresh rules after delete
    fetch('/api/fraud-rules')
      .then(async res => {
        if (!res.ok) throw new Error('Failed to load rules');
        const text = await res.text();
        if (!text) return [];
        try {
          return JSON.parse(text);
        } catch (e) {
          return [];
        }
      })
      .then(setRules)
      .catch(() => setRules([]));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h2>Fraud Rule Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}>
        <textarea
          value={ruleText}
          onChange={e => setRuleText(e.target.value)}
          placeholder="Describe your fraud rule, e.g., 'Do not allow transactions between 2 am and 4 am'"
          rows={3}
          style={{ width: '100%', fontSize: '1rem', padding: '0.75rem' }}
        />
        <button type="submit">Create Rule</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rule JSON</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <tr key={rule.id}>
              <td>{rule.name}</td>
              <td><pre>{rule.ruleJson}</pre></td>
              <td>
                <button onClick={() => deleteRule(rule.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FraudRulesPage;
