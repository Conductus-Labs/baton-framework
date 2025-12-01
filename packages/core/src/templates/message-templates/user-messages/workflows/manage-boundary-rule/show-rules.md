# {Boundary Type} Boundaries Rules

**Boundary Type:** {boundary_type}  
{if agent}**Agent:** {agent_name}{/if}  
**File:** `.baton/boundaries/{boundaries_file_path}`

{if no_rules}
No rules are currently defined in the {boundary_type} boundaries.

{if agent}Use `/manage-agent-rules add {agent_name} <RULE-NAME> "<RULE-DESCRIPTION>"` to add your first rule.{/if}
{if project}Use `/manage-project-rules add <RULE-NAME> "<RULE-DESCRIPTION>"` to add your first rule.{/if}
{/if}

{if rules_exist}
## Current Rules

{rules_list}

---

**Total Rules:** {rule_count}
{/if}

