---
description: Initialize the {agent-name} agent for a new session
argument-hint: { optional: <agent-short-name> } # Remove this line if command takes no arguments
scope: { scope-name } # Required scope for agent to execute this command (must match agent's scope)
---

# Agent Initialization Command

**Note:** This template supports two approaches:

- **Workflow-based**: Command calls an agent-initialisation workflow (simpler, recommended)
- **Direct initialization**: Command performs all initialization steps directly (more detailed, use when workflow not available)

Execute the agent initialization to load the {agent-name} agent definition, cognitive patterns, and context.

## Instructions

You are executing the agent-init command. Follow these steps in order:

### Step 1: Validate Agent Scope

**CRITICAL PREREQUISITE:** This command requires the agent to have the `{scope-name}` scope. You MUST validate scope before proceeding.

**Action:** Validate that the current agent has the required scope to execute this command.

1. **Load Agent Definition:**

   - Read the agent definition file to get the agent's scope array
   - Agent file location: `.baton/agents/{agent-name}.md` (or from current agent context if already loaded)

2. **Check Scope Match:**

   - Extract the agent's `scope` array from the agent definition frontmatter
   - Verify that the agent's scope array includes: `{scope-name}`
   - This command requires scope: `{scope-name}`

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

Command: {command-name}
Required scope: {scope-name}
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Please use an agent with the '{scope-name}' scope, or add this scope to the agent's definition.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Determine Agent to Initialize

{Choose one of the following approaches:}

#### Option A: Per-Agent Init (Each agent has dedicated init command)

- This command is specific to the {agent-name} agent
- Agent file: `.baton/agents/{agent-name}.md`
- Context file: `.baton/context/{agent-name}-context.md`

#### Option B: Single Init with Short Name (Requires agent short-name parameter)

- **Parse Arguments**: Extract agent short-name from command arguments
  - If no argument provided, prompt user for agent short-name
  - Agent file: `.baton/agents/{agent-short-name}.md`
  - Context file: `.baton/context/{agent-short-name}-context.md`

### Step 2: Load Project Configuration and Manifest

**CRITICAL: MUST READ** - These files provide essential project context that agents need to operate correctly.

**Action:** Read both project configuration files.

**Files to Read:**

1. **Project Configuration**: `.baton/project.config.yml`

   - **Purpose**: Understand available tools, resources, agents, workflows, and project management settings
   - **Extract**:
     - Available tools (CLI tools, knowledge files) and their file paths
     - Available resources (cloud/infrastructure)
     - Installed agents (list with file paths)
     - Installed workflows (list with file paths)
     - Project management methodology and location
     - GenAI platform configurations
     - Agent preferences (auto-save context, verbose logging, etc.)

2. **Project Manifest**: `.baton/project.manifest`
   - **Purpose**: Understand project context, requirements, and constraints
   - **Extract**:
     - Project information (name, description, organization, tech stack)
     - Project requirements (business objectives, technical requirements, non-functional requirements)
     - Features (links to feature files)
     - Success criteria (project goals)
   - **Note:** Architectural decisions are in `knowledge/architecture-decisions.md` (not in manifest)
   - **Note:** Technical and regulatory constraints are in `.baton/boundaries/project-boundaries.md` (not in manifest)

**Why This Is Critical:**

- Agents cannot make informed decisions without understanding project context
- Agents need to know what tools/workflows are available before attempting to use them
- Agents must respect project constraints and requirements
- Agents should reference past decisions to avoid repeating discussions
- Agents need project information to provide context-appropriate responses

**Action:** Read both files and understand the complete project context.

### Step 3: Load Agent Definition

**Action:** Read the agent definition file.

- **File**: `.baton/agents/{agent-name}.md`
- **Purpose**: Complete agent definition with capabilities, cognitive patterns, and behavior guidelines
- **Contents**:
  - Agent identity and role
  - Cognitive pattern integration (primary and secondary patterns)
  - Core capabilities
  - Behavior guidelines and quality standards
  - Workflow processes
  - Boundaries reference

**Action:** Read and understand the complete agent definition.

### Step 4: Load Cognitive Pattern Files

**CRITICAL: MUST READ** - The agent definition file references cognitive pattern files that contain the complete thinking workflows, decision frameworks, communication patterns, and quality standards. These files MUST be read to understand how to apply each pattern.

**Action:** Read all cognitive pattern files referenced in the agent definition frontmatter.

**Files to Read:**

- Read all patterns listed in `cognitive_patterns.primary` from agent definition
- Read all patterns listed in `cognitive_patterns.secondary` from agent definition
- Pattern files are located at paths specified in agent definition frontmatter

**What to Extract from Each File:**

- `cognitive_identity` - What the pattern is and how it thinks
- `thinking_workflow` - Step-by-step workflow phases
- `decision_making_framework` - How to make decisions using this pattern
- `communication_patterns` - How to communicate when using this pattern
- `quality_standards` - Quality criteria for this pattern
- `model_parameters` - Temperature and other LLM parameters

**Purpose**: Understand the complete definition of each cognitive pattern so you know:

- What each pattern is
- When to apply it
- How to apply it (workflows and frameworks)
- What questions to ask or steps to follow
- What quality standards to maintain

**Action:** Read all cognitive pattern files and understand how each pattern works.

### Step 5: Load Agent Context (if exists)

**Action:** Check for and load the agent's context file to understand previous work and learnings.

- **File**: `.baton/context/{agent-name}-context.md`
- **Purpose**: Track progress, decisions, learnings, and context from previous sessions
- **Contents**:
  - Previous work completed
  - Decisions made
  - Learnings and insights
  - Current priorities
  - Ongoing projects and initiatives

**Action:** Review what's been completed and what's next (if file exists). If file doesn't exist, it will be created during first context sync.

### Step 6: Load Boundaries

**Action:** Load boundary files to understand agent constraints.

- **Project Boundaries**: `.baton/boundaries/project-boundaries.md` (if exists)
- **Agent Boundaries**: `.baton/boundaries/{agent-name}-boundaries.md` (if exists)

**Note:** Agent boundaries override project boundaries. Both should be loaded to understand full constraint set.

### Step 7: Confirm Initialization

Once you've loaded all context, respond with:

```text
✓ {Agent Name} Agent Initialized

**Agent Definition**: Loaded from .baton/agents/{agent-name}.md
**Cognitive Patterns**: {count} patterns loaded ({primary_count} primary, {secondary_count} secondary)
**Agent Context**: {exists/created}
**Boundaries**: {project and agent boundaries loaded/only project loaded}

**Primary Cognitive Patterns:**
{List primary patterns with temperatures}

**Secondary Cognitive Patterns:**
{List secondary patterns with temperatures}

**Repository Status:**
{From context file if available}

**Current Priorities:**
{From context file if available, or "Ready to assist with {agent-type} tasks"}

**Ready to:**
{List core capabilities from agent definition}

What would you like me to help with?
```

## Important Notes

- This command should be executed at the start of each new session
- All cognitive pattern files must be read to understand how to apply patterns
- Context file will be created if it doesn't exist
- Always use system date commands, never hardcode dates
- Boundaries must be loaded to understand agent constraints
