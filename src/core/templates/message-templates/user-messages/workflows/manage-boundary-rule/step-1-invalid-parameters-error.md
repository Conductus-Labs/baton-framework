# Error: Invalid Parameters

❌ Error: Invalid or missing parameters

**Issue:** Required parameters are missing or invalid.

**Required Parameters:**
- `operation`: Must be either "add", "update", or "delete"
- `boundary_type`: Must be either "project" or "agent"
- `agent_name`: Required if boundary_type is "agent"
- `rule_name`: Required - Name of the rule to add/update/delete
- `rule_description`: Required if operation is "add" or "update" - Description of the rule

**Usage:**
- Project boundaries: `/set-project-rule {add|update|delete} <RULE-NAME> ["<RULE-DESCRIPTION>"]`
- Agent boundaries: `/set-agent-rule {add|update|delete} <agent-name> <RULE-NAME> ["<RULE-DESCRIPTION>"]`

Please verify all required parameters are provided correctly.

