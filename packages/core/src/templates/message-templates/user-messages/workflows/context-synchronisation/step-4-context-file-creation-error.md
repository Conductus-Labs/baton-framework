# Context File Creation Error

❌ Error: Cannot create context file

**File:** `.baton/context/{agent_short_name}-context.md`

**Possible Causes:**
- Write permissions not available for `.baton/context/` directory
- Directory does not exist
- Disk space not available
- Template file not found

**Recovery:**
- Verify write permissions to `.baton/context/` directory
- Ensure the directory exists
- Check available disk space
- Verify template file exists at: `baton/templates/context-templates/context-template.md`

