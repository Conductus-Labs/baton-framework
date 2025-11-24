---
description: Initialize the baton-agent for a new session
scope: agent-initialisation # Required scope for agent to execute this command
---

# Init Baton Agent Command

Execute the agent-initialisation workflow to initialize the baton-agent for a new session.

## Instructions

You are executing the init-baton-agent command. Follow these steps in order:

### Step 1: Validate Agent Scope

**CRITICAL PREREQUISITE:** This command requires the agent to have the `agent-initialisation` scope. You MUST validate scope before proceeding.

**Action:** Validate that the current agent has the required scope to execute this command.

1. **Load Agent Definition:**
   - Read the agent definition file to get the agent's scope array
   - Agent file location: `.baton/agents/baton-agent.md` (or from current agent context if already loaded)

2. **Check Scope Match:**
   - Extract the agent's `scope` array from the agent definition frontmatter
   - Verify that the agent's scope array includes: `agent-initialisation`
   - This command requires scope: `agent-initialisation`

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

Command: init-baton-agent
Required scope: agent-initialisation
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Please use an agent with the 'agent-initialisation' scope, or add this scope to the agent's definition.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Load Workflow Definition

**Action:** Read the agent-initialisation workflow file.

- **File**: `.baton/workflows/agent-initialisation.yml`
- **Purpose**: Complete workflow definition with steps, error handling, and command references
- **Extract**:
  - Workflow name and purpose
  - Prerequisites
  - Workflow steps
  - Error handling mechanisms
  - Command references

**Action:** Read and understand the complete workflow definition.

### Step 3: Execute Agent Initialisation Workflow

**Action:** Execute the agent-initialisation workflow with the agent short-name parameter set to `baton-agent`.

**Workflow Execution:**

- **Workflow File**: `.baton/workflows/agent-initialisation.yml`
- **Parameter**: Pass `agent-short-name: baton-agent` to the workflow
- **Execution Method**: Follow the workflow steps as defined in the workflow file

**Workflow Steps:**

1. Follow each step in the workflow file in order
2. Pass the `agent-short-name: baton-agent` parameter to workflow steps that require it
3. Execute actions as specified in each workflow step
4. Handle decision points according to workflow definition
5. Follow error handling strategies from workflow file

### Step 4: Confirm Completion

**Action:** Provide completion summary from workflow execution.

The workflow will provide a confirmation message. Display the workflow's completion message to the user.

## Important Notes

- This command executes the agent-initialisation workflow
- The workflow handles all initialization steps
- Agent short-name is always `baton-agent` for this command
- Always use system date commands, never hardcode dates
- Workflow file location: `.baton/workflows/agent-initialisation.yml`
