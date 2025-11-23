---
description: Updates agent context, commits and pushes all changes for {agent-name} agent
scope: context-management # Required scope for agent to execute this command (must match agent's scope)
---

# Wrap Up Command

Execute the session wrap-up workflow by syncing context, committing changes, and pushing to the remote repository.

## Instructions

You are executing the wrap-up command. Follow these steps in order:

### Step 1: Validate Agent Scope

**CRITICAL PREREQUISITE:** This command requires the agent to have the `context-management` scope. You MUST validate scope before proceeding.

**Action:** Validate that the current agent has the required scope to execute this command.

1. **Load Agent Definition:**
   - Read the agent definition file to get the agent's scope array
   - Agent file location: `.baton/agents/{agent-name}.md` (or from current agent context if already loaded)

2. **Check Scope Match:**
   - Extract the agent's `scope` array from the agent definition frontmatter
   - Verify that the agent's scope array includes: `context-management`
   - This command requires scope: `context-management`

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

Command: wrap-up
Required scope: context-management
Agent: {agent_name}
Agent scopes: {agent_scopes_list}

This agent does not have the required scope to execute this command.
Please use an agent with the 'context-management' scope, or add this scope to the agent's definition.
```

**Action:** Validate scope before proceeding. If scope does not match, stop execution and display error.

### Step 2: Sync Context File

**Action:** Update the context file with current session summary.

**Execute sync-context workflow:**
- Follow the sync-context command steps (see sync-context-template.md)
- Update `.baton/context/{agent-name}-context.md` with session summary
- Use bash `date` command for timestamp
- Preserve all existing content

**IMPORTANT**: Use the bash `date` command to get the current date and time. Do not guess or hardcode the date.

**Execute:**
```bash
date +"%A, %d %B %Y - %H:%M"
```

### Step 2: Check Git Status

**Action:** Check current git status to see what changes need to be committed.

**Execute:**
```bash
git status
```

**Review:**
- List of modified files
- List of new files
- List of deleted files
- Any uncommitted changes

### Step 3: Stage All Changes

**Action:** Stage all changed files for commit.

**Execute:**
```bash
git add .
```

**Verify:**
- Confirm all intended changes are staged
- Review staged changes if needed

### Step 4: Generate and Execute Commit

**Action:** Create a meaningful commit message and commit changes.

**Commit Message Guidelines:**
- Be concise but descriptive (1-2 sentences)
- Focus on the "what" and "why" of the changes
- Use imperative mood (e.g., "Add agent templates" not "Added agent templates")
- Include agent name if relevant: "{Agent Name}: {description}"

**Generate commit message based on:**
- Files changed
- Session summary from context file
- Main accomplishments

**Execute:**
```bash
git commit -m "{your generated message}"
```

**If commit fails:**
- Check error message
- Resolve any issues (e.g., no changes to commit)
- Inform user of the situation

### Step 5: Push to Remote

**Action:** Push committed changes to the remote repository.

**Determine default branch:**
```bash
git branch --show-current
```

**Execute push:**
```bash
git push origin {branch-name}
```

**Common branch names:**
- `main`
- `master`
- `develop`

**If push fails:**
- Check error message
- Verify remote is configured: `git remote -v`
- Inform user of the error and suggest resolution

### Step 6: Verify Push Success

**Action:** Confirm push was successful.

**Check git status:**
```bash
git status
```

**Expected output:** "Your branch is up to date with 'origin/{branch-name}'"

### Step 7: Confirmation Summary

**Action:** Provide comprehensive summary to user.

```text
✓ Session wrapped up successfully

**Context File**: .baton/context/{agent-name}-context.md
  - Updated with session summary for {date/time}

**Git Operations**:
  - Files staged: {count}
  - Commit message: "{commit message}"
  - Branch: {branch-name}
  - Push status: Success

**Summary of Changes**:
{List key changes committed}

**Next Steps**:
{Any follow-up items from session}
```

## Important Notes

- **DO NOT skip any steps**
- **If any git operation fails**, report the error to the user and stop
- **Use meaningful, descriptive commit messages** based on actual changes made
- **Always check git status** after pushing to confirm success
- **Always use the bash `date` command** to get the current date/time
- **Never hardcode dates or times**
- **Preserve all existing context** when updating context file

