# Baton Framework

**The foundational instruction architecture for AI agent orchestration**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Baton Framework is an open-source framework that provides the foundational instruction architecture for building, configuring, and orchestrating AI agents. It combines **19 cognitive thinking patterns** with **domain specialist templates** to enable the creation of specialized agents with specific capabilities.

The framework includes:

- **Cognitive Patterns**: 19 reusable thinking frameworks that guide agent reasoning and decision-making
- **RHYTHM Method**: A project management methodology designed specifically for agents with human integration
- **CLI Tooling**: Scaffolding tools to generate framework files into your projects
- **Workflows**: Pre-defined workflows for common agent tasks and project management

## What is Baton Framework?

Baton Framework provides the building blocks for creating AI agents that can:

- **Think strategically** using cognitive patterns (strategic, critical, analytical, systems thinking, etc.)
- **Work collaboratively** with humans through structured workflows
- **Manage projects** using the RHYTHM Method (designed for agents with human integration)
- **Execute tasks** through reusable workflows and templates

### Key Components

#### 1. Cognitive Patterns (19 Patterns)

Cognitive patterns define **how agents think**. Each pattern provides:

- Thinking workflows and decision-making frameworks
- Communication patterns and quality standards
- Optimized LLM parameters for that thinking style

**Patterns include:**
- Analytical, Critical, Strategic, Systems Thinking
- Creative Problem Solving, Experimental Thinking
- Meta-Cognitive, Adaptive Thinking
- And 11 more specialized patterns

📖 **[Read the Cognitive Patterns Documentation](docs/cognitive-patterns/0-overview.md)**

#### 2. RHYTHM Method

**R**apid, **H**igh-**Y**ield, **T**oken-based, **H**uman-in-loop, **M**anagement

A project management methodology specifically designed for agents with human integration. RHYTHM Method is the **default methodology** for Baton Framework projects.

**Key Features:**
- **TEMPO**: Agents operate at fast computational speeds (hours, not weeks)
- **Flow**: Continuous execution with dependency-driven prioritization
- **Control**: Human-in-the-Loop checkpoints at critical decision points
- **Precision**: Token-based estimation replaces abstract story points

📖 **[Read the RHYTHM Method Documentation](docs/rhythm/0-overview.md)**

#### 3. CLI Tooling

The Baton CLI generates framework files into your projects, including:

- Agent definitions and configurations
- Workflow files for common tasks
- Project templates and scaffolding
- RHYTHM Method artifacts (Project Manifest, Features, Work Units, Tasks)

📖 **[CLI Documentation](docs/cli/)**

## Quick Start

### Installation

```bash
npm install -g @conductus-labs/baton-cli
```

### Initialize a Project

```bash
baton init
```

This will:
1. Guide you through project setup
2. Generate framework files into your project
3. Configure agents and workflows
4. Set up RHYTHM Method (or choose an alternative methodology)

## Documentation

### Getting Started

- **[Cognitive Patterns Overview](docs/cognitive-patterns/0-overview.md)** - Learn about the 19 thinking patterns
- **[RHYTHM Method Overview](docs/rhythm/0-overview.md)** - Understand the project management methodology
- **[CLI Documentation](docs/cli/)** - Learn how to use the CLI tooling

### Cognitive Patterns

- **[Patterns List](docs/cognitive-patterns/1-patterns-list.md)** - Detailed descriptions of all 19 patterns
- **[Using Patterns](docs/cognitive-patterns/2-using-patterns.md)** - How to select and configure patterns
- **[Pattern Combinations](docs/cognitive-patterns/3-pattern-combinations.md)** - Best practices for combining patterns

### RHYTHM Method

- **[Dictionary](docs/rhythm/1-dictionary.md)** - Key terms and concepts
- **[Principles](docs/rhythm/2-principles.md)** - Core principles of RHYTHM Method
- **[TEMPO](docs/rhythm/3-tempo.md)** - Understanding TEMPO: the speed/pace at which agents operate
- **[Workflows](docs/rhythm/4-workflows.md)** - RHYTHM Method workflows and processes

## Repository Structure

```
baton-framework/
├── docs/                        # Framework documentation
│   ├── cli/                      # CLI usage documentation
│   ├── cognitive-patterns/       # Cognitive pattern documentation
│   ├── rhythm/                   # RHYTHM Method documentation
│   └── workflows/                # Workflow documentation
│
├── src/                          # Source code organization
│   ├── core/                     # Core framework components
│   │   ├── cognitive/            # 19 cognitive pattern YAML files
│   │   └── knowledge/              # Knowledge files and best practices
│   ├── cli/                       # CLI tooling and IDE extension source
│   │   ├── agents/                # Pre-defined agent files
│   │   ├── cli-tool/               # CLI executable source code
│   │   ├── templates/             # Generation templates
│   │   └── workflows/             # Workflow files
│   └── rhythm/                    # RHYTHM Method implementation
│       ├── templates/             # RHYTHM Method templates and samples
│       └── workflows/             # RHYTHM Method workflows
│
├── scripts/                       # Build and utility scripts
└── tests/                         # Test suite
```

## Philosophy

Baton Framework is designed with these principles:

1. **Agent-First Design**: Built for agents with human integration, not the other way around
2. **Reusable Patterns**: Cognitive patterns and workflows can be combined and reused
3. **Open and Extensible**: Framework components can be customized and extended
4. **Documentation-Driven**: Comprehensive documentation for both humans and agents

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About Conductus Labs

Baton Framework is developed by **Conductus Labs Ltd**, a UK-based AI application layer company.

- **Website**: [conductuslabs.com](https://conductuslabs.com)
- **Product**: [Baton Platform](https://baton.conductuslabs.com) - AI Orchestration Platform (SaaS)

## Related Projects

- **Baton Platform**: The commercial SaaS platform built on Baton Framework
- **Baton CLI**: The command-line tooling (included in this repository)

---

**Built with ❤️ in Manchester, UK**
