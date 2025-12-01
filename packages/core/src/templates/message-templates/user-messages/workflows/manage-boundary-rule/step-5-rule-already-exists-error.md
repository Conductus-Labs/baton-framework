# Error: Rule Already Exists

❌ Error: Rule already exists

**File:** `.baton/boundaries/{boundaries_file_path}`
**Rule:** {rule_name}

**Issue:** A rule with this name already exists in the boundaries file.

**Solution:**
Use the `update` operation to modify the existing rule instead of `add`.

**Example:**
`/set-project-rule update "{rule_name}" "<new description>"`

Or for agent boundaries:
`/set-agent-rule update <agent-name> "{rule_name}" "<new description>"`

