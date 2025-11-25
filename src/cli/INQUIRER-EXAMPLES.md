# Inquirer Examples for Baton CLI

This document shows examples of how to use inquirer for the `baton init` command.

## Installation

```bash
npm install inquirer
npm install --save-dev @types/inquirer
```

## Common Patterns

### 1. Single Selection (Choose One)

```typescript
import inquirer from 'inquirer';

const answer = await inquirer.prompt([
  {
    type: 'list',
    name: 'platform',
    message: 'Select your GenAI platform:',
    choices: [
      { name: 'Cursor', value: 'cursor' },
      { name: 'Claude Desktop', value: 'claude' },
      { name: 'Gemini Desktop', value: 'gemini' }
    ]
  }
]);

console.log(`Selected: ${answer.platform}`);
```

### 2. Multiple Selection (Choose Many)

```typescript
const answer = await inquirer.prompt([
  {
    type: 'checkbox',
    name: 'agents',
    message: 'Select agents to install:',
    choices: [
      { name: 'Baton Agent', value: 'baton-agent', checked: true },
      { name: 'CLI Engineer', value: 'cli-engineer' },
      { name: 'Backend Engineer', value: 'backend-engineer' }
    ]
  }
]);

console.log(`Selected agents: ${answer.agents.join(', ')}`);
```

### 3. Confirmation

```typescript
const answer = await inquirer.prompt([
  {
    type: 'confirm',
    name: 'proceed',
    message: 'Do you want to proceed?',
    default: true
  }
]);

if (answer.proceed) {
  // Continue
}
```

### 4. Text Input

```typescript
const answer = await inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter project name:',
    default: 'my-project',
    validate: (input: string) => {
      if (!input.trim()) {
        return 'Project name cannot be empty';
      }
      return true;
    }
  }
]);
```

### 5. Sequential Prompts

```typescript
const answers = await inquirer.prompt([
  {
    type: 'list',
    name: 'platform',
    message: 'Select platform:',
    choices: ['cursor', 'claude', 'gemini']
  },
  {
    type: 'checkbox',
    name: 'agents',
    message: 'Select agents:',
    choices: ['baton-agent', 'cli-engineer']
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Proceed with installation?',
    default: true
  }
]);
```

## Example for baton init

```typescript
async function runInit() {
  // Step 1: Select platform
  const { platform } = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select your GenAI platform:',
      choices: [
        { name: 'Cursor', value: 'cursor' },
        { name: 'Claude Desktop', value: 'claude' },
        { name: 'Gemini Desktop', value: 'gemini' }
      ]
    }
  ]);

  // Step 2: Select additional agents (optional)
  const { agents } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'agents',
      message: 'Select additional agents to install (baton-agent is mandatory):',
      choices: [
        { name: 'CLI Engineer', value: 'cli-engineer' },
        { name: 'Backend Engineer', value: 'backend-engineer' }
      ]
    }
  ]);

  // Step 3: Confirm
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with initialization?',
      default: true
    }
  ]);

  if (confirm) {
    // Proceed with installation
    console.log(`Installing for platform: ${platform}`);
    console.log(`Additional agents: ${agents.join(', ')}`);
  }
}
```

## Features

- **Arrow keys** for navigation
- **Space** to toggle checkboxes
- **Enter** to confirm
- **Type** to filter/search in lists
- **Validation** support
- **Default values**
- **Conditional prompts** (show based on previous answers)

