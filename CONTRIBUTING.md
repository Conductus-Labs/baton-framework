# Contributing to Baton Framework

Thank you for your interest in contributing to Baton Framework! This document provides guidelines and instructions for contributing to the framework.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Package Structure](#package-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Adding New Components](#adding-new-components)
- [Versioning Process](#versioning-process)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setting Up Development Environment

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/your-username/baton-framework.git
   cd baton-framework
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build all packages:**

   ```bash
   npm run build
   ```

4. **Run tests:**

   ```bash
   npm run test
   ```

## Package Structure

Baton Framework is organized as a monorepo with the following packages:

- **@conductus-labs/baton-core** - Core types, utilities, and validation
- **@conductus-labs/baton-agents** - Agent definitions
- **@conductus-labs/baton-cognitive-patterns** - Cognitive thinking patterns
- **@conductus-labs/baton-knowledge** - Knowledge files
- **@conductus-labs/baton-workflows** - Workflow definitions

Each package is located in `packages/{package-name}/` and has its own:

- `package.json` - Package configuration
- `tsconfig.json` - TypeScript configuration
- `src/` - Source code
- `README.md` - Package documentation

## Contributing Guidelines

### General Guidelines

1. **Follow existing code style** - Maintain consistency with existing code
2. **Write tests** - Add tests for new features and bug fixes
3. **Update documentation** - Keep documentation up to date
4. **Use semantic versioning** - Follow versioning guidelines
5. **Write clear commit messages** - Use conventional commit format

### Code Style

- Use TypeScript for all code
- Follow existing TypeScript configuration
- Use ESLint for linting (when configured)
- Format code consistently

### Commit Messages

Use conventional commit format:

```text
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```text
feat(agents): add new marketing-expert-agent
fix(core): fix validation bug in agent-validator
docs(readme): update installation instructions
```

## Adding New Components

### Adding a New Agent

1. **Create agent definition file:**

   ```bash
   # Location: packages/agents/src/agents/{agent-name}-agent.md
   ```

2. **Follow agent template structure:**

   ```yaml
   ---
   version: 1.0.0
   agent_name: {agent-name}-agent
   agent_short_name: {agent-short-name}
   agent_type: {agent-type}
   created: {YYYY-MM-DD}
   last_updated: {YYYY-MM-DD}
   cognitive_patterns:
     primary:
       - name: {pattern-name}
         path: .baton/cognitive/{pattern-name}.yml
     secondary:
       - name: {pattern-name}
         path: .baton/cognitive/{pattern-name}.yml
   ---

   # Agent Name

   ## Agent Identity & Purpose
   ...
   ```

3. **Update package version** (minor bump for new agent)

4. **Add tests** (if applicable)

5. **Update documentation**

### Adding a New Cognitive Pattern

1. **Create pattern file:**

   ```bash
   # Location: packages/cognitive-patterns/src/patterns/{pattern-name}.yml
   ```

2. **Follow pattern template structure:**

   ```yaml
   version: 1.0.0
   pattern_type: cognitive_thinking_pattern
   created: "YYYY-MM-DD"
   description: "Pattern description"

   model_parameters:
     temperature: 0.5
     top_p: 0.8
     repeat_penalty: 1.1

   pattern_metadata:
     reasoning_depth: moderate
     context_window: standard
     response_style: balanced

   cognitive_identity:
     thinking_pattern: Pattern Name
     approach_methodology: Step → Step → Step
     reasoning_style: Style description
     problem_solving_approach: "Approach description"

   thinking_workflow:
     phase_name:
       - Action 1
       - Action 2
   ```

3. **Update package version** (minor bump for new pattern)

4. **Add tests** (if applicable)

5. **Update documentation**

### Adding a New Workflow

1. **Create workflow file:**

   ```bash
   # Location: packages/workflows/src/workflows/{workflow-name}.yml
   # Or for sub-flows: packages/workflows/src/workflows/sub-flows/sub-flow-{name}.yml
   ```

2. **Follow workflow template structure:**

   ```yaml
   version: 1.0.0
   workflow_name: { workflow-name }
   purpose: Workflow purpose description
   created: YYYY-MM-DD

   prerequisites:
     - Prerequisite 1
     - Prerequisite 2

   parameters:
     param_name: { Description }

   workflow_steps:
     - step: 1
       name: Step Name
       description: Step description
       actions:
         - Action 1
         - Action 2
   ```

3. **Update package version** (minor bump for new workflow)

4. **Add tests** (if applicable)

5. **Update documentation**

### Adding a New Knowledge File

1. **Create knowledge file:**

   ```bash
   # Location: packages/knowledge/src/knowledge/{category}/{file-name}.md
   ```

2. **Follow knowledge file structure:**

   ```markdown
   ---
   version: 1.0.0
   name: { knowledge-name }
   category: { category }
   description: Knowledge description
   created: YYYY-MM-DD
   last_updated: YYYY-MM-DD
   tags:
     - tag1
     - tag2
   ---

   # Knowledge Title

   [Knowledge content...]
   ```

3. **Update package version** (minor bump for new knowledge file)

4. **Add tests** (if applicable)

5. **Update documentation**

## Versioning Process

Baton Framework uses [Semantic Versioning](https://semver.org/) (SemVer):

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Patch** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

### Version Bump Rules

**For New Components:**

- New agent → Minor bump in `@conductus-labs/baton-agents`
- New pattern → Minor bump in `@conductus-labs/baton-cognitive-patterns`
- New workflow → Minor bump in `@conductus-labs/baton-workflows`
- New knowledge file → Minor bump in `@conductus-labs/baton-knowledge`

**For Updates:**

- Content updates → Patch bump
- Bug fixes → Patch bump
- Documentation updates → Patch bump

**For Breaking Changes:**

- Structure changes → Major bump
- API changes → Major bump
- Required field changes → Major bump

See [Versioning Strategy](.baton/notes/repo-restructure/versioning-strategy.md) for detailed guidelines.

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Make your changes
- Write or update tests
- Update documentation

### 3. Test Your Changes

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/core && npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage
npm run test:coverage
```

### 4. Build Your Changes

```bash
# Build all packages
npm run build

# Build specific package
cd packages/core && npm run build
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat(scope): your commit message"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/core && npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

- Use Vitest for testing
- Place tests in `tests/` directory (package-level) or `src/**/*.test.ts`
- Write tests for:
  - New features
  - Bug fixes
  - Edge cases
  - Error handling

### Test Coverage

- Aim for good test coverage
- Focus on critical paths
- Test both success and error cases

## Documentation

### Updating Documentation

1. **Package READMEs** - Update package-specific documentation
2. **Root README** - Update main README for significant changes
3. **Migration Guide** - Update if there are breaking changes
4. **Code Comments** - Add JSDoc comments for public APIs

### Documentation Standards

- Use clear, concise language
- Include code examples
- Keep documentation up to date
- Follow existing documentation style

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] All packages build successfully
- [ ] Documentation is updated
- [ ] Commit messages follow conventional format

### Pull Request Template

When creating a pull request, include:

1. **Description** - What changes are made and why
2. **Type** - Feature, bug fix, documentation, etc.
3. **Testing** - How to test the changes
4. **Breaking Changes** - List any breaking changes (if any)
5. **Related Issues** - Link to related issues (if any)

### Review Process

1. **Automated Checks** - CI/CD runs tests and builds
2. **Code Review** - Maintainers review the code
3. **Feedback** - Address any feedback
4. **Approval** - Once approved, changes are merged

### After Merging

- Changes are merged to `dev` branch
- CI/CD runs tests and builds
- Changes are eventually merged to `main` branch
- New versions are published when ready

## Package-Specific Guidelines

### Core Package

- Focus on types, validation, and utilities
- Keep dependencies minimal
- Ensure backward compatibility
- Document all public APIs

### Agents Package

- Follow agent definition template
- Ensure cognitive patterns are valid
- Document agent capabilities
- Test agent loading

### Cognitive Patterns Package

- Follow pattern template structure
- Ensure model parameters are reasonable
- Document thinking workflows
- Test pattern loading

### Knowledge Package

- Organize by category
- Use clear, structured markdown
- Include examples where applicable
- Test knowledge file loading

### Workflows Package

- Follow workflow template structure
- Ensure steps are clear and actionable
- Document prerequisites and parameters
- Test workflow loading

## Getting Help

If you need help:

1. Check existing documentation
2. Review package READMEs
3. Check existing issues and pull requests
4. Open a new issue for questions
5. Ask in discussions (if available)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Baton Framework! 🎉
