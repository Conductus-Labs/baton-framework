/**
 * Full Integration Example
 *
 * This example demonstrates a complete integration scenario,
 * similar to what RHYTHM Board would implement.
 */

import {
  loadAgent,
  loadPattern,
  loadWorkflow,
  getBatonFolderPath,
  type AgentDefinition,
  type CognitivePattern,
  type WorkflowDefinition,
} from "@conductus-labs/baton-core";
import { existsSync } from "fs";
import { join } from "path";

/**
 * Framework Manager Class
 *
 * Manages framework components for an application like RHYTHM Board
 */
export class BatonFrameworkManager {
  private agentCache = new Map<string, AgentDefinition>();
  private patternCache = new Map<string, CognitivePattern>();
  private workflowCache = new Map<string, WorkflowDefinition>();

  /**
   * Initialize framework manager
   */
  initialize(): boolean {
    // Verify framework files exist
    const batonPath = getBatonFolderPath();
    if (!batonPath || !existsSync(batonPath)) {
      console.error("Framework files not found. Please install packages.");
      return false;
    }

    console.log("Framework initialized successfully");
    return true;
  }

  /**
   * Get agent (with caching)
   */
  getAgent(agentName: string): AgentDefinition | null {
    if (this.agentCache.has(agentName)) {
      return this.agentCache.get(agentName)!;
    }

    const agent = loadAgent(agentName);
    if (agent) {
      this.agentCache.set(agentName, agent);
    }

    return agent;
  }

  /**
   * Get pattern (with caching)
   */
  getPattern(patternName: string): CognitivePattern | null {
    if (this.patternCache.has(patternName)) {
      return this.patternCache.get(patternName)!;
    }

    const pattern = loadPattern(patternName);
    if (pattern) {
      this.patternCache.set(patternName, pattern);
    }

    return pattern;
  }

  /**
   * Get workflow (with caching)
   */
  getWorkflow(workflowName: string): WorkflowDefinition | null {
    if (this.workflowCache.has(workflowName)) {
      return this.workflowCache.get(workflowName)!;
    }

    const workflow = loadWorkflow(workflowName);
    if (workflow) {
      this.workflowCache.set(workflowName, workflow);
    }

    return workflow;
  }

  /**
   * Get agent with all its patterns loaded
   */
  getAgentWithPatterns(agentName: string): {
    agent: AgentDefinition;
    patterns: CognitivePattern[];
  } | null {
    const agent = this.getAgent(agentName);
    if (!agent) {
      return null;
    }

    const patterns: CognitivePattern[] = [];
    for (const patternRef of agent.cognitive_patterns.primary) {
      const pattern = this.getPattern(patternRef.name);
      if (pattern) {
        patterns.push(pattern);
      }
    }

    return { agent, patterns };
  }

  /**
   * Execute workflow
   */
  executeWorkflow(workflowName: string, _context: unknown): boolean {
    const workflow = this.getWorkflow(workflowName);
    if (!workflow) {
      console.error(`Workflow not found: ${workflowName}`);
      return false;
    }

    console.log(`Executing workflow: ${workflow.workflow_name}`);

    for (const step of workflow.workflow_steps) {
      console.log(`  Executing step ${step.step}: ${step.name}`);

      // Execute step actions
      for (const action of step.actions) {
        // Process action...
        console.log(`    Action: ${action}`);
      }

      // Handle sub-flows if present
      if (step.sub_flows) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _subFlow of step.sub_flows) {
          // Load and execute sub-flow
          // ...
        }
      }
    }

    return true;
  }

  /**
   * List all available agents
   */
  listAgents(): string[] {
    const batonPath = getBatonFolderPath();
    if (!batonPath) {
      return [];
    }

    // In a real implementation, you'd read the directory
    // For now, return known agents
    return [
      "baton-agent",
      "cli-engineer-agent",
      "devops-engineer-agent",
      // ... etc
    ];
  }

  /**
   * Verify framework installation
   */
  verifyInstallation(): {
    valid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    const batonPath = getBatonFolderPath();

    if (!batonPath) {
      issues.push("baton/ folder not found");
      return { valid: false, issues };
    }

    // Verify required directories exist
    const requiredDirs = ["agents", "cognitive", "knowledge", "workflows"];
    for (const dir of requiredDirs) {
      const dirPath = join(batonPath, dir);
      if (!existsSync(dirPath)) {
        issues.push(`Missing directory: baton/${dir}/`);
      }
    }

    // Verify core files exist
    const coreManifest = join(
      batonPath,
      "core",
      "manifest",
      "framework-manifest.yml"
    );
    if (!existsSync(coreManifest)) {
      issues.push("Missing core manifest file");
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }
}

/**
 * Example usage
 */
function exampleUsage() {
  const manager = new BatonFrameworkManager();

  // Initialize
  if (!manager.initialize()) {
    console.error("Failed to initialize framework");
    return;
  }

  // Verify installation
  const verification = manager.verifyInstallation();
  if (!verification.valid) {
    console.error("Installation issues:", verification.issues);
    return;
  }

  // Get agent with patterns
  const agentData = manager.getAgentWithPatterns("baton-agent");
  if (agentData) {
    console.log(`Agent: ${agentData.agent.agent_name}`);
    console.log(`Patterns loaded: ${agentData.patterns.length}`);
  }

  // Execute workflow
  manager.executeWorkflow("agent-initialisation", {});
}

// Export for use in applications
export { BatonFrameworkManager };

// Run example if executed directly
if (require.main === module) {
  exampleUsage();
}
