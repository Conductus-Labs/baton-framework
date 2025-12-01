# @conductus-labs/baton-cognitive-patterns

**Baton Framework cognitive thinking patterns**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-cognitive-patterns.svg)](https://www.npmjs.com/package/@conductus-labs/baton-cognitive-patterns)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-cognitive-patterns` provides 19 cognitive thinking patterns that define how AI agents think, reason, and make decisions. Each pattern includes:

- Thinking workflows and decision-making frameworks
- Communication patterns and quality standards
- Optimized LLM parameters (temperature, top_p, repeat_penalty)
- Cognitive identity and reasoning style

## Installation

```bash
npm install @conductus-labs/baton-cognitive-patterns
```

**Note:** This package depends on `@conductus-labs/baton-core`. Install it first:

```bash
npm install @conductus-labs/baton-core @conductus-labs/baton-cognitive-patterns
```

## Available Patterns

### Analytical & Critical Thinking

- **analytical-thinking** - Systematic problem decomposition and logical reasoning
- **critical-thinking** - Objective analysis and evaluation
- **computational-thinking** - Algorithmic problem-solving approaches

### Strategic & Systems Thinking

- **strategic-thinking** - Long-term planning and strategic decision-making
- **systems-thinking** - Understanding interconnected systems and relationships
- **meta-cognitive** - Thinking about thinking and self-awareness

### Creative & Experimental

- **creative-problem-solving** - Innovative and creative approaches
- **experimental-thinking** - Hypothesis-driven experimentation
- **lateral-thinking** - Unconventional problem-solving approaches

### Design & User-Centered

- **design-thinking** - Human-centered problem solving and innovation
- **empathetic-thinking** - Understanding, perspective-taking, and human connection

### Process & Methodology

- **systematic-approach** - Structured, methodical, and process-driven thinking
- **agile-thinking** - Iterative, adaptive, and collaborative approaches
- **lean-thinking** - Efficiency-focused and waste-elimination approaches

### Collaboration & Growth

- **collaborative-thinking** - Team-oriented, consensus-building thinking
- **growth-mindset** - Continuous learning and improvement mindset
- **resilience-thinking** - Adaptability and resilience in challenging situations

### Ethical & Adaptive

- **ethical-thinking** - Ethical reasoning and moral decision-making
- **adaptive-thinking** - Flexibility and adaptation to changing circumstances

## Usage

### Accessing Pattern Files

After installation, pattern files are available in the `baton/cognitive/` folder:

```
your-project/
└── baton/
    └── cognitive/
        ├── analytical-thinking.yml
        ├── strategic-thinking.yml
        ├── design-thinking.yml
        └── ... (all 19 patterns)
```

### Loading Cognitive Patterns

Use `@conductus-labs/baton-core` utilities to load pattern definitions:

```typescript
import { loadPattern, loadPatternStrict } from "@conductus-labs/baton-core";
import type { CognitivePattern } from "@conductus-labs/baton-cognitive-patterns";

// Safe loading (returns null if invalid)
const pattern = loadPattern("analytical-thinking");
if (pattern) {
  console.log(pattern.cognitive_identity.thinking_pattern);
  console.log(pattern.model_parameters.temperature);
}

// Strict loading (throws if invalid)
try {
  const pattern = loadPatternStrict("analytical-thinking");
  // TypeScript knows pattern is CognitivePattern
} catch (error) {
  console.error("Failed to load pattern:", error);
}
```

### Using Pattern Types

Import TypeScript types for type safety:

```typescript
import type {
  CognitivePattern,
  ModelParameters,
  PatternMetadata,
  CognitiveIdentity,
  ThinkingWorkflow,
} from "@conductus-labs/baton-cognitive-patterns";

function processPattern(pattern: CognitivePattern) {
  console.log(`Pattern: ${pattern.cognitive_identity.thinking_pattern}`);
  console.log(`Temperature: ${pattern.model_parameters.temperature}`);
  console.log(
    `Methodology: ${pattern.cognitive_identity.approach_methodology}`
  );
}
```

### Reading Pattern Files Directly

You can also read pattern files directly from the file system:

```typescript
import { readFileSync } from "fs";
import { join } from "path";
import { loadYamlFile } from "@conductus-labs/baton-core";

const patternPath = join(
  process.cwd(),
  "baton",
  "cognitive",
  "analytical-thinking.yml"
);
const pattern = loadYamlFile(patternPath);

console.log(pattern.cognitive_identity.thinking_pattern);
console.log(pattern.model_parameters);
```

## Pattern Structure

Each cognitive pattern file follows this structure:

```yaml
version: 1.0.0
pattern_type: cognitive_thinking_pattern
created: "2025-01-25"
description: "Pattern description"

# Core LLM Parameters (sent to LLM)
model_parameters:
  temperature: 0.3
  top_p: 0.7
  repeat_penalty: 1.2

# Metadata for orchestration/documentation (NOT sent to LLM)
pattern_metadata:
  reasoning_depth: deep
  context_window: extended
  response_style: systematic

cognitive_identity:
  thinking_pattern: Analytical and Systematic
  approach_methodology: Decompose → Analyze → Synthesize → Validate
  reasoning_style: Logical, evidence-based, methodical
  problem_solving_approach: "Break down complex problems into manageable components"

thinking_workflow:
  initial_analysis:
    - Identify the core problem or objective
    - Gather available information and constraints
  decomposition_phase:
    - Break down the problem into smaller, manageable parts
    - Identify dependencies and relationships

decision_making_framework:
  information_gathering:
    - Collect relevant data and evidence
  evaluation_criteria:
    - Define clear evaluation metrics

communication_patterns:
  information_sharing:
    - Present findings in logical, structured format

quality_standards:
  analytical_rigor:
    - Thorough examination of all relevant factors
```

## Model Parameters

Each pattern includes optimized LLM parameters:

- **temperature** (0.0-1.0): Controls randomness and creativity
- **top_p** (0.0-1.0): Controls diversity via nucleus sampling
- **repeat_penalty** (1.0+): Reduces repetition

**Example Parameter Ranges:**

- Analytical thinking: `temperature: 0.3` (low, focused)
- Creative thinking: `temperature: 0.8` (high, creative)
- Strategic thinking: `temperature: 0.5` (balanced)

## API Reference

### Types

Re-exported from `@conductus-labs/baton-core`:

- `CognitivePattern` - Complete pattern definition structure
- `ModelParameters` - LLM parameter configuration
- `PatternMetadata` - Pattern metadata
- `CognitiveIdentity` - Cognitive identity and reasoning style
- `ThinkingWorkflow` - Thinking workflow steps
- `DecisionMakingFramework` - Decision-making framework
- `CommunicationPatterns` - Communication patterns
- `QualityStandards` - Quality standards

### Pattern Files

Pattern definition files are included in the package and available at:

- Package location: `node_modules/@conductus-labs/baton-cognitive-patterns/src/patterns/*.yml`
- Project location (after install): `baton/cognitive/*.yml`

## Package Structure

```
packages/cognitive-patterns/
├── src/
│   ├── patterns/            # 19 cognitive pattern files
│   │   ├── analytical-thinking.yml
│   │   ├── strategic-thinking.yml
│   │   ├── design-thinking.yml
│   │   └── ... (all patterns)
│   ├── types.ts             # Type re-exports
│   └── index.ts             # Main export
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `@conductus-labs/baton-core` - Core types and utilities

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0 → 2.0.0): Breaking changes to pattern structure
- **Minor** (1.0.0 → 1.1.0): New patterns added
- **Patch** (1.0.0 → 1.0.1): Updates to existing patterns, bug fixes

## License

MIT

## Related Packages

- `@conductus-labs/baton-core` - Core types and utilities (required)
- `@conductus-labs/baton-agents` - Agents that use these patterns
- `@conductus-labs/baton-workflows` - Workflows that reference patterns

## Documentation

For more information about cognitive patterns:

- **[Cognitive Patterns Overview](../../docs/cognitive-patterns/0-overview.md)**
- **[Patterns List](../../docs/cognitive-patterns/1-patterns-list.md)**
- **[Using Patterns](../../docs/cognitive-patterns/2-using-patterns.md)**
- **[Pattern Combinations](../../docs/cognitive-patterns/3-pattern-combinations.md)**
