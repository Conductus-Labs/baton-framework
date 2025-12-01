/**
 * Basic Package Consumption Example
 *
 * This example demonstrates the basic usage of Baton Framework packages
 * to load and use framework components.
 */

import {
  loadAgent,
  loadPattern,
  loadKnowledge,
  loadWorkflow,
  type AgentDefinition,
  type CognitivePattern,
} from "@conductus-labs/baton-core";

/**
 * Example: Load and display an agent
 */
function exampleLoadAgent() {
  // Load agent (returns null if not found)
  const agent = loadAgent("baton-agent");

  if (!agent) {
    console.error("Agent not found");
    return;
  }

  console.log(`Agent: ${agent.agent_name}`);
  console.log(`Type: ${agent.agent_type}`);
  console.log(`Patterns: ${agent.cognitive_patterns.primary.length}`);
}

/**
 * Example: Load agent with its cognitive patterns
 */
function exampleLoadAgentWithPatterns() {
  const agent = loadAgent("baton-agent");

  if (!agent) {
    console.error("Agent not found");
    return;
  }

  console.log(`Agent: ${agent.agent_name}`);

  // Load each referenced pattern
  for (const patternRef of agent.cognitive_patterns.primary) {
    const pattern = loadPattern(patternRef.name);
    if (pattern) {
      console.log(`  Pattern: ${pattern.pattern_type}`);
      console.log(`  Temperature: ${pattern.model_parameters.temperature}`);
    }
  }
}

/**
 * Example: Load and use knowledge file
 */
function exampleLoadKnowledge() {
  const knowledge = loadKnowledge("git-cli");

  if (!knowledge) {
    console.error("Knowledge file not found");
    return;
  }

  console.log(`Knowledge: ${knowledge.name}`);
  console.log(`Content length: ${knowledge.content.length} characters`);

  // Use knowledge content
  // (e.g., for RAG, context injection, etc.)
}

/**
 * Example: Load and execute workflow
 */
function exampleLoadWorkflow() {
  const workflow = loadWorkflow("agent-initialisation");

  if (!workflow) {
    console.error("Workflow not found");
    return;
  }

  console.log(`Workflow: ${workflow.workflow_name}`);
  console.log(`Steps: ${workflow.workflow_steps.length}`);

  // Execute workflow steps
  for (const step of workflow.workflow_steps) {
    console.log(`  Step ${step.step}: ${step.name}`);
    // Execute step actions...
  }
}

/**
 * Example: Type-safe agent processing
 */
function exampleTypeSafeProcessing(agent: AgentDefinition) {
  // TypeScript knows the structure
  console.log(agent.agent_name);
  console.log(agent.cognitive_patterns.primary);
  console.log(agent.scope);
}

/**
 * Example: Error handling
 */
function exampleErrorHandling() {
  try {
    // Use strict loading for required components
    const agent = loadAgent("baton-agent");

    if (!agent) {
      throw new Error("Required agent not found");
    }

    // Process agent...
  } catch (error) {
    console.error("Failed to load agent:", error);
    // Handle error appropriately
  }
}

// Run examples
if (require.main === module) {
  console.log("=== Basic Consumption Examples ===\n");

  console.log("1. Load Agent:");
  exampleLoadAgent();

  console.log("\n2. Load Agent with Patterns:");
  exampleLoadAgentWithPatterns();

  console.log("\n3. Load Knowledge:");
  exampleLoadKnowledge();

  console.log("\n4. Load Workflow:");
  exampleLoadWorkflow();
}
