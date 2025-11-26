# Initiate A2A Conversation

**Purpose:** Template for an agent to initiate a conversation with one or more other agents.

## Instructions

When you need to communicate with other agents about a topic, follow these steps:

### Step 1: Determine Conversation Topic

**Action:** Identify the topic or issue that requires multi-agent discussion.

- Create a clear, concise topic title
- Generate a unique topic ID (format: `{topic-slug}-{YYYYMMDD-HHMMSS}`)
- Example: `api-design-review-20250127-143022`

### Step 2: Identify Recipient Agents

**Action:** Determine which agent(s) should be involved in this conversation.

- List agent short names (e.g., `backend-agent`, `architect-agent`, `qa-agent`)
- Consider which agents have relevant expertise
- Can be one or multiple agents

### Step 3: Create A2A Communication Document

**Action:** Create a new A2A communication document in `.baton/a2a-comms/`.

**File Path:** `.baton/a2a-comms/{topic-id}.md`

**Document Structure:**
```markdown
---
version: 1.0.0
topic_id: {topic-id}
topic_title: {Topic Title}
initiated_by: {your-agent-short-name}
initiated_at: {YYYY-MM-DD HH:MM:SS}
recipients:
  - {agent-short-name-1}
  - {agent-short-name-2}
status: active
participants:
  - {your-agent-short-name}
resolved_at: null
archived_at: null
---

# {Topic Title}

## Conversation Thread

### Message 1: Initial Message
**From:** {your-agent-short-name}  
**To:** {recipient-agent-short-name-1}, {recipient-agent-short-name-2}  
**Timestamp:** {YYYY-MM-DD HH:MM:SS}  
**Type:** initiation

{Your message content here}

**Context:**
- Related files: {list any relevant files}
- Related issues: {list any related issues or tasks}
- Background: {brief background if needed}

**Requested Action:**
{What you're asking the recipient agents to do or discuss}

---
```

### Step 4: Notify Recipient Agents

**Action:** After creating the document, notify recipient agents that they have a new message.

**Notification Format:**
```
📨 New A2A Message

Topic: {Topic Title}
From: {your-agent-short-name}
File: .baton/a2a-comms/{topic-id}.md

Please read and respond using the a2a-read-messages template.
```

## Best Practices

- **Clear Subject Lines:** Make topic titles descriptive and specific
- **Relevant Recipients:** Only include agents who need to be involved
- **Sufficient Context:** Provide enough background for recipients to understand
- **Actionable Requests:** Clearly state what you need from other agents
- **Related References:** Include links to relevant files, issues, or documentation

## Example

**Topic:** API endpoint design review for user authentication

**Recipients:** `backend-agent`, `security-agent`, `architect-agent`

**Message:**
"I'm designing a new authentication endpoint and would like your input on the security implications and architectural alignment. Please review the proposed design in `src/api/auth.ts` and provide feedback on:
1. Security best practices
2. Architectural consistency
3. Performance considerations"

