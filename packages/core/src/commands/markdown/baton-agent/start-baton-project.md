---
description: Initialize Baton Framework for a new or existing project (run-once command)
---

# Start Baton Project Command

This is a **run-once-only** command that initializes the Baton Framework for your project. It will initialize the baton-agent, scan your project, help configure project files, and optionally install agents, workflows, and knowledge files. After completion, this command will delete itself to prevent re-execution.

## Instructions

You are executing the start-baton-project command. Follow these steps in order:

### Step 1: Welcome and Initialize Baton Agent

**Action:** Display welcome message and initialize the baton-agent (yourself) for the first time.

- **Welcome Message Template**: `user-messages/commands/start-baton-project/step-1-welcome.md`
- **Workflow File**: `.baton/workflows/agent-initialisation.yml`
- **Parameter**: Pass `agent_short_name: baton-agent` to the workflow
- **Execution Method**: Execute the agent-initialisation workflow following all steps defined in the workflow file
- **Purpose**: Load agent definition, cognitive patterns, context, and boundaries to prepare for project setup

**Error Handling:**

- If agent initialization fails, display error from: `user-messages/commands/start-baton-project/error-agent-init-failed.md`
- Stop execution if initialization fails

**Action:** Display welcome message, then execute the agent-initialisation workflow with `agent_short_name: baton-agent`.

### Step 2: Check Project Initialization Status

**Action:** Determine if this is a new or existing project.

- Check if `.baton/project.config.yml` exists
- Check if `.baton/project.manifest.md` exists
- Check if `.baton/boundaries/project-boundaries.md` exists
- Check if project directory has any files (package.json, README.md, source files, etc.)

**Decision Points:**

- **If `.baton/` directory doesn't exist or is empty:**
  - This is a **new project** - proceed to Step 3 (Project Scanning - can be skipped if truly empty)
- **If `.baton/` directory exists but files are missing or in template state:**
  - This is a **new project** - proceed to Step 3
- **If `.baton/` directory exists with configured files:**
  - This is an **existing project** - proceed to Step 3 (Project Scanning - gather information)

**Action:** Check project status and proceed accordingly.

### Step 3: Scan Project for Information

**Action:** Analyze the project to gather information for configuration.

**If project is new/empty:**

- Skip detailed scanning
- Note that most values will need user input
- Proceed to Step 4

**If project is existing:**

- Scan project directory structure to determine project type
- Check for package.json, requirements.txt, Cargo.toml, pyproject.toml, etc. to identify technology stack
- Check for .git directory and remote URL to determine source control provider and repository URL
- Check for existing .baton/ directory structure to identify any existing agents/workflows/knowledge
- Check for project management files (package.json scripts, Makefile, etc.)
- Read README.md or other documentation to understand project purpose
- Identify GenAI platform from current context (Cursor, Claude, Gemini)
- Check for existing project management tools (GitHub Issues, Jira, etc.)
- Extract project name from directory name or package.json
- Compile discovered information for use in subsequent steps

**Display Results:**

- Use message template: `user-messages/commands/start-baton-project/step-3-project-scan-results.md`
- Replace placeholders: `{project_type}`, `{technology_stack}`, `{source_control_provider}`, `{repository_url}`, `{default_branch}`, `{project_management_type}`, `{project_management_location}`, `{additional_discoveries}`, `{scan_note}`

**Action:** Scan project and gather available information. Display scan results using message template. If project is empty, note that and proceed.

### Step 4: Load or Create Project Files

**Action:** Ensure project configuration files exist.

- **If `.baton/project.config.yml` doesn't exist:**
  - Execute project-initialisation workflow to create it (but skip the HITL checkpoints - we'll do our own)
  - OR create from template: `baton/templates/project-file-templates/project.config-template.yml`
- **If `.baton/project.manifest.md` doesn't exist:**
  - Create from template: `baton/templates/project-file-templates/project.manifest-template.md`
- **If `.baton/boundaries/project-boundaries.md` doesn't exist:**
  - Create from template: `baton/templates/boundaries-templates/project-boundaries-template.md`

**Action:** Load existing files or create from templates. Read both files into memory for editing.

### Step 5: Configure Project Manifest

**Action:** Go through project.manifest.md properties one at a time, showing suggestions and asking for user input.

**Process for each property in project.manifest.md:**

1. **Display the property name and current value (if any)**
2. **Show your suggested value** (if you determined one from scanning)
3. **Ask user to confirm or provide the correct value**
4. **Update the property with the user's input**

**Properties to configure (in order):**

- **Project Name** - Use scanned value or ask user
- **Description** - Use scanned value from README or ask user
- **Organization** - Ask user (cannot be scanned)
- **Project Type** - Use scanned value or ask user
- **Technology Stack** - Use scanned value or ask user
- **Target Environment** - Ask user (Development, Production, Both)
- **Business Objectives** (starts with 3 placeholders, but user can add more):
  - Ask user for each placeholder (1, 2, 3)
  - After filling all placeholders, ask: "Would you like to add more business objectives? (yes/no)"
  - If yes: Continue asking for additional objectives until user says "no" or "done"
  - If user says "none" at any point: Skip remaining placeholders and move to next section
- **Technical Requirements:**
  - Frontend - Use scanned value or ask user
  - Backend - Use scanned value or ask user
  - Database - Use scanned value or ask user
  - Infrastructure - Use scanned value or ask user
  - Third-Party Services - Use scanned value or ask user
- **Non-Functional Requirements:**
  - Performance - Ask user
  - Security - Ask user
  - Scalability - Ask user
  - Availability - Ask user
  - Compliance - Ask user
- **Success Criteria** (starts with 4 placeholders, but user can add more):
  - Ask user for each placeholder (1, 2, 3, 4)
  - After filling all placeholders, ask: "Would you like to add more success criteria? (yes/no)"
  - If yes: Continue asking for additional criteria until user says "no" or "done"
  - If user says "none" at any point: Skip remaining placeholders and move to next section

**Message Template:**

- Use template: `user-messages/commands/start-baton-project/step-5-manifest-property-prompt.md`
- Replace placeholders for each property:
  - `{property_name}` - Property name
  - `{current_value}` - Current value or "Not set"
  - `{suggested_value}` - Your suggestion or "None - please provide"
  - `{property_description}` - Description of what this property is for
  - `{examples}` - Examples of valid values

**CRITICAL HITL CHECKPOINT - For Each Property:**

1. **Display the prompt** using the message template with all placeholders filled
2. **STOP EXECUTION IMMEDIATELY** - Do NOT proceed to the next property
3. **WAIT FOR USER INPUT** - The user must provide a value before you continue
4. **Process user input:**
   - If user types `accept` or `yes` (case-insensitive): Use the suggested value
   - If user types `none` or `skip` (case-insensitive) AND this is a list property: Clear remaining items in this list and move to next section
   - If user types any other text: Use that text as the value
5. **ONLY AFTER receiving user input**, update the property in memory
6. **THEN proceed** to the next property

**List Properties (can be skipped with "none" or extended beyond placeholders):**

- Business Objectives (starts with 3 placeholders):
  - Fill each placeholder one by one
  - If user says "none" at any point: Skip remaining placeholders and move to next section
  - After all placeholders filled: Ask if user wants to add more
  - If yes: Continue adding until user says "no" or "done"
- Success Criteria (starts with 4 placeholders):
  - Fill each placeholder one by one
  - If user says "none" at any point: Skip remaining placeholders and move to next section
  - After all placeholders filled: Ask if user wants to add more
  - If yes: Continue adding until user says "no" or "done"
- Technical Requirements sub-items - Each can be skipped individually
- Non-Functional Requirements sub-items - Each can be skipped individually

**Action:** Go through each property systematically:

- Display prompt using message template
- **PAUSE EXECUTION AND WAIT FOR USER RESPONSE**
- Collect user input (do not proceed until received)
- Process input: accept/yes = use suggested, none/skip = skip list items, otherwise = use as value
- Update property in memory with processed value
- If "none"/"skip" on list property: Clear remaining items in that list and move to next section
- Move to next property

### Step 6: Configure Project Config

**Action:** Go through remaining properties in project.config.yml that are not filled in, showing suggestions and asking for user input.

**CRITICAL: Skip Properties That Already Have Values**

- **Before prompting for each property**, check if it already has a value (not a placeholder)
- **Placeholder patterns** to detect: `{project-name}`, `{project-type}`, `{YYYY-MM-DDTHH:MM:SSZ}`, `{provider}`, `{repository-url}`, `{branch-name}`, `{methodology}`, `{location-type}`, `{optional-url}`, `{platform-name}`, `{model-name}`, `{integration-type}`, `{ true/false }`, or any value wrapped in `{}`
- **If property has a real value** (not a placeholder, not empty, not just whitespace): **SKIP IT** - do not prompt the user
- **Only prompt for properties** that are:
  - Empty or null
  - Contain placeholder patterns (e.g., `{project-name}`)
  - Are whitespace-only

**Message Template:**

- Use template: `user-messages/commands/start-baton-project/step-6-config-property-prompt.md`
- Replace placeholders for each property:
  - `{property_path}` - Full property path (e.g., "project.name")
  - `{current_value}` - Current value or "Not set"
  - `{suggested_value}` - Your suggestion or "None - please provide"
  - `{property_description}` - Description of what this property is for
  - `{valid_options}` - Valid options or format (if applicable)

**CRITICAL HITL CHECKPOINT - For Each Property (Only If Placeholder/Empty):**

1. **Check if property already has a value** (not a placeholder)
2. **If it has a real value: SKIP IT** - do not prompt, move to next property
3. **If it's a placeholder or empty:**
   - **Display the property prompt** using message template with all placeholders filled
   - **STOP EXECUTION IMMEDIATELY** - Do NOT proceed to the next property
   - **WAIT FOR USER INPUT** - The user must provide a value before you continue
   - **Process user input:**
     - If user types `accept` or `yes` (case-insensitive): Use the suggested value
     - If user types any other text: Use that text as the value
   - **ONLY AFTER receiving user input**, update the property in memory
4. **THEN proceed** to the next property

**Process for each property:**

1. **Check current value** - Is it a placeholder pattern or empty?
2. **If already has real value: SKIP** (baton init already populated it)
3. **If placeholder or empty:**
   - Display the property prompt using message template
   - **PAUSE EXECUTION AND WAIT FOR USER RESPONSE** (do not proceed until user responds)
   - Collect user input (wait for it - do not auto-accept)
   - Process input: `accept`/`yes` = use suggested value, otherwise = use as value
   - Update the property with the processed value

**Properties to check and configure (in order) - Only prompt if placeholder/empty:**

- **project.name** - Check if `{project-name}` placeholder, if so: Use from manifest or scanned value
- **project.type** - Check if `{project-type}` placeholder, if so: Use from manifest or scanned value
- **project.initialized** - Check if `{YYYY-MM-DDTHH:MM:SSZ}` placeholder, if so: Use current date/time from system command
- **source_control.provider** - Check if `{provider}` placeholder, if so: Use scanned value (github, gitlab, bitbucket) or ask user
- **source_control.repository_url** - Check if `{repository-url}` placeholder, if so: Use scanned value from git remote or ask user
- **source_control.default_branch** - Check if `{branch-name}` placeholder, if so: Use scanned value (main, master, develop) or ask user
- **project_management.type** - Check if `{methodology}` placeholder, if so: Ask user (RHYTHM-Method, scrum, agile, waterfall, kanban)
- **project_management.location** - Check if `{location-type}` placeholder, if so: Ask user (github-issues, azure-devops, jira, local, linear)
- **project_management.url** - Check if `{optional-url}` placeholder, if so: Use scanned value or ask user (if applicable)
- **gen_ai[0].name** - Check if `{platform-name}` placeholder, if so: Use detected platform (cursor, claude, gemini) or ask user
- **gen_ai[0].model** - Check if `{model-name}` placeholder, if so: Use "auto" or ask user
- **gen_ai[0].provider** - Check if `{provider}` placeholder, if so: Use detected platform or ask user
- **gen_ai[0].integration_type** - Check if `{integration-type}` placeholder, if so: Use "ide-native" for Cursor/Claude, or ask user
- **gen_ai[0].primary** - Check if `{ true/false }` placeholder, if so: Set to true for first entry

**Note:** If baton CLI init already populated any of these with real values (not placeholders), skip them automatically.

**Action:** Go through each property systematically, showing suggestions and collecting user input. Update project.config.yml in memory.

### Step 7: Suggest and Install Agents (Existing Projects Only)

**Action:** If this is an existing project, suggest and install appropriate agents.

**Process:**

1. **Run CLI command to list available agents:**

   - Execute: `baton agent ls` (or equivalent - check if CLI is available)
   - Parse the output to get list of available agents
   - If CLI is not available, read from `baton/agents/` directory

2. **Analyze project to suggest relevant agents:**

   **CRITICAL: Perform comprehensive analysis using multiple data sources:**

   a. **Check Project Type (from project.config.yml or project.manifest.md):**

   - If type is "Documentation", "documentation", "Documentation/Methodology", "Methodology", "methodology": Suggest `technical-writer-agent`
   - If type is "Web Application", "web-application", "Web App": Suggest `frontend-engineer-agent`, `backend-engineer-agent`
   - If type is "API Service", "api-service": Suggest `backend-engineer-agent`
   - If type is "Library", "library": Suggest `software-architect-agent`
   - If type is "Framework", "framework": Suggest `software-architect-agent`, `technical-writer-agent`

   b. **Check Project Management Type (from project.config.yml):**

   - If `project_management.type` is "RHYTHM-Method" or contains "RHYTHM": Suggest `rhythm-expert-agent`
   - If `project_management.type` is "scrum", "agile", "kanban": Suggest `project-manager-agent`

   c. **Check Technology Stack (from project.manifest.md or scanning):**

   - If contains frontend technologies (React, Vue, Angular, etc.): Suggest `frontend-engineer-agent`
   - If contains backend technologies (Node.js, Python, Java, etc.): Suggest `backend-engineer-agent`
   - If contains database technologies: Suggest `database-engineer-agent`
   - If contains DevOps tools (Docker, Kubernetes, CI/CD): Suggest `devops-engineer-agent`
   - If contains data science tools (Python, R, Jupyter): Suggest `data-science-engineer-agent`

   d. **Check Project Description/Requirements (from project.manifest.md):**

   - If description mentions "documentation", "writing", "technical writing": Suggest `technical-writer-agent`
   - If description mentions "security", "vulnerability", "penetration": Suggest `security-engineer-agent`
   - If description mentions "testing", "QA", "quality assurance": Suggest `quality-assurance-agent`, `automated-test-engineer-agent`
   - If description mentions "UI", "UX", "design", "user interface": Suggest `ui-ux-design-agent`
   - If description mentions "research", "analysis", "investigation": Suggest `research-assistant-agent`
   - If description mentions "content", "marketing", "strategy": Suggest `content-strategist-agent`
   - If description mentions "business", "requirements", "analysis": Suggest `business-analyst-agent`

   e. **Always consider these agents for specific project types:**

   - Documentation projects: `technical-writer-agent` (ALWAYS suggest)
   - Software projects: `code-review-agent` (ALWAYS suggest)
   - Any project with code: `quality-assurance-agent` (ALWAYS suggest)
   - Projects with RHYTHM-Method methodology: `rhythm-expert-agent` (ALWAYS suggest)

   f. **Read agent definitions if needed:**

   - If unsure about an agent's purpose, read the agent definition file from `baton/agents/<agent-name>.md`
   - Check the agent's role, purpose, and capabilities to determine if it's relevant

   g. **Compile suggestions:**

   - Create a list of suggested agents with brief reasons (e.g., "technical-writer-agent - Recommended for documentation projects")
   - Remove duplicates
   - Mark which suggested agents are already installed (check `.baton/agents/` directory)
   - Sort by relevance (most relevant first)

3. **Display suggestions to user:**

   - Use message template: `user-messages/commands/start-baton-project/step-7-agent-suggestions.md`
   - Replace placeholders:
     - `{suggested_agents_list}` - Formatted list of suggested agents with descriptions AND reasons (e.g., "technical-writer-agent - Recommended for documentation projects")
     - `{all_agents_list}` - Formatted list of ALL available agents from `baton/agents/` (include ALL agents, mark which are already installed)
   - **Always show ALL available agents** so user can select any agent, not just suggested ones
   - **Mark installed agents** in the list (e.g., "baton-agent (already installed)")
   - **If no agents are suggested** (all already installed or none relevant):
     - Still display the message but note: "No additional agents to suggest - all relevant agents are already installed or none match this project type"
     - User can still select any agent from the full list

4. **CRITICAL HITL CHECKPOINT - Wait for User Decision:**

   - **STOP EXECUTION IMMEDIATELY** after displaying suggestions
   - **WAIT FOR USER RESPONSE** - User must choose: `all`, `select`, or `skip`
   - **DO NOT proceed** until user provides their choice
   - **DO NOT auto-select** any option

5. **If user wants to select individually:**

   - Use message template: `user-messages/commands/start-baton-project/step-7-agent-selection.md`
   - Replace placeholders:
     - `{agents_list_with_descriptions}` - Full list of ALL available agents with descriptions (mark which are already installed)
   - **CRITICAL HITL CHECKPOINT:**
     - **STOP EXECUTION** after displaying selection prompt
     - **WAIT FOR USER INPUT** - User must provide agent names or `none`
     - **User can select ANY agent** from the full list, not just suggested ones
     - **DO NOT proceed** until user provides their selection

6. **During installation:**

   - Use message template: `user-messages/commands/start-baton-project/step-7-agent-installation-progress.md`
   - Replace placeholders:
     - `{installation_progress}` - Progress updates for each agent
     - `{installed_count}` - Number successfully installed
     - `{failed_count}` - Number that failed

7. **If user selected agents (all or individually):**

   - For each selected agent, run: `baton agent add <agent-name>`
   - OR manually copy from `baton/agents/<agent-name>.md` to `.baton/agents/<agent-name>.md`
   - Update `project.config.yml` agents.enabled array with installed agents

8. **If user selected `skip`:**
   - Skip agent installation
   - Continue to next step

**Action:** Suggest and install agents for existing projects. **Remember to PAUSE and WAIT for user input at each checkpoint.** Update project.config.yml with installed agents.

### Step 8: Suggest and Install Workflows (Existing Projects Only)

**Action:** If this is an existing project, suggest and install appropriate workflows.

**Process:**

1. **Run CLI command to list available workflows:**

   - Execute: `baton workflow ls` (or equivalent)
   - Parse the output to get list of available workflows
   - If CLI is not available, read from `baton/workflows/` directory (excluding sub-flows)

2. **Analyze project to suggest relevant workflows:**

   - Suggest workflows that would be useful for this project
   - Core workflows (agent-initialisation, context-synchronisation) are usually always needed

3. **Display suggestions to user:**

   - Use message template: `user-messages/commands/start-baton-project/step-8-workflow-suggestions.md`
   - Replace placeholders:
     - `{suggested_workflows_list}` - Formatted list of suggested workflows with descriptions
     - `{all_workflows_list}` - Formatted list of all available workflows

4. **CRITICAL HITL CHECKPOINT - Wait for User Decision:**

   - **STOP EXECUTION IMMEDIATELY** after displaying suggestions
   - **WAIT FOR USER RESPONSE** - User must choose: `all`, `select`, or `skip`
   - **DO NOT proceed** until user provides their choice
   - **DO NOT auto-select** any option

5. **If user wants to select individually:**

   - Use message template: `user-messages/commands/start-baton-project/step-8-workflow-selection.md`
   - Replace placeholders:
     - `{workflows_list_with_descriptions}` - Full list with descriptions
   - **CRITICAL HITL CHECKPOINT:**
     - **STOP EXECUTION** after displaying selection prompt
     - **WAIT FOR USER INPUT** - User must provide workflow names or `none`
     - **DO NOT proceed** until user provides their selection

6. **During installation:**

   - Use message template: `user-messages/commands/start-baton-project/step-8-workflow-installation-progress.md`
   - Replace placeholders:
     - `{installation_progress}` - Progress updates for each workflow
     - `{installed_count}` - Number successfully installed
     - `{failed_count}` - Number that failed

7. **If user selected workflows (all or individually):**

   - For each selected workflow, run: `baton workflow add <workflow-name>`
   - OR manually copy from `baton/workflows/<workflow-name>.yml` to `.baton/workflows/<workflow-name>.yml`
   - Update `project.config.yml` workflows.enabled array with installed workflows

8. **If user selected `skip`:**
   - Skip workflow installation
   - Continue to next step

**Action:** Suggest and install workflows for existing projects. **Remember to PAUSE and WAIT for user input at each checkpoint.** Update project.config.yml with installed workflows.

### Step 9: Suggest and Install Knowledge Files (Existing Projects Only)

**Action:** If this is an existing project, suggest and install appropriate knowledge files.

**Process:**

1. **Run CLI command to list available knowledge files:**

   - Execute: `baton knowledge ls` (or equivalent)
   - Parse the output to get list of available knowledge files
   - If CLI is not available, read from `baton/knowledge/` directory

2. **Analyze project to suggest relevant knowledge:**

   - Based on technology stack and project requirements
   - Suggest knowledge files that would be useful

3. **Display suggestions to user:**

   - Use message template: `user-messages/commands/start-baton-project/step-9-knowledge-suggestions.md`
   - Replace placeholders:
     - `{suggested_knowledge_list}` - Formatted list of suggested knowledge files with descriptions
     - `{all_knowledge_list}` - Formatted list of all available knowledge files

4. **CRITICAL HITL CHECKPOINT - Wait for User Decision:**

   - **STOP EXECUTION IMMEDIATELY** after displaying suggestions
   - **WAIT FOR USER RESPONSE** - User must choose: `all`, `select`, or `skip`
   - **DO NOT proceed** until user provides their choice
   - **DO NOT auto-select** any option

5. **If user wants to select individually:**

   - Use message template: `user-messages/commands/start-baton-project/step-9-knowledge-selection.md`
   - Replace placeholders:
     - `{knowledge_list_with_descriptions}` - Full list with descriptions
   - **CRITICAL HITL CHECKPOINT:**
     - **STOP EXECUTION** after displaying selection prompt
     - **WAIT FOR USER INPUT** - User must provide knowledge file names or `none`
     - **DO NOT proceed** until user provides their selection

6. **During installation:**

   - Use message template: `user-messages/commands/start-baton-project/step-9-knowledge-installation-progress.md`
   - Replace placeholders:
     - `{installation_progress}` - Progress updates for each knowledge file
     - `{installed_count}` - Number successfully installed
     - `{failed_count}` - Number that failed

7. **If user selected knowledge files (all or individually):**

   - For each selected knowledge file, run: `baton knowledge add <knowledge-name>`
   - OR manually copy knowledge files
   - Update `project.config.yml` knowledge array with installed knowledge files

8. **If user selected `skip`:**
   - Skip knowledge installation
   - Continue to next step

**Action:** Suggest and install knowledge files for existing projects. **Remember to PAUSE and WAIT for user input at each checkpoint.** Update project.config.yml with installed knowledge.

### Step 10: Write Updated Configuration Files

**Action:** Write the updated project.config.yml and project.manifest.md files to disk.

- Write updated `project.config.yml` to `.baton/project.config.yml`
- Write updated `project.manifest.md` to `.baton/project.manifest.md`
- Ensure proper YAML and Markdown formatting
- Preserve file structure and comments

**Action:** Write both configuration files with all updates.

### Step 11: Welcome Message

**Action:** Display welcome message to the user.

- **Message Template**: `user-messages/commands/start-baton-project/step-11-welcome-complete.md`
- **Replace placeholders:**
  - `{agents_installed}` - List of installed agents (or empty if none)
  - `{workflows_installed}` - List of installed workflows (or empty if none)
  - `{knowledge_installed}` - List of installed knowledge files (or empty if none)

**Action:** Display the welcome message using the message template.

### Step 12: Delete This Command

**Action:** Delete this command file so it cannot be run again.

**Files to delete (check each location):**

1. **In baton-framework repository** (if this is the framework repo):
   - `baton/commands/markdown/baton-agent/start-baton-project.md`
   - `baton/commands/toml/baton-agent/start-baton-project.toml`
2. **In project repository** (if this is a project repo):
   - `.cursor/commands/baton/start-baton-project.md`
   - `.claude/commands/baton/start-baton-project.md`
   - `.gemini/commands/baton/start-baton-project.toml`

**Deletion Process:**

- Check if each file exists before attempting deletion
- Delete files that exist (ignore errors for files that don't exist)
- If deletion fails, display warning but continue (file may be read-only or in use)

**Confirmation Message:**

- Use message template: `user-messages/commands/start-baton-project/step-12-command-deleted.md`
- Display after deletion attempts (list which files were deleted)

**Action:** Delete the command file(s) from all possible locations to prevent re-execution. Display confirmation message.

## Important Notes

- This is a **run-once-only** command - it will delete itself after execution
- This command does NOT need to be in the permissions matrix
- Always use system date commands, never hardcode dates
- For new/empty projects, most values will need user input
- For existing projects, scan as much as possible to reduce user input
- CLI commands (`baton agent ls`, etc.) should be executed if CLI is available
- If CLI is not available, read directly from `baton/` directories
- All installed agents, workflows, and knowledge must be added to project.config.yml
- The command must delete itself after successful completion

## CRITICAL: HITL Checkpoint Behavior

**YOU MUST FOLLOW THESE RULES FOR ALL USER INPUT PROMPTS:**

1. **STOP EXECUTION** immediately after displaying any prompt that requires user input
2. **WAIT FOR USER RESPONSE** - Do NOT proceed to the next step until the user provides input
3. **DO NOT auto-accept** suggested values - wait for explicit user confirmation
4. **DO NOT continue** automatically - each prompt is a checkpoint that requires user interaction
5. **ONLY AFTER receiving user input**, update the configuration and proceed to the next step

**Processing User Input:**

- **`accept` or `yes`** (case-insensitive): Use the suggested value
- **`none` or `skip`** (case-insensitive): For list properties only - skip remaining items in that list and move to next section
- **Any other text**: Use as the actual value

**List Properties (can use "none" to skip remaining):**

- Business Objectives (1-3)
- Success Criteria (1-4)
- Technical Requirements sub-items (each can be skipped individually)
- Non-Functional Requirements sub-items (each can be skipped individually)

**This applies to:**

- Every property in Step 5 (Project Manifest configuration)
- Every property in Step 6 (Project Config configuration)
- Agent selection in Step 7
- Workflow selection in Step 8
- Knowledge file selection in Step 9

**If you find yourself proceeding automatically without waiting for user input, you are executing the command incorrectly.**

## Error Handling

- **If agent initialization fails:**

  - Display error from: `user-messages/commands/start-baton-project/error-agent-init-failed.md`
  - Replace `{error_details}` with actual error message
  - Stop execution

- **If project scanning fails:**

  - Continue with empty values, ask user for input
  - Note in scan results that project appears empty

- **If CLI commands fail:**

  - Display warning from: `user-messages/commands/start-baton-project/error-cli-command-failed.md`
  - Replace `{command}` and `{error_message}` with actual values
  - Fall back to reading from `baton/` directories
  - Continue execution (not critical)

- **If file write fails:**

  - Display error from: `user-messages/commands/start-baton-project/error-file-write-failed.md`
  - Replace `{error_details}` with actual error message
  - Stop execution

- **If command deletion fails:**
  - Display warning but continue (command may not be deletable in some contexts)
  - Note that user should manually delete the command file
