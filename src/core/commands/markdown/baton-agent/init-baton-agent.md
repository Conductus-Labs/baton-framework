---
description: Initialize the baton-agent for a new session
---

# Init Baton Agent Command

Execute the agent-initialisation workflow to initialize the baton-agent for a new session.

## Instructions

You are executing the init-baton-agent command. Follow these steps in order:

### Step 1: Load Workflow Definition

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

### Step 2: Execute Agent Initialisation Workflow

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

### Step 3: Confirm Completion

**Action:** Provide completion summary from workflow execution.

The workflow will provide a confirmation message. Display the workflow's completion message to the user.

## Important Notes

- This command executes the agent-initialisation workflow
- The workflow handles all initialization steps
- Agent short-name is always `baton-agent` for this command
- Always use system date commands, never hardcode dates
- Workflow file location: `.baton/workflows/agent-initialisation.yml`
