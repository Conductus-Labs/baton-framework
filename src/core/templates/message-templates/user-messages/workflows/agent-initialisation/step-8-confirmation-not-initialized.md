# Agent Initialized (Project Not Initialized)

✓ {Agent Name} Agent Initialized

**Agent Definition:** Loaded from .baton/agents/{agent_short_name}.md  
**Cognitive Patterns:** {count} patterns loaded ({primary_count} primary, {secondary_count} secondary)  
**Agent Context:** {exists/created}

**Primary Cognitive Patterns:**
{List primary patterns with temperatures}

**Secondary Cognitive Patterns:**
{List secondary patterns with temperatures}

{If context file was created: "**Note:** New context file created at .baton/context/{agent_short_name}-context.md"}

⚠️ **CRITICAL: Project Not Initialized**

This project has not been initialized yet. You **MUST** run the `/project-init` command before I can assist with any tasks.

**Required Action:**
Run `/project-init` to initialize the project configuration files:
- `.baton/project.config.yml` - Project configuration
- `.baton/project.manifest.md` - Project requirements and success criteria
- `.baton/boundaries/project-boundaries.md` - Project boundaries and constraints

Once the project is initialized, I will be able to:
- Load project context and boundaries
- Understand project requirements and constraints
- Assist with project-specific tasks

**Please run `/project-init` now.**

