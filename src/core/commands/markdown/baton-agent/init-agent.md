---
description: Initialize any agent for a new session (lists available agents or initializes specified agent)
argument-hint: <optional: agent-short-name | -list>
scope: agent-initialisation # Required scope for agent to execute this command
---

# Init Agent Command

Execute the agent-initialisation workflow to initialize any agent for a new session. This command can list available agents or initialize a specific agent.

## Instructions

You are executing the init-agent command. Follow these steps in order:

### Step 1: Validate Agent Scope

**CRITICAL PREREQUISITE:** This command requires the agent to have the `agent-initialisation` scope. You MUST validate scope before proceeding.

**Action:** Validate that the current agent has the required scope to execute this command.

1. **Load Agent Definition:**

   - Read the agent definition file to get the agent's scope array
   - Agent file location: `.baton/agents/{agent-name}.md` (or from current agent context if already loaded)

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

Command: init-agent
Required scope: agent-initialisation
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Please use an agent with the 'agent-initialisation' scope, or add this scope to the agent's definition.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Load Project Configuration

**Action:** Read the project configuration file to get the list of available agents.

- **File**: `.baton/project.config.yml`
- **Purpose**: Extract enabled agents list for validation and listing
- **Extract**:
  - `agents.enabled` array containing agent entries with `name` and `path` fields
  - Store agent list for use in subsequent steps

**Error Handling:**

- **If project.config.yml does not exist:**
  - Display error message:
    ```
    ❌ Error: Project configuration file not found

    File: .baton/project.config.yml

    The project has not been initialized. Please run /project-init first.
    ```
  - Stop execution

- **If agents.enabled is missing or empty:**
  - Display error message:
    ```
    ❌ Error: No agents configured

    No agents are enabled in project.config.yml. Please add agents to the agents.enabled array.
    ```
  - Stop execution

**Action:** Read project.config.yml and extract the agents.enabled array. If file doesn't exist or agents list is empty, display error and stop execution.

### Step 3: Parse Command Arguments

**Action:** Parse command arguments to determine behavior.

1. **Check for arguments:**
   - If no arguments provided: Go to Step 4 (List Agents)
   - If argument is `-list` or `--list`: Go to Step 4 (List Agents)
   - If argument is an agent short name: Go to Step 5 (Validate Agent)

2. **Extract agent short name:**
   - If argument provided and not `-list`/`--list`, treat as agent short name
   - Store agent short name for validation in Step 5

**Action:** Parse arguments and determine next step based on argument value.

### Step 4: List Available Agents (Conditional)

**Action:** Display list of available agents from project.config.yml.

**When to execute:** This step executes when:
- No arguments provided, OR
- Argument is `-list` or `--list`

**Display Format:**

```
Available Agents:
- {agent-name-1}
- {agent-name-2}
- {agent-name-3}
```

**Implementation:**
- Extract `name` field from each entry in `agents.enabled` array
- Display formatted list
- Exit command (do NOT proceed to workflow execution)

**Action:** If listing agents, display the formatted list and exit. Do not proceed to workflow execution.

### Step 5: Validate Agent Short Name (Conditional)

**Action:** Validate that the provided agent short name exists in project.config.yml.

**When to execute:** This step executes when an agent short name argument is provided.

1. **Check agent exists in config:**
   - Search `agents.enabled` array for entry where `name` field matches provided agent short name
   - If not found: Display error with available agents list and exit
   - If found: Continue to next validation

2. **Verify agent file exists:**
   - Read `path` field from matching agent entry
   - Check if agent file exists at specified path
   - If file does not exist: Display error and exit
   - If file exists: Continue to Step 6

**Error Messages:**

- **Agent not found in config:**
  ```
  ❌ Error: Agent '{agent_short_name}' not found

  Available agents:
  - {agent-name-1}
  - {agent-name-2}

  Please use one of the available agents listed above.
  ```

- **Agent file not found:**
  ```
  ❌ Error: Agent file not found

  Agent: {agent_short_name}
  Expected path: {path_from_config}

  Please verify the agent file exists at the specified path in project.config.yml.
  ```

**Action:** Validate agent short name exists in config and agent file exists. If validation fails, display error and exit. If validation succeeds, continue to Step 6.

### Step 6: Load Workflow Definition

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

### Step 7: Execute Agent Initialisation Workflow

**Action:** Execute the agent-initialisation workflow with the validated agent short-name parameter.

**Workflow Execution:**

- **Workflow File**: `.baton/workflows/agent-initialisation.yml`
- **Parameter**: Pass `agent_short_name: {validated_agent_short_name}` to the workflow
- **Execution Method**: Follow the workflow steps as defined in the workflow file

**Workflow Steps:**

1. Follow each step in the workflow file in order
2. Pass the `agent_short_name: {validated_agent_short_name}` parameter to workflow steps that require it
3. Execute actions as specified in each workflow step
4. Handle decision points according to workflow definition
5. Follow error handling strategies from workflow file

**Action:** Execute the workflow with the validated agent short name parameter.

### Step 8: Confirm Completion

**Action:** Provide completion summary from workflow execution.

The workflow will provide a confirmation message. Display the workflow's completion message to the user.

## Important Notes

- This command executes the agent-initialisation workflow
- The workflow handles all initialization steps
- Agent short-name is provided as a command argument or can be listed
- If no argument or `-list` is provided, the command lists available agents and exits
- Always use system date commands, never hardcode dates
- Workflow file location: `.baton/workflows/agent-initialisation.yml`
- Project config file location: `.baton/project.config.yml`
- Agent files are located at paths specified in `agents.enabled` array in project.config.yml

## Usage Examples

- `/init-agent` - Lists all available agents
- `/init-agent -list` - Lists all available agents
- `/init-agent baton-agent` - Initializes the baton-agent
- `/init-agent cli-engineer` - Initializes the cli-engineer agent

