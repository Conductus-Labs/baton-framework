# Error: Rule Not Found

❌ Error: Rule not found

**File:** `.baton/boundaries/{boundaries_file_path}`
**Rule:** {rule_name}
**Operation:** {operation}

**Issue:** The specified rule does not exist in the boundaries file.

**Solution:**
- For `update` or `delete` operations: Verify the rule name is correct
- For `add` operation: This error should not occur - the rule will be added
- Use the `add` operation to create a new rule with this name

**Example:**
`/set-project-rule add "{rule_name}" "<description>"`

Or for agent boundaries:
`/set-agent-rule add <agent-name> "{rule_name}" "<description>"`

