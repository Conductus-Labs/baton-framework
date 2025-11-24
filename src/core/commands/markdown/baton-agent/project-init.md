---
description: Initialize a project with Baton Framework configuration files
scope: project-setup # Required scope for agent to execute this command
---

# Project Init Command

Execute the project-initialisation workflow to initialize a project with Baton Framework by creating project.config.yml, project.manifest, and project-boundaries.md.

## Instructions

You are executing the project-init command. Follow these steps in order:

### Step 1: Validate Agent Scope

**CRITICAL PREREQUISITE:** This command requires the agent to have the `project-setup` scope. You MUST validate scope before proceeding.

**Action:** Validate that the current agent has the required scope to execute this command.

1. **Load Agent Definition:**

   - Read the agent definition file to get the agent's scope array
   - Agent file location: `.baton/agents/baton-agent.md` (or from current agent context if already loaded)

2. **Check Scope Match:**

   - Extract the agent's `scope` array from the agent definition frontmatter
   - Verify that the agent's scope array includes: `project-setup`
   - This command requires scope: `project-setup`

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

Command: project-init
Required scope: project-setup
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Only baton-agent can initialize projects. Please use baton-agent to run this command.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Load Workflow Definition

**Action:** Read the project-initialisation workflow file.

- **File**: `.baton/workflows/project-initialisation.yml`
- **Purpose**: Complete workflow definition with steps, HITL checkpoints, error handling, and command references
- **Extract**:
  - Workflow name and purpose
  - Prerequisites
  - Workflow steps (including HITL checkpoints)
  - Error handling mechanisms
  - Command references

**Action:** Read and understand the complete workflow definition, paying special attention to the HITL checkpoint steps.

### Step 3: Execute Project Initialisation Workflow

**Action:** Execute the project-initialisation workflow by following all steps defined in the workflow file.

- **Workflow File**: `.baton/workflows/project-initialisation.yml`
- **Execution Method**: Follow each workflow step in order, including HITL checkpoints
- **HITL Checkpoints**: The workflow includes three HITL checkpoints that will pause execution and wait for user input. Follow the workflow definition for checkpoint behavior and decision processing.

### Step 4: Confirm Completion

**Action:** Provide completion summary from workflow execution.

The workflow will provide a confirmation message. Display the workflow's completion message to the user, including:

- List of files created/updated
- Next steps for customization
- Instructions for initializing agents

## Important Notes

- This command executes the project-initialisation workflow
- Only baton-agent has the project-setup scope required to execute this command
- Always use system date commands, never hardcode dates
- Workflow file location: `.baton/workflows/project-initialisation.yml`
- For workflow details, HITL checkpoint behavior, and error handling, refer to the workflow file
