---
description: Updates the agent context file with a summary of the current chat session
scope: context-management # Required scope for agent to execute this command
---

# Sync Context Command

Execute the context-synchronisation workflow to update the `.baton/context/{agent-name}-context.md` file with a summary of the current session.

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

```text
❌ Error: Insufficient scope to execute this command

Command: sync-context
Required scope: context-management
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Please use an agent with the 'context-management' scope, or add this scope to the agent's definition.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Load Workflow Definition

**Action:** Read the context-synchronisation workflow file.

- **File**: `.baton/workflows/context-synchronisation.yml`
- **Purpose**: Complete workflow definition with steps, error handling, and command references
- **Extract**:
  - Workflow name and purpose
  - Prerequisites
  - Workflow steps
  - Error handling mechanisms
  - Command references

**Action:** Read and understand the complete workflow definition.

### Step 3: Execute Context Synchronisation Workflow

**Action:** Execute the context-synchronisation workflow by following all steps defined in the workflow file.

- **Workflow File**: `.baton/workflows/context-synchronisation.yml`
- **Execution Method**: Follow each workflow step in order
- **Workflow will**:
  - Validate agent scope
  - Load or create context file using sub-flows
  - Collect session information
  - Update context file with new session entry
  - Display confirmation message

### Step 4: Confirm Completion

**Action:** Provide completion summary from workflow execution.

The workflow will provide a confirmation message. Display the workflow's completion message to the user, including:

- Context file location
- Session summary information
- Status of update

## Important Notes

- This command executes the context-synchronisation workflow
- Only agents with the context-management scope can execute this command
- Always use system date commands, never hardcode dates
- Workflow file location: `.baton/workflows/context-synchronisation.yml`
- Context file location: `.baton/context/{agent-name}-context.md`
- For workflow details, error handling, and message templates, refer to the workflow file

