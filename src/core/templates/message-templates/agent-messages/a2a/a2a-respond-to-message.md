# Respond to A2A Message

**Purpose:** Template for an agent to respond to an A2A communication.

## Instructions

When you need to respond to a message in an A2A conversation, follow these steps:

### Step 1: Read the Current Conversation

**Action:** Read the A2A communication document to understand the full context.

**File Path:** `.baton/a2a-comms/{topic-id}.md`

**Review:**
- All previous messages in the conversation thread
- Original request and context
- Responses from other agents
- Current status and any decisions made

### Step 2: Prepare Your Response

**Action:** Formulate your response based on your expertise and the conversation context.

**Consider:**
- What specific input or expertise can you provide?
- Do you agree or disagree with previous responses?
- Do you need to ask clarifying questions?
- Are there concerns or suggestions you should raise?
- Can you provide additional context or references?

### Step 3: Append Your Response

**Action:** Add your response to the conversation thread in the A2A communication document.

**Response Format:**
```markdown
### Message {N}: Response from {your-agent-short-name}
**From:** {your-agent-short-name}  
**To:** {original-initiator} {and/or other-participants}  
**Timestamp:** {YYYY-MM-DD HH:MM:SS}  
**Type:** response  
**In Reply To:** Message {N-1} (if replying to specific message)

{Your response content here}

**Points Addressed:**
- {Point 1 from original request}
- {Point 2 from original request}

**Recommendations:**
- {Recommendation 1}
- {Recommendation 2}

**Questions/Concerns:**
- {Question 1 if any}
- {Concern 1 if any}

**Additional Context:**
- Related files: {list any relevant files}
- References: {list any documentation or resources}

**Next Steps:**
{What you suggest should happen next, if applicable}

---
```

### Step 4: Update Document Metadata

**Action:** Update the frontmatter to reflect your participation.

**Updates:**
- Add your agent short name to `participants` array (if not already present)
- Ensure `status` is still `active` (unless resolving)
- Update `last_updated` timestamp

### Step 5: Notify Other Participants (if needed)

**Action:** If your response requires immediate attention or changes the direction, notify other participants.

**Notification Format:**
```
📨 A2A Response Received

Topic: {Topic Title}
From: {your-agent-short-name}
File: .baton/a2a-comms/{topic-id}.md

{your-agent-short-name} has responded to the conversation.
```

## Response Types

### 1. Informational Response
Provide information, context, or expertise without requiring consensus.

### 2. Agreement Response
Express agreement with a proposal or decision. Consider using `a2a-reach-agreement.md` for formal consensus.

### 3. Disagreement Response
Express disagreement with concerns and alternative suggestions.

### 4. Clarification Request
Ask for more information or context before providing a full response.

### 5. Deferral Response
Suggest that another agent or resource would be better suited to address the topic.

## Best Practices

- **Be specific:** Address the specific points raised in the conversation
- **Provide rationale:** Explain your reasoning, not just your conclusion
- **Reference sources:** Cite relevant files, documentation, or standards
- **Suggest alternatives:** If disagreeing, propose alternatives
- **Stay on topic:** Keep responses focused on the conversation topic
- **Be constructive:** Frame disagreements as collaborative problem-solving

## Example Response

**In Reply To:** Message 1 (API endpoint design review)

**Response:**
"I've reviewed the proposed authentication endpoint design. Overall, the architecture aligns well with our existing patterns. However, I have security concerns:

**Security Recommendations:**
- Implement rate limiting on the login endpoint (currently missing)
- Add CSRF protection for the session-based flow
- Consider adding 2FA as an optional enhancement

**Architectural Alignment:**
- ✅ Consistent with our REST API patterns
- ✅ Proper error handling structure
- ⚠️ Consider extracting auth logic to a separate service module

**Performance Considerations:**
- The current implementation should handle expected load
- Consider caching for token validation if traffic increases

I can provide a detailed security review document if needed."

