---
description: Initialize a project with Baton Framework configuration files
---

# Project Init Command

Execute the project-initialisation workflow to initialize a project with Baton Framework by creating project.config.yml, project.manifest, and project-boundaries.md.

## Instructions

You are executing the project-init command. Follow these steps in order:

### Step 1: Load Workflow Definition

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

### Step 2: Execute Project Initialisation Workflow

**Action:** Execute the project-initialisation workflow by following all steps defined in the workflow file.

- **Workflow File**: `.baton/workflows/project-initialisation.yml`
- **Execution Method**: Follow each workflow step in order, including HITL checkpoints
- **HITL Checkpoints**: The workflow includes three HITL checkpoints that will pause execution and wait for user input. Follow the workflow definition for checkpoint behavior and decision processing.

### Step 3: Confirm Completion

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
