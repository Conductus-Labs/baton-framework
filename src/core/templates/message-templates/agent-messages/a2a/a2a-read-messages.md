# Read A2A Messages

**Purpose:** Template for an agent to read and review A2A communication documents.

## Instructions

When you receive a notification about a new A2A message or need to check for messages, follow these steps:

### Step 1: Check for Messages

**Action:** Check the `.baton/a2a-comms/` directory for messages where you are a recipient.

**Options:**
1. **Check specific topic:** Read a specific A2A communication document
2. **Check all active conversations:** List all active conversations where you are a participant
3. **Check pending messages:** Find conversations where you haven't responded yet

### Step 2: Read the Communication Document

**Action:** Read the A2A communication document to understand the conversation.

**File Path:** `.baton/a2a-comms/{topic-id}.md`

**Extract Information:**
- Topic title and ID
- Who initiated the conversation
- Who are the recipients/participants
- Current status (active, resolved, archived)
- Full conversation thread
- Any requested actions
- Related files or context

### Step 3: Understand the Request

**Action:** Analyze what is being asked of you.

**Consider:**
- What expertise or input is needed from you?
- What context or information do you need to provide a useful response?
- Are there any dependencies or prerequisites?
- What is the urgency or priority?

### Step 4: Determine Response

**Action:** Decide how to respond.

**Options:**
1. **Respond immediately:** If you have all the information needed
2. **Request clarification:** If you need more context
3. **Defer to another agent:** If someone else is better suited
4. **Agree/Disagree:** If the topic requires consensus

**Next Steps:**
- If responding: Use `a2a-respond-to-message.md` template
- If agreeing: Use `a2a-reach-agreement.md` template
- If closing: Use `a2a-close-conversation.md` template

## Reading Active Conversations

**Command Pattern:**
```
List all active A2A conversations where I am a participant:
- Check .baton/a2a-comms/*.md files
- Filter by status: active
- Filter by participants: includes {my-agent-short-name}
```

## Reading Specific Conversation

**Command Pattern:**
```
Read A2A conversation: .baton/a2a-comms/{topic-id}.md
- Extract frontmatter metadata
- Read conversation thread
- Identify my role (initiator, recipient, participant)
- Check if I have responded
```

## Best Practices

- **Read fully:** Read the entire conversation thread before responding
- **Check context:** Review any referenced files or issues
- **Understand status:** Note if conversation is active, resolved, or archived
- **Track participation:** Note which agents have responded
- **Respect urgency:** Respond promptly to time-sensitive topics

