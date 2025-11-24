---
description: Updates the {agent-name} agent context file with a summary of the current chat session
scope: context-management # Required scope for agent to execute this command (must match agent's scope)
---

# Sync Context Command

Execute the context synchronization workflow by updating the `.baton/context/{agent-name}-context.md` file with a summary of the current session.

## Instructions

You are executing the sync-context command. Follow these steps in order:

### Step 1: Validate Agent Scope

**CRITICAL PREREQUISITE:** This command requires the agent to have the `context-management` scope. You MUST validate scope before proceeding.

**Action:** Validate that the current agent has the required scope to execute this command.

1. **Load Agent Definition:**
   - Read the agent definition file to get the agent's scope array
   - Agent file location: `.baton/agents/{agent-name}.md` (or from current agent context if already loaded)

2. **Check Scope Match:**
   - Extract the agent's `scope` array from the agent definition frontmatter
   - Verify that the agent's scope array includes: `context-management`
   - This command requires scope: `context-management`

3. **If Scope Matches:**
   - ✅ Continue to Step 2
   - Agent has required scope, proceed with command execution

4. **If Scope Does NOT Match:**
   - ❌ **STOP EXECUTION IMMEDIATELY**
   - Display error message and refuse to run the command
   - Do not proceed with any further steps

**Error Message (if scope mismatch):**
```
❌ Error: Insufficient scope to execute this command

Command: sync-context
Required scope: context-management
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Please use an agent with the 'context-management' scope, or add this scope to the agent's definition.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Summarize the Current Chat Session

**Action:** Review all tasks, changes, and discussions from this session.

**Review:**
- All tasks completed or in progress
- All files that were created, modified, or deleted
- Important decisions made
- Key discussions or insights
- Follow-up items or next steps
- Any errors encountered and how they were resolved

**Action:** Create a concise but comprehensive summary of what was accomplished in this session.

### Step 2: Get Current Date and Time

**IMPORTANT**: Use the bash `date` command to get the current date and time. Do not guess or hardcode the date.

**Execute:**
```bash
date +"%A, %d %B %Y - %H:%M"
```

This will provide the date/time in the format: "Monday, 15 January 2024 - 14:30"

### Step 3: Read Current Context File

**Action:** Read the current context file to preserve all existing content.

- **File**: `.baton/context/{agent-name}-context.md`
- **Purpose**: Preserve all existing session summaries and historical context
- **If file doesn't exist**: Create it with proper frontmatter and initial structure

**Action:** Read the entire context file to preserve all existing content.

### Step 4: Update Context File

**Action:** Append the new session summary to the context file.

**Format the new session entry:**

```markdown
## Session Summary - {date/time from bash date command}

{Detailed summary of the session activities including:
- What was accomplished
- Key changes made to files (list specific files)
- Important decisions or discussions
- Any follow-up items or next steps
- Errors encountered and resolutions}
```

**Important Requirements:**
- **Preserve ALL existing content** in the file
- **Only append** the new session summary at the end
- **Use actual date/time** from the bash `date` command, not a placeholder
- **Be specific** about file changes (list file paths)
- **Include context** for decisions made

### Step 5: Update Last Updated Timestamp

**Action:** Update the `last_updated` field in frontmatter.

- Update `last_updated: {YYYY-MM-DD HH:MM}` in YAML frontmatter
- Use date/time from Step 2

### Step 6: Confirm Completion

**Action:** Provide confirmation to user.

```text
✓ Context synchronized

**Context File**: .baton/context/{agent-name}-context.md
**Session Summary**: Added for {date/time}
**Status**: Updated successfully
```

## Important Notes

- **DO NOT skip any steps**
- **Always use the bash `date` command** to get the current date/time
- **Preserve all existing content** in the context file
- **The summary should be comprehensive but concise**
- **Include specific file names and changes** when relevant
- **Context file location**: `.baton/context/{agent-name}-context.md`
- **Never hardcode dates or times**

