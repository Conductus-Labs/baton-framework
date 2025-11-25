# Rule Operation Completed Successfully

✓ Rule {operation} completed for {boundary_type} boundaries

**Operation:** {operation}  
**Boundary Type:** {boundary_type}  
{if agent}**Agent:** {agent_name}{/if}  
**Rule Name:** {rule_name}  
{if add or update}**Rule Description:** {rule_description}{/if}  
**File:** `.baton/boundaries/{boundaries_file_path}`

{if file_created}**Note:** Agent boundaries file was created from template.{/if}

{if add}The rule has been added to the "Always Do" section of the boundaries file. You may want to review the rule and add additional details such as:
- **Scope:** Files, directories, or environments where this applies
- **Trigger:** When this action must be performed
- **Example:** Brief example of correct behavior{/if}

{if update}The rule has been updated in the "Always Do" section of the boundaries file. Existing fields (Scope, Trigger, Example) have been preserved.{/if}

{if delete}The rule has been removed from the "Always Do" section of the boundaries file.{/if}

