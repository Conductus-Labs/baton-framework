# A2A Communication Templates

**Purpose:** Templates for Agent-to-Agent (A2A) communication within the Baton Framework.

## Overview

A2A communication allows agents to collaborate, discuss topics, reach consensus, and coordinate work. All communications for a topic are stored in a single document in `.baton/a2a-comms/`.

## Available Templates

### 1. `a2a-initiate-conversation.md`
**When to use:** When you need to start a conversation with one or more other agents.

**Use cases:**
- Requesting input or expertise
- Proposing a design or approach
- Coordinating on a task
- Seeking consensus on a decision

### 2. `a2a-read-messages.md`
**When to use:** When you need to read existing A2A conversations.

**Use cases:**
- Checking for new messages
- Reviewing conversation history
- Understanding context before responding
- Finding relevant past discussions

### 3. `a2a-respond-to-message.md`
**When to use:** When you need to respond to a message in an A2A conversation.

**Use cases:**
- Providing expertise or input
- Asking clarifying questions
- Expressing agreement or disagreement
- Adding context or recommendations

### 4. `a2a-reach-agreement.md`
**When to use:** When you agree with a proposal or consensus has been reached.

**Use cases:**
- Formally agreeing to a proposal
- Indicating consensus has been reached
- Documenting final decisions
- Marking conversations as resolved

### 5. `a2a-close-conversation.md`
**When to use:** When a conversation is complete and should be closed or archived.

**Use cases:**
- Closing resolved conversations
- Archiving old conversations
- Documenting final outcomes
- Cleaning up completed discussions

## Communication Document Structure

Each A2A communication document (`.baton/a2a-comms/{topic-id}.md`) contains:

**Frontmatter:**
- Topic ID and title
- Initiator and recipients
- Status (active, resolved, archived)
- Participants list
- Timestamps

**Content:**
- Conversation thread (chronological messages)
- Final decision summary (if resolved)
- Action items and outcomes

## Workflow

1. **Initiate:** Agent A creates a conversation document and notifies recipients
2. **Read:** Recipient agents read the conversation
3. **Respond:** Recipient agents respond with their input
4. **Agree:** Agents indicate agreement as consensus builds
5. **Close:** Conversation is closed when resolved or archived when stale

## Best Practices

- **One topic per document:** Keep each conversation focused on a single topic
- **Clear subject lines:** Use descriptive topic titles
- **Relevant participants:** Only include agents who need to be involved
- **Document decisions:** Clearly document final decisions and outcomes
- **Archive regularly:** Periodically archive old resolved conversations
- **Link to results:** Reference related files, issues, or implementations

## Example Use Cases

- **Design Review:** `backend-agent` asks `architect-agent` and `security-agent` to review an API design
- **Coordination:** `pm-agent` coordinates with `frontend-agent` and `backend-agent` on feature implementation
- **Consensus Building:** `qa-agent` seeks agreement from `devops-agent` on testing strategy
- **Knowledge Sharing:** `research-agent` shares findings with `technical-writer-agent` for documentation

