import { readFileSync, readdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

/**
 * Load mandatory items from core-init.json
 */
export function loadMandatoryItems(npmPackageRoot: string): {
  agents: Set<string>;
  workflows: Set<string>;
  knowledge: Set<string>;
} {
  const mandatory: { agents: Set<string>, workflows: Set<string>, knowledge: Set<string> } = {
    agents: new Set(),
    workflows: new Set(),
    knowledge: new Set()
  };

  try {
    const coreInitPath = join(npmPackageRoot, 'src', 'config', 'core-init.json');
    if (existsSync(coreInitPath)) {
      const coreInit = JSON.parse(readFileSync(coreInitPath, 'utf-8'));
      
      if (coreInit.files && Array.isArray(coreInit.files)) {
        for (const file of coreInit.files) {
          const destination = file.destination || '';
          
          // Extract item name from destination path
          if (destination.includes('.baton/agents/')) {
            const agentName = destination.replace('.baton/agents/', '').replace('.md', '');
            if (agentName) mandatory.agents.add(agentName);
          } else if (destination.includes('.baton/workflows/')) {
            // Handle both main workflows and sub-flows
            const workflowPath = destination.replace('.baton/workflows/', '');
            const workflowName = workflowPath.split('/').pop()?.replace('.yml', '');
            if (workflowName) mandatory.workflows.add(workflowName);
          } else if (destination.includes('.baton/knowledge/')) {
            const knowledgeName = destination.replace('.baton/knowledge/', '').replace('.md', '');
            if (knowledgeName) mandatory.knowledge.add(knowledgeName);
          }
        }
      }
    }
  } catch (error) {
    // Silently fail - mandatory items just won't be marked
  }

  return mandatory;
}

/**
 * Get files from a directory with a specific extension
 */
export function getFilesFromDir(dirPath: string, extension: string): string[] {
  if (!existsSync(dirPath)) {
    return [];
  }
  
  try {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isFile() && entry.name.endsWith(extension))
      .map(entry => entry.name.replace(extension, ''));
  } catch {
    return [];
  }
}

/**
 * Get workflow files (excludes subdirectories like sub-flows)
 * Sub-flows are automatically managed based on workflow dependencies and not user-installable
 */
export function getWorkflowFiles(dirPath: string, extension: string): string[] {
  if (!existsSync(dirPath)) {
    return [];
  }
  
  try {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    // Only list files in the root workflows directory, not subdirectories
    return entries
      .filter(entry => entry.isFile() && entry.name.endsWith(extension))
      .map(entry => entry.name.replace(extension, ''));
  } catch {
    return [];
  }
}

/**
 * Utility function to list items for a category
 */
export function listCategoryItems(
  category: 'agent' | 'workflow' | 'knowledge',
  installedDir: string,
  availableDir: string,
  extension: string,
  mandatoryItems: Set<string>
): void {
  // Get installed items from .baton folder
  const installedItems = getFilesFromDir(installedDir, extension);
  
  // Get available items from npm package
  const availableItems = getFilesFromDir(availableDir, extension);
  
  // Combine and deduplicate
  const allItems = Array.from(new Set([...installedItems, ...availableItems])).sort();
  
  if (allItems.length === 0) {
    console.log(`No ${category} items found.`);
    return;
  }
  
  console.log(`\n${category.charAt(0).toUpperCase() + category.slice(1)}s:\n`);
  
  for (const item of allItems) {
    const isInstalled = installedItems.includes(item);
    const isMandatory = mandatoryItems.has(item);
    
    let indicator = isInstalled ? '✓' : ' ';
    let status = '';
    
    if (isInstalled) {
      status = ' (installed';
      if (isMandatory) {
        status += ', mandatory';
      }
      status += ')';
    } else if (isMandatory) {
      status = ' (mandatory)';
    }
    
    console.log(`  ${indicator} ${item}${status}`);
  }
  
  console.log('');
}

/**
 * Prompt for user confirmation
 */
export function promptConfirmation(question: string): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Get available agents from source
 */
export function getAvailableAgents(npmPackageRoot: string): string[] {
  const agentsDir = join(npmPackageRoot, 'src', 'core', 'agents');
  return getFilesFromDir(agentsDir, '.md');
}

/**
 * Get available workflows from source
 */
export function getAvailableWorkflows(npmPackageRoot: string): string[] {
  const workflowsDir = join(npmPackageRoot, 'src', 'core', 'workflows');
  return getWorkflowFiles(workflowsDir, '.yml');
}

/**
 * Resolve agents directory path
 */
export function resolveAgentsDir(npmPackageRoot: string): string {
  return join(npmPackageRoot, 'src', 'core', 'agents');
}

/**
 * Resolve workflows directory path
 */
export function resolveWorkflowsDir(npmPackageRoot: string): string {
  return join(npmPackageRoot, 'src', 'core', 'workflows');
}

/**
 * Resolve knowledge directory path
 */
export function resolveKnowledgeDir(npmPackageRoot: string): string {
  return join(npmPackageRoot, 'src', 'core', 'knowledge');
}

/**
 * Add .baton to .gitignore file
 */
export function addBatonToGitignore(projectRoot: string): void {
  const gitignorePath = join(projectRoot, '.gitignore');
  const batonEntry = '.baton';
  
  // Check if .gitignore exists
  if (existsSync(gitignorePath)) {
    const content = readFileSync(gitignorePath, 'utf-8');
    
    // Check if .baton is already in .gitignore
    const lines = content.split('\n');
    const hasBaton = lines.some(line => line.trim() === batonEntry || line.trim() === `${batonEntry}/`);
    
    if (!hasBaton) {
      // Add .baton to .gitignore
      const newContent = content.trim() + (content.trim() ? '\n' : '') + `${batonEntry}\n`;
      writeFileSync(gitignorePath, newContent, 'utf-8');
      console.log('   ✓ Added .baton to .gitignore');
    } else {
      console.log('   ℹ️  .baton already in .gitignore');
    }
  } else {
    // Create .gitignore with .baton entry
    writeFileSync(gitignorePath, `${batonEntry}\n`, 'utf-8');
    console.log('   ✓ Created .gitignore and added .baton');
  }
}

