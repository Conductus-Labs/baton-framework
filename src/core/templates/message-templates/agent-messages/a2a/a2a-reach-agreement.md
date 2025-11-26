# Reach Agreement in A2A Conversation

**Purpose:** Template for an agent to indicate agreement or reach consensus in an A2A conversation.

## Instructions

When you agree with a proposal, decision, or have reached consensus with other agents, follow these steps:

### Step 1: Review the Proposal

**Action:** Ensure you fully understand what you're agreeing to.

**Review:**
- The original proposal or decision point
- All responses and discussions in the conversation
- Any modifications or compromises made
- Final state of the proposal

### Step 2: Confirm Agreement

**Action:** Add an agreement message to the conversation thread.

**Agreement Format:**
```markdown
### Message {N}: Agreement from {your-agent-short-name}
**From:** {your-agent-short-name}  
**To:** {all-participants}  
**Timestamp:** {YYYY-MM-DD HH:MM:SS}  
**Type:** agreement

✅ **I agree** with the proposal/decision.

**Agreed Points:**
- {Point 1}
- {Point 2}
- {Point 3}

**Conditions/Notes:**
{Any conditions, assumptions, or notes about your agreement}

**Ready to proceed:** {Yes/No - are you ready to move forward?}

---
```

### Step 3: Check for Consensus

**Action:** Determine if all required participants have agreed.

**Consensus Check:**
- Review all participants listed in frontmatter
- Check which participants have responded
- Verify if all critical participants have agreed
- Note if any participants have concerns or disagreements

### Step 4: Update Document Status (if consensus reached)

**Action:** If all required participants agree, update the document status.

**Status Update:**
```yaml
status: resolved
resolved_at: {YYYY-MM-DD HH:MM:SS}
consensus_reached: true
final_decision: {Summary of the agreed-upon decision}
```

### Step 5: Document Final Decision

**Action:** Add a summary of the final decision to the document.

**Decision Summary Format:**
```markdown
## Final Decision

**Decision Date:** {YYYY-MM-DD HH:MM:SS}  
**Participants in Agreement:**
- {agent-1}
- {agent-2}
- {agent-3}

**Agreed Decision:**
{Clear statement of what was decided}

**Action Items:**
- {Action item 1} - Owner: {agent-name}
- {Action item 2} - Owner: {agent-name}

**Next Steps:**
{What happens next based on this decision}
```

## Agreement Types

### 1. Full Agreement
You completely agree with the proposal as stated.

### 2. Conditional Agreement
You agree with conditions or assumptions that must be met.

### 3. Partial Agreement
You agree with some aspects but have reservations about others.

### 4. Consensus Reached
All participants have agreed and the conversation can be resolved.

## Best Practices

- **Be explicit:** Clearly state what you're agreeing to
- **Note conditions:** Document any assumptions or conditions
- **Confirm readiness:** Indicate if you're ready to proceed
- **Track consensus:** Help track which participants have agreed
- **Document decisions:** Ensure final decisions are clearly documented

## Example Agreement

**In Reply To:** Message 3 (Final proposal after discussion)

**Agreement:**
"✅ **I agree** with the final API design proposal.

**Agreed Points:**
- Rate limiting implementation approach
- CSRF protection strategy
- Service module extraction plan

**Conditions:**
- Assumes we can implement rate limiting within current sprint
- 2FA enhancement can be deferred to next phase

**Ready to proceed:** Yes - I can begin implementation once the design is finalized in the codebase."

