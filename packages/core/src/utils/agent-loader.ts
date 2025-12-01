import { readFileSync, existsSync } from "fs";
import { parseYamlFrontmatter } from "./file-parser.js";
import {
  validateAgent,
  isAgentDefinition,
} from "../validation/agent-validator.js";
import { getFrameworkFilePath } from "./path-resolver.js";
import type { AgentDefinition } from "../types/agent.js";

/**
 * Load and parse an agent definition file from baton/ folder
 * @param agentName - Agent short name (e.g., "baton-agent")
 * @param startPath - Optional starting path for project root detection
 */
export function loadAgent(
  agentName: string,
  startPath?: string
): AgentDefinition | null {
  const filePath = getFrameworkFilePath("agents", `${agentName}.md`, startPath);
  if (!filePath || !existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, "utf-8");
    const parsed = parseYamlFrontmatter(content);

    if (!parsed) {
      return null;
    }

    const agent = parsed.frontmatter as any;
    if (validateAgent(agent)) {
      return agent;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Load agent from explicit file path (for backward compatibility)
 */
export function loadAgentFromPath(filePath: string): AgentDefinition | null {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, "utf-8");
    const parsed = parseYamlFrontmatter(content);

    if (!parsed) {
      return null;
    }

    const agent = parsed.frontmatter as any;
    if (validateAgent(agent)) {
      return agent;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Load agent definition with validation
 * @param agentName - Agent short name (e.g., "baton-agent")
 * @param startPath - Optional starting path for project root detection
 * @throws Error if agent file is invalid
 */
export function loadAgentStrict(
  agentName: string,
  startPath?: string
): AgentDefinition {
  const agent = loadAgent(agentName, startPath);
  if (!agent) {
    throw new Error(
      `Invalid or missing agent file: ${agentName}.md (checked in baton/agents/)`
    );
  }
  return agent;
}

/**
 * Load agent from explicit file path with validation (for backward compatibility)
 * @throws Error if agent file is invalid
 */
export function loadAgentFromPathStrict(filePath: string): AgentDefinition {
  const agent = loadAgentFromPath(filePath);
  if (!agent) {
    throw new Error(`Invalid or missing agent file: ${filePath}`);
  }
  return agent;
}
