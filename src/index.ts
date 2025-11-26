#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, existsSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cwd } from 'process';

// Import utility functions
import { getAgentVersion, compareVersions, getFileVersion } from './utils.js';

// Import helper functions
import { loadMandatoryItems, listCategoryItems, getWorkflowFiles } from './helpers.js';

// Import command handlers
import { initCommand } from './commands/init.js';
import { listAgents, addAgent, removeAgent, updateAgent } from './commands/agent.js';
import { listWorkflows, addWorkflow, removeWorkflow } from './commands/workflow.js';
import { listKnowledge, addKnowledge, removeKnowledge } from './commands/knowledge.js';
import { updateCommand, checkForUpdates } from './commands/update.js';
import { uninstallCommand } from './commands/uninstall.js';

// Get package.json version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

// Get npm package root (where CLI is installed)
// When compiled: dist/index.js -> __dirname is dist/, so package root is one level up (root)
// When installed globally: /usr/local/lib/node_modules/@conductus-labs/baton-cli/dist/index.js
//   -> package root is /usr/local/lib/node_modules/@conductus-labs/baton-cli/
// In development (npm link): dist/index.js -> package root is repo root
const npmPackageRoot = join(__dirname, '..');

// Get current working directory (project root)
const projectRoot = cwd();
const batonDir = join(projectRoot, '.baton');

const program = new Command();

program
  .name('baton')
  .description('CLI tool for initializing and managing Baton Framework projects')
  .version(packageJson.version, '-v, --version', 'display version number');

// Init command
program
  .command('init')
  .description('Initialize a new Baton Framework project')
  .action(async () => {
    await initCommand(npmPackageRoot, batonDir, projectRoot, packageJson);
  });

// Agent commands
const agentCommand = program
  .command('agent')
  .description('Manage agents')
  .action(() => {
    agentCommand.help();
  });

agentCommand
  .command('ls')
  .description('List all agents')
  .action(() => {
    listAgents(npmPackageRoot, batonDir);
  });

agentCommand
  .command('add')
  .description('Add an agent')
  .argument('<agent-name>', 'Agent name to add')
  .action((agentName: string) => {
    addAgent(agentName, npmPackageRoot, batonDir);
  });

agentCommand
  .command('remove')
  .description('Remove an agent')
  .argument('<agent-name>', 'Agent name to remove')
  .action((agentName: string) => {
    removeAgent(agentName, npmPackageRoot, batonDir);
  });

agentCommand
  .command('update')
  .description('Update an agent to the latest version from source')
  .argument('<agent-name>', 'Agent name to update')
  .action(async (agentName: string) => {
    await updateAgent(agentName, npmPackageRoot, batonDir);
  });

// Workflow commands
const workflowCommand = program
  .command('workflow')
  .description('Manage workflows')
  .action(() => {
    workflowCommand.help();
  });

workflowCommand
  .command('ls')
  .description('List all workflows (sub-flows are automatically managed and not shown)')
  .action(() => {
    listWorkflows(npmPackageRoot, batonDir);
  });

workflowCommand
  .command('add')
  .description('Add a workflow')
  .action(() => {
    addWorkflow();
  });

workflowCommand
  .command('remove')
  .description('Remove a workflow')
  .action(() => {
    removeWorkflow();
  });

// Knowledge commands
const knowledgeCommand = program
  .command('knowledge')
  .description('Manage knowledge files')
  .action(() => {
    knowledgeCommand.help();
  });

knowledgeCommand
  .command('ls')
  .description('List all knowledge files (structure under review)')
  .action(() => {
    listKnowledge(npmPackageRoot, batonDir);
  });

knowledgeCommand
  .command('add')
  .description('Add a knowledge file')
  .action(() => {
    addKnowledge();
  });

knowledgeCommand
  .command('remove')
  .description('Remove a knowledge file')
  .action(() => {
    removeKnowledge();
  });

// Update command
program
  .command('update')
  .description('Update Baton CLI and installed files to the latest version')
  .allowUnknownOption() // Allow --devforce without complaining
  .action(async () => {
    // Check for --devforce flag manually (hidden from help)
    const devforce = process.argv.includes('--devforce');
    await updateCommand(npmPackageRoot, packageJson, devforce);
  });

// Uninstall command (as global option)
program
  .option('--uninstall', 'Uninstall Baton Framework from the current project');

// Default action: show help
program.action(async () => {
  // Check if --uninstall flag was passed
  if (program.opts().uninstall) {
    await uninstallCommand(projectRoot);
    return;
  }
  program.help();
});

// Only parse if this file is being run directly (not imported)
// Check if this is the main module by comparing the file URL with the executed script
const isMainModule = import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || 
                      process.argv[1]?.endsWith('index.js') ||
                      process.argv[1]?.endsWith('baton.js');

if (isMainModule) {
  // Parse arguments and check for updates if --version was used
  const args = process.argv.slice(2);
  if (args.includes('--version') || args.includes('-v')) {
    program.parse();
    // Check for updates after version is displayed
    checkForUpdates(packageJson).catch(() => {
      // Silently fail if check fails
    });
  } else if (args.includes('--uninstall')) {
    // Handle --uninstall before parsing (so it doesn't show help)
    program.parse();
  } else {
    program.parse();
  }
}
