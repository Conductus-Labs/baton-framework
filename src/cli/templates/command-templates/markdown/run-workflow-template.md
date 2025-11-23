---
description: Execute the {workflow-name} workflow for {agent-name} agent
argument-hint: {optional: <workflow-parameters>}
---

# Run Workflow Command

Execute the {workflow-name} workflow for the {agent-name} agent.

## Instructions

You are executing the run-workflow command. Follow these steps in order:

### Step 1: Verify Agent Authorization

**CRITICAL:** Check if the current agent is authorized to execute this workflow.

**Action:** Verify agent authorization:

- **Read workflow file**: `.baton/workflows/{workflow-name}.yml`
- **Check `allowed_agents` field** (if present):
  - If `allowed_agents` is specified, verify current agent is in the list
  - If current agent is NOT in the list, STOP and inform user: "This workflow can only be executed by: {list of allowed agents}"
  - If `allowed_agents` is not specified, workflow can be executed by any agent
- **Check agent boundaries**: Verify agent boundaries allow this workflow execution

**If unauthorized:** Stop execution and inform user of authorization requirement.

### Step 2: Load Workflow Definition

**Action:** Read the workflow file.

- **File**: `.baton/workflows/{workflow-name}.yml`
- **Purpose**: Complete workflow definition with steps, error handling, and command references
- **Extract**:
  - Workflow name and purpose
  - Prerequisites
  - Workflow steps
  - Error handling mechanisms
  - Command references

**Action:** Read and understand the complete workflow definition.

### Step 3: Load Project Configuration and Manifest

**CRITICAL: MUST READ** - Workflows need project context to execute correctly.

**Action:** Read both project configuration files.

**Files to Read:**

1. **Project Configuration**: `.baton/project.config.yml`

   - **Purpose**: Understand available tools, resources, and workflows
   - **Extract**:
     - Available tools (for workflow steps that require CLI tools) and their file paths
     - Available resources (for workflow steps that require cloud access)
     - Installed workflows (for workflow dependencies) with file paths
     - Project management methodology and location
     - Agent preferences (for workflow behavior customization)

2. **Project Manifest**: `.baton/project.manifest`
   - **Purpose**: Understand project requirements and constraints
   - **Extract**:
     - Project requirements (workflows must align with requirements)
     - Features (workflows may need to reference existing features)
   - **Note:** Architectural decisions are in `knowledge/architecture-decisions.md` (workflows should respect past decisions)
   - **Note:** Technical and regulatory constraints are in `.baton/boundaries/project-boundaries.md` (workflows must respect limitations)

**Why This Is Critical:**

- Workflows may need to use tools defined in project.config.yml
- Workflows must respect project constraints from project.manifest
- Workflows should align with project requirements
- Workflows may need to reference past decisions to avoid conflicts

**Action:** Read both files and understand the complete project context before executing workflow steps.

### Step 4: Check Prerequisites

**Action:** Verify all prerequisites are met.

**Check Prerequisites:**
- Review `prerequisites` section in workflow file
- Verify each prerequisite:
  - {Prerequisite 1}
  - {Prerequisite 2}
  - {Prerequisite 3}

**If prerequisites not met:** Stop execution and inform user of missing prerequisites.

### Step 5: Parse Workflow Parameters (if any)

**Action:** Extract and validate workflow parameters from command arguments.

**Parameters:**
- {Parameter 1}: {Description}
- {Parameter 2}: {Description}

**Validation:**
- Verify required parameters are provided
- Validate parameter formats
- Set default values for optional parameters

### Step 6: Execute Workflow Steps

**Action:** Execute workflow steps in order.

**For each step in workflow:**

1. **Read step definition** from workflow file
2. **Execute step actions** as specified
3. **Handle decision points**:
   - Evaluate conditions
   - Follow `if_true` or `if_false` paths as appropriate
4. **Check for errors**:
   - If error occurs, follow error handling from workflow file
   - Retry if specified (with max retries)
   - Use fallback strategy if retries exhausted
5. **Verify step completion** before proceeding to next step

**Parallel Execution:**
- If step has `parallel_execution.enabled: true`, execute parallel steps concurrently
- Wait for all parallel steps to complete before proceeding

### Step 7: Handle Errors

**Action:** Follow error handling strategy from workflow file.

**Error Handling:**
- **Retry Logic**: If `error_handling.global_retry.enabled: true`, retry failed steps
  - Use backoff strategy specified (exponential/linear/fixed)
  - Respect `max_retries` limit
- **Error Types**: Handle specific error types as defined in workflow file
- **Recovery Actions**: Execute recovery actions for each error type
- **User Notification**: Inform user of errors and recovery actions taken

### Step 8: Confirm Completion

**Action:** Provide completion summary.

```text
✓ Workflow "{workflow-name}" Completed

**Workflow**: {workflow-name}
**Agent**: {agent-name}
**Steps Executed**: {count}
**Status**: {Success/Partial Success with warnings}
**Duration**: {if applicable}

**Results:**
{Summary of workflow results}

**Next Steps:**
{Any follow-up actions required}
```

## Important Notes

- Always verify agent authorization before executing workflow
- Check prerequisites before starting workflow execution
- Follow error handling strategies from workflow file
- Respect parallel execution constraints
- Log all workflow steps for debugging
- Workflow file location: `.baton/workflows/{workflow-name}.yml`

