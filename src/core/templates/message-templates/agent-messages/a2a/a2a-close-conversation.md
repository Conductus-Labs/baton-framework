# Close A2A Conversation

**Purpose:** Template for closing or resolving an A2A conversation.

## Instructions

When a conversation has reached a conclusion (agreement, resolution, or needs to be archived), follow these steps:

### Step 1: Verify Conversation Status

**Action:** Confirm that the conversation is ready to be closed.

**Check:**
- Has consensus been reached?
- Have all action items been completed?
- Is the topic fully resolved?
- Are there any outstanding questions or concerns?

### Step 2: Add Closing Message

**Action:** Add a closing message to the conversation thread.

**Closing Message Format:**
```markdown
### Message {N}: Conversation Closed
**From:** {your-agent-short-name}  
**To:** {all-participants}  
**Timestamp:** {YYYY-MM-DD HH:MM:SS}  
**Type:** closure

**Reason for Closure:**
- {Reason 1: e.g., "Consensus reached"}
- {Reason 2: e.g., "Decision implemented"}
- {Reason 3: e.g., "Topic resolved"}

**Summary:**
{Brief summary of what was discussed and decided}

**Outcomes:**
- {Outcome 1}
- {Outcome 2}

**Action Items Completed:**
- ✅ {Action item 1}
- ✅ {Action item 2}

**References:**
- Related files: {list any files created/modified}
- Related issues: {list any issues closed or created}

---
```

### Step 3: Update Document Status

**Action:** Update the frontmatter to mark the conversation as resolved.

**Status Update:**
```yaml
status: resolved
resolved_at: {YYYY-MM-DD HH:MM:SS}
closed_by: {your-agent-short-name}
resolution_summary: {Brief summary of resolution}
```

### Step 4: Archive if Needed

**Action:** If the conversation is old or no longer relevant, mark it for archival.

**Archive Update:**
```yaml
status: archived
archived_at: {YYYY-MM-DD HH:MM:SS}
archived_by: {your-agent-short-name}
archive_reason: {Reason for archival, e.g., "Resolved and implemented", "Superseded by new conversation"}
```

## Closure Types

### 1. Resolved - Consensus Reached
All participants agreed and the topic is fully resolved.

### 2. Resolved - Decision Implemented
A decision was made and has been implemented in the codebase.

### 3. Resolved - No Action Needed
Discussion concluded that no action is required.

### 4. Archived - Superseded
The conversation was superseded by a new conversation or decision.

### 5. Archived - Stale
The conversation is old and no longer relevant (after cleanup process).

## Cleanup Process

**Purpose:** Periodically archive or remove old A2A conversations to manage storage.

**Criteria for Archival:**
- Conversations resolved more than {X} days ago
- Conversations with status `resolved` for more than {X} days
- Conversations with no activity for more than {X} days

**Cleanup Command Pattern:**
```
Archive old A2A conversations:
- Find conversations in .baton/a2a-comms/ with status: resolved
- Check resolved_at date
- If older than {threshold}, update status to archived
- Optionally move to .baton/a2a-comms/archived/ subdirectory
```

## Best Practices

- **Document outcomes:** Clearly summarize what was decided
- **Link to results:** Reference any files, issues, or implementations
- **Mark completion:** Indicate when action items are done
- **Archive appropriately:** Don't delete, archive for historical reference
- **Clean up regularly:** Periodically archive old resolved conversations

## Example Closure

**Reason:** Consensus reached and decision implemented

**Closing Message:**
"**Conversation Closed**

**Reason for Closure:**
- Consensus reached on API design
- Implementation completed in `src/api/auth.ts`
- All security recommendations addressed

**Summary:**
We discussed the authentication endpoint design and agreed on:
- Rate limiting implementation
- CSRF protection approach
- Service module extraction

**Outcomes:**
- ✅ New authentication endpoint implemented
- ✅ Security review completed
- ✅ Documentation updated

**References:**
- Implementation: `src/api/auth.ts`
- Documentation: `docs/api/authentication.md`
- Related issue: #123 (closed)

This conversation is now resolved and archived."

