# Error: Insufficient Permission

❌ Error: Insufficient permission to execute this workflow

**Workflow:** project-initialisation  
**Agent:** {agent_short_name}

**Issue:** The agent does not have permission to execute this workflow according to the workflow permissions matrix.

**Permission Matrix:** `.baton/workflows/workflow-permissions.yml`

**Solution:**
1. Add the agent to the `allowed_agents` list for this workflow in the permission matrix
2. Or use a different agent that has permission to execute this workflow

**To grant permission:**
Edit `.baton/workflows/workflow-permissions.yml` and add `{agent_short_name}` to the `allowed_agents` array under `permissions.project-initialisation`.

