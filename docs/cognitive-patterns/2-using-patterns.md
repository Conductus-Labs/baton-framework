# Using Cognitive Patterns

**Version:** 1.0.0  
**Last Updated:** 2025-11-22  
**Status:** Initial Draft

## Overview

This document explains how to select, configure, and use cognitive patterns when designing agents in the Baton Framework. Cognitive patterns define how agents think, and proper pattern selection is crucial for creating effective agents.

## Pattern Selection Process

### Step 1: Understand Agent Purpose

First, clearly define what the agent needs to accomplish:

- **What is the agent's primary role?** (e.g., Backend Engineer, Product Owner, QA Engineer)
- **What types of tasks will it perform?** (e.g., code review, strategic planning, creative design)
- **What thinking style is required?** (e.g., analytical, creative, strategic, collaborative)

### Step 2: Identify Required Thinking Capabilities

Based on the agent's purpose, identify the thinking capabilities needed:

- **Analytical capabilities**: For systematic problem-solving, research, data analysis
- **Creative capabilities**: For brainstorming, design, innovation
- **Strategic capabilities**: For long-term planning, business strategy
- **Collaborative capabilities**: For team coordination, stakeholder management
- **Adaptive capabilities**: For handling change, learning, flexibility

### Step 3: Select Primary Patterns

Choose 2-4 primary patterns that define the agent's core thinking style:

**Examples:**

- **Backend Engineer**: Analytical, Systematic, Computational
- **Product Owner**: Strategic, Collaborative, Systems Thinking
- **Designer**: Creative Problem Solving, Design Thinking, Empathetic
- **QA Engineer**: Critical, Analytical, Systematic

### Step 4: Select Secondary Patterns

Choose 2-4 secondary patterns that support the primary patterns:

**Examples:**

- **Backend Engineer**: Add Critical (for code review), Resilience (for handling errors)
- **Product Owner**: Add Adaptive (for changing requirements), Meta-Cognitive (for process improvement)
- **Designer**: Add Experimental (for prototyping), Lateral (for creative solutions)

### Step 5: Configure Pattern Parameters

Set temperature and other parameters for each pattern:

- **Low temperature (0.3-0.4)**: For analytical, critical, systematic patterns
- **Medium temperature (0.5-0.6)**: For strategic, collaborative, balanced patterns
- **High temperature (0.7-0.9)**: For creative, innovative, experimental patterns

## Pattern Configuration

### Temperature Settings

Temperature controls the creativity vs. precision balance:

| Pattern Type | Temperature Range | Use Case |
| ----------- | ----------------- | -------- |
| Analytical | 0.3 | Precise, logical, evidence-based |
| Critical | 0.4 | Objective, skeptical, evaluative |
| Strategic | 0.5 | Balanced, comprehensive, long-term |
| Collaborative | 0.6-0.7 | Warm, human-focused, consensus-building |
| Creative | 0.8-0.9 | High creativity, divergent thinking |

### Pattern Priority

Define primary vs. secondary patterns:

- **Primary patterns**: Core thinking style, used most frequently
- **Secondary patterns**: Supporting capabilities, used when needed

### Pattern Application Context

Specify when each pattern applies:

- **Always active**: Core patterns that guide all thinking
- **Context-specific**: Patterns that activate based on task type
- **On-demand**: Patterns that can be explicitly invoked

## Example Agent Configurations

### Example 1: Backend Engineer Agent

```yaml
cognitive_patterns:
  primary:
    - pattern: analytical-thinking
      temperature: 0.3
      application: Code analysis, problem decomposition, debugging
    - pattern: systematic-approach
      temperature: 0.4
      application: Structured coding, methodical problem-solving
    - pattern: computational-thinking
      temperature: 0.3
      application: Algorithm design, optimization, performance analysis
  
  secondary:
    - pattern: critical-thinking
      temperature: 0.4
      application: Code review, quality assurance
    - pattern: resilience-thinking
      temperature: 0.5
      application: Error handling, recovery strategies
```

### Example 2: Product Owner Agent

```yaml
cognitive_patterns:
  primary:
    - pattern: strategic-thinking
      temperature: 0.5
      application: Long-term planning, roadmap development
    - pattern: collaborative-thinking
      temperature: 0.7
      application: Stakeholder management, team coordination
    - pattern: systems-thinking
      temperature: 0.55
      application: Understanding product ecosystem, dependencies
  
  secondary:
    - pattern: adaptive-thinking
      temperature: 0.6
      application: Responding to changing requirements
    - pattern: empathetic-thinking
      temperature: 0.7
      application: Understanding user needs, stakeholder concerns
```

### Example 3: Creative Designer Agent

```yaml
cognitive_patterns:
  primary:
    - pattern: creative-problem-solving
      temperature: 0.9
      application: Ideation, brainstorming, innovative solutions
    - pattern: design-thinking
      temperature: 0.8
      application: User-centered design, prototyping
    - pattern: lateral-thinking
      temperature: 0.85
      application: Creative problem-solving, perspective shifts
  
  secondary:
    - pattern: experimental-thinking
      temperature: 0.7
      application: Prototyping, testing ideas
    - pattern: empathetic-thinking
      temperature: 0.7
      application: Understanding user emotions and needs
```

## Best Practices

### 1. Balance Complementary Patterns

Combine patterns that complement each other:

- **Analytical + Creative**: For problems requiring both analysis and innovation
- **Strategic + Adaptive**: For long-term planning with flexibility
- **Critical + Collaborative**: For quality assurance with team coordination

### 2. Avoid Conflicting Patterns

Be careful when combining patterns with conflicting approaches:

- **High + Low Temperature**: Can work if used contextually, but may cause confusion if always active
- **Systematic + Lateral**: Can complement if used for different phases, but may conflict if simultaneous

### 3. Match Patterns to Task Types

Different tasks require different thinking styles:

- **Research tasks**: Analytical, Critical, Experimental
- **Design tasks**: Creative, Design Thinking, Lateral
- **Planning tasks**: Strategic, Systems Thinking, Meta-Cognitive
- **Coordination tasks**: Collaborative, Empathetic, Adaptive

### 4. Consider Pattern Interactions

Some patterns naturally work well together:

- **Systems Thinking + Strategic Thinking**: Both consider long-term and interconnected effects
- **Analytical + Critical**: Both emphasize evidence-based, logical reasoning
- **Creative + Experimental**: Both explore novel approaches and test ideas

### 5. Optimize for Agent Role

Tailor patterns to the specific agent role:

- **Technical roles**: Emphasize Analytical, Computational, Systematic
- **Business roles**: Emphasize Strategic, Collaborative, Systems Thinking
- **Creative roles**: Emphasize Creative, Design Thinking, Lateral
- **Support roles**: Emphasize Empathetic, Collaborative, Adaptive

## Pattern File Structure

Each pattern is defined in a YAML file with the following structure:

```yaml
version: 1.0.0
pattern_type: cognitive_thinking_pattern
description: "Pattern description"

model_parameters:
  temperature: 0.5
  top_p: 0.8
  repeat_penalty: 1.18

cognitive_identity:
  thinking_pattern: "Pattern name"
  approach_methodology: "Methodology description"
  reasoning_style: "Reasoning style description"
  problem_solving_approach: "Problem-solving approach"

thinking_workflow:
  phase_1:
    - Step 1
    - Step 2
  phase_2:
    - Step 1
    - Step 2

decision_making_framework:
  evaluation_criteria:
    - Criterion 1
    - Criterion 2

communication_patterns:
  style_1:
    - Characteristic 1
    - Characteristic 2

quality_standards:
  standard_1:
    - Requirement 1
    - Requirement 2
```

## Pattern Customization

You can customize patterns by:

1. **Adjusting temperature**: Modify model parameters for specific use cases
2. **Selecting specific phases**: Use only relevant workflow phases
3. **Combining patterns**: Create composite thinking styles
4. **Context-specific activation**: Activate patterns based on task context

## Next Steps

- Review [Pattern Combinations](3-pattern-combinations.md) for advanced usage
- Explore the [Patterns List](1-patterns-list.md) for detailed pattern descriptions
- See agent examples in the framework for real-world configurations

---

## Navigation

**Previous:** [1. Patterns List](1-patterns-list.md) - Detailed descriptions of all 19 patterns  
**Next:** [3. Pattern Combinations](3-pattern-combinations.md) - Best practices for combining patterns

---

