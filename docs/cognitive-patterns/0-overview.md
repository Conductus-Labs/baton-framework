# Cognitive Patterns Overview

**Version:** 1.0.0  
**Last Updated:** 2025-11-22  
**Status:** Initial Draft

## Introduction

Cognitive patterns define **how agents think**. They are reusable thinking frameworks that guide agent reasoning, decision-making, and problem-solving approaches. The Baton Framework provides 19 cognitive thinking patterns that can be combined to create specialized agents with specific thinking capabilities.

## What Are Cognitive Patterns?

Cognitive patterns are structured thinking methodologies encoded as YAML files. Each pattern defines:

- **Thinking Workflow**: Step-by-step phases for approaching problems
- **Decision-Making Framework**: How to evaluate options and make decisions
- **Communication Patterns**: How to communicate findings and collaborate
- **Quality Standards**: Criteria for evaluating the quality of thinking and outputs
- **Model Parameters**: LLM configuration (temperature, top_p, repeat_penalty) optimized for that thinking style

## Key Concepts

### Pattern Types

Cognitive patterns are organized by thinking style:

- **Analytical Patterns**: Systematic, logical, evidence-based thinking
- **Strategic Patterns**: Long-term planning and systems-oriented decision making
- **Creative Patterns**: Innovative problem-solving and ideation
- **Collaborative Patterns**: Human-centered, empathetic, team-oriented thinking
- **Adaptive Patterns**: Flexible, responsive, learning-oriented approaches

### Pattern Application

Patterns are applied to agents through:

1. **Agent Definition**: Specify which patterns an agent uses
2. **Pattern Configuration**: Set temperature and other parameters per pattern
3. **Pattern Combination**: Combine multiple patterns for complex capabilities
4. **Context Integration**: Patterns guide how agents process information and make decisions

## The 19 Cognitive Patterns

The Baton Framework includes the following cognitive thinking patterns:

1. **Adaptive Thinking** - Flexible, responsive, learning-oriented approach
2. **Agile Thinking** - Iterative, incremental, responsive to change
3. **Analytical Thinking** - Systematic problem decomposition and logical reasoning
4. **Collaborative Thinking** - Team-oriented, consensus-building, human-centered
5. **Computational Thinking** - Algorithmic, data-driven, optimization-focused
6. **Creative Problem Solving** - Innovative, divergent, solution-oriented
7. **Critical Thinking** - Evidence-based evaluation, logical reasoning, assumption challenging
8. **Design Thinking** - User-centered, empathetic, iterative problem-solving
9. **Empathetic Thinking** - Human-focused, understanding-driven, relationship-oriented
10. **Ethical Thinking** - Values-based, responsible, impact-conscious decision making
11. **Experimental Thinking** - Hypothesis-driven, test-oriented, learning-focused
12. **Growth Mindset** - Learning-oriented, resilience-focused, improvement-driven
13. **Lateral Thinking** - Non-linear, creative, perspective-shifting problem-solving
14. **Lean Thinking** - Efficiency-focused, waste-elimination, value-optimization
15. **Meta-Cognitive** - Self-aware, reflective, learning-about-learning
16. **Resilience Thinking** - Adaptability-focused, recovery-oriented, stress-management
17. **Strategic Thinking** - Long-term planning and systems-oriented decision making
18. **Systematic Approach** - Methodical, structured, process-oriented thinking
19. **Systems Thinking** - Holistic, interconnected, feedback-loop-aware reasoning

## Documentation Structure

This documentation is organized to help you understand and use cognitive patterns effectively:

- **[0. Overview](0-overview.md)** - This document: Introduction and table of contents
- **[1. Patterns List](1-patterns-list.md)** - Detailed descriptions of all 19 patterns
- **[2. Using Patterns](2-using-patterns.md)** - How to select and configure patterns for agents
- **[3. Pattern Combinations](3-pattern-combinations.md)** - Best practices for combining multiple patterns

## Core Principles

### Pattern Selection

- **Match patterns to agent purpose**: Different agents need different thinking styles
- **Consider task complexity**: Complex tasks may require multiple patterns
- **Balance complementary patterns**: Combine analytical with creative, strategic with adaptive
- **Optimize for agent role**: Backend engineers need different patterns than product owners

### Pattern Configuration

- **Temperature settings**: Lower for analytical (0.3), higher for creative (0.9)
- **Pattern priority**: Primary patterns for core capabilities, secondary for support
- **Context awareness**: Patterns adapt based on task context and requirements

### Pattern Integration

- **Workflow alignment**: Patterns guide how agents approach problems
- **Decision support**: Patterns provide frameworks for evaluating options
- **Quality assurance**: Patterns include quality standards for outputs
- **Communication style**: Patterns influence how agents communicate findings

## Benefits

Using cognitive patterns provides:

- **Consistent Thinking**: Agents apply structured, proven thinking methodologies
- **Specialized Capabilities**: Different agents can have different thinking styles
- **Quality Assurance**: Built-in quality standards ensure high-quality outputs
- **Reusability**: Patterns can be shared across multiple agents
- **Optimization**: Model parameters optimized for each thinking style

## Relationship to Domain Specialists

Cognitive patterns define **how agents think**, while domain specialists define **what agents know**:

- **Cognitive Patterns** (`src/core/cognitive/`): Thinking methodologies
- **Domain Specialists** (`src/core/domain/`): Technical expertise and knowledge

Together, they create complete agent definitions that specify both thinking style and domain knowledge.

## Next Steps

- Review the [complete list of patterns](1-patterns-list.md) to understand each pattern's capabilities
- Learn [how to use patterns](2-using-patterns.md) in agent design
- Explore [pattern combinations](3-pattern-combinations.md) for complex agents

## Navigation

**Next:** [1. Patterns List](1-patterns-list.md) - Detailed descriptions of all 19 cognitive patterns
