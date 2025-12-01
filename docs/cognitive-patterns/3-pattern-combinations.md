# Pattern Combinations

**Version:** 1.0.0  
**Last Updated:** 2025-11-22  
**Status:** Initial Draft

## Overview

This document provides best practices for combining multiple cognitive patterns to create sophisticated agents with diverse thinking capabilities. Effective pattern combinations leverage complementary strengths while avoiding conflicts.

## Combination Principles

### 1. Complementary Strengths

Combine patterns that enhance each other:

- **Analytical + Creative**: Systematic analysis with innovative solutions
- **Strategic + Adaptive**: Long-term planning with flexibility
- **Critical + Collaborative**: Quality assurance with team coordination
- **Systems + Strategic**: Holistic understanding with strategic planning

### 2. Balanced Temperatures

Balance high and low temperature patterns:

- **High temperature patterns** (0.7-0.9): Creative, innovative, exploratory
- **Low temperature patterns** (0.3-0.4): Analytical, precise, logical
- **Medium temperature patterns** (0.5-0.6): Balanced, strategic, collaborative

**Best Practice:** Use low temperature for primary analysis, high temperature for creative phases.

### 3. Sequential vs. Parallel Activation

Patterns can be used:

- **Sequentially**: Different patterns for different phases (e.g., Analytical for analysis, Creative for ideation)
- **In parallel**: Multiple patterns active simultaneously (e.g., Strategic + Systems for comprehensive planning)
- **Context-dependent**: Patterns activate based on task context

### 4. Primary vs. Secondary Patterns

Structure pattern hierarchy:

- **Primary patterns** (2-4): Core thinking style, always active or frequently used
- **Secondary patterns** (2-4): Supporting capabilities, context-specific activation

## Common Pattern Combinations

### Technical Problem-Solving

**Patterns:** Analytical + Systematic + Computational + Critical

**Use Case:** Complex technical problems requiring systematic analysis

**Configuration:**

- Analytical (0.3): Problem decomposition
- Systematic (0.4): Structured approach
- Computational (0.3): Algorithmic thinking
- Critical (0.4): Quality validation

**Workflow:**

1. Analytical: Decompose problem
2. Computational: Design algorithmic solution
3. Systematic: Implement structured approach
4. Critical: Validate and review

---

### Strategic Planning

**Patterns:** Strategic + Systems Thinking + Meta-Cognitive + Adaptive

**Use Case:** Long-term strategic planning with system-wide considerations

**Configuration:**

- Strategic (0.5): Long-term planning
- Systems Thinking (0.55): Holistic understanding
- Meta-Cognitive (0.65): Process reflection
- Adaptive (0.6): Flexibility and adjustment

**Workflow:**

1. Systems Thinking: Map system and interconnections
2. Strategic: Develop long-term strategy
3. Meta-Cognitive: Reflect on planning process
4. Adaptive: Adjust based on feedback

---

### Creative Design

**Patterns:** Creative Problem Solving + Design Thinking + Lateral + Experimental

**Use Case:** Innovative design and creative problem-solving

**Configuration:**

- Creative Problem Solving (0.9): Ideation
- Design Thinking (0.8): User-centered design
- Lateral (0.85): Perspective shifts
- Experimental (0.7): Prototyping and testing

**Workflow:**

1. Lateral: Explore unconventional approaches
2. Creative: Generate multiple ideas
3. Design Thinking: Develop user-centered solutions
4. Experimental: Prototype and test

---

### Quality Assurance

**Patterns:** Critical + Analytical + Systematic + Resilience

**Use Case:** Comprehensive quality assurance and testing

**Configuration:**

- Critical (0.4): Evidence-based evaluation
- Analytical (0.3): Systematic analysis
- Systematic (0.4): Methodical testing
- Resilience (0.5): Handle edge cases

**Workflow:**

1. Analytical: Analyze requirements and code
2. Systematic: Create comprehensive test plan
3. Critical: Evaluate quality and identify issues
4. Resilience: Test edge cases and error handling

---

### Team Coordination

**Patterns:** Collaborative + Empathetic + Strategic + Adaptive

**Use Case:** Team management and stakeholder coordination

**Configuration:**

- Collaborative (0.7): Team coordination
- Empathetic (0.7): Understanding team needs
- Strategic (0.5): Long-term team planning
- Adaptive (0.6): Respond to team changes

**Workflow:**

1. Empathetic: Understand team members' needs
2. Collaborative: Build consensus and alignment
3. Strategic: Plan team development
4. Adaptive: Adjust to team dynamics

---

### Research and Analysis

**Patterns:** Analytical + Experimental + Critical + Meta-Cognitive

**Use Case:** Research, investigation, and knowledge discovery

**Configuration:**

- Analytical (0.3): Systematic analysis
- Experimental (0.6): Hypothesis testing
- Critical (0.4): Evidence evaluation
- Meta-Cognitive (0.65): Reflect on research process

**Workflow:**

1. Analytical: Gather and analyze data
2. Experimental: Formulate and test hypotheses
3. Critical: Evaluate evidence and conclusions
4. Meta-Cognitive: Reflect on research methodology

---

## Advanced Combination Strategies

### Phase-Based Combinations

Use different patterns for different phases:

**Example: Product Development**

1. **Discovery Phase**: Creative + Design Thinking + Empathetic
2. **Planning Phase**: Strategic + Systems Thinking + Analytical
3. **Development Phase**: Analytical + Systematic + Computational
4. **Review Phase**: Critical + Meta-Cognitive + Resilience

### Context-Dependent Activation

Activate patterns based on task context:

**Example: Backend Engineer**

- **Code Review**: Critical + Analytical
- **Architecture Design**: Systems Thinking + Strategic
- **Debugging**: Analytical + Computational + Resilience
- **Performance Optimization**: Computational + Lean + Analytical

### Layered Thinking

Layer patterns for depth:

**Example: Strategic Analysis**

1. **Surface Layer**: Strategic (high-level planning)
2. **Analysis Layer**: Analytical (detailed analysis)
3. **Systems Layer**: Systems Thinking (interconnections)
4. **Reflection Layer**: Meta-Cognitive (process improvement)

## Avoiding Pattern Conflicts

### Temperature Conflicts

**Problem:** Combining very high (0.9) and very low (0.3) temperature patterns simultaneously

**Solution:** Use sequentially or context-dependently, not in parallel

### Approach Conflicts

**Problem:** Combining Systematic (structured) with Lateral (non-linear) thinking simultaneously

**Solution:** Use for different phases or different aspects of the problem

### Style Conflicts

**Problem:** Combining Critical (skeptical) with Empathetic (warm) thinking simultaneously

**Solution:** Use context-dependently - Critical for evaluation, Empathetic for communication

## Pattern Combination Examples by Agent Type

### Backend Engineer

**Primary:** Analytical, Systematic, Computational  
**Secondary:** Critical, Resilience, Lean

**Rationale:** Technical problem-solving with quality assurance and efficiency focus

---

### Frontend Engineer

**Primary:** Design Thinking, Creative Problem Solving, Analytical  
**Secondary:** Empathetic, Experimental, Collaborative

**Rationale:** User-centered design with technical implementation

---

### Product Owner

**Primary:** Strategic, Collaborative, Systems Thinking  
**Secondary:** Adaptive, Empathetic, Meta-Cognitive

**Rationale:** Strategic planning with team coordination and adaptability

---

### QA Engineer

**Primary:** Critical, Analytical, Systematic  
**Secondary:** Resilience, Experimental, Meta-Cognitive

**Rationale:** Quality assurance with comprehensive testing and process improvement

---

### Solution Architect

**Primary:** Systems Thinking, Strategic, Analytical  
**Secondary:** Meta-Cognitive, Collaborative, Adaptive

**Rationale:** System-wide architecture with strategic planning and team alignment

---

## Best Practices Summary

1. **Start with 2-4 primary patterns** that define core thinking style
2. **Add 2-4 secondary patterns** for supporting capabilities
3. **Balance temperatures** - mix high and low appropriately
4. **Use complementary patterns** that enhance each other
5. **Avoid conflicting patterns** used simultaneously
6. **Consider sequential vs. parallel** activation
7. **Match patterns to agent role** and task requirements
8. **Test and refine** pattern combinations based on agent performance

## Next Steps

- Review [Patterns List](1-patterns-list.md) for detailed pattern descriptions
- See [Using Patterns](2-using-patterns.md) for configuration guidance
- Explore agent examples in the framework for real-world combinations

---

## Navigation

**Previous:** [2. Using Patterns](2-using-patterns.md) - How to select and configure patterns

---
