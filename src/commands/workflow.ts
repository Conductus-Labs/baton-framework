import { join } from 'path';
import { loadMandatoryItems, getWorkflowFiles, resolveWorkflowsDir } from '../helpers.js';

/**
 * List all workflows (sub-flows are automatically managed and not shown)
 */
export function listWorkflows(npmPackageRoot: string, batonDir: string): void {
  const mandatory = loadMandatoryItems(npmPackageRoot);
  const installedDir = join(batonDir, 'workflows');
  const availableDir = resolveWorkflowsDir(npmPackageRoot);
  // Exclude sub-flows - they are automatically managed based on workflow dependencies
  // Only list top-level workflow files (not subdirectories like sub-flows, rhythm, spec-driven-dev)
  const installedItems = getWorkflowFiles(installedDir, '.yml');
  const availableItems = getWorkflowFiles(availableDir, '.yml');
  const allItems = Array.from(new Set([...installedItems, ...availableItems])).sort();
  
  if (allItems.length === 0) {
    console.log('\nNo workflow items found.\n');
    return;
  }
  
  console.log('\nWorkflows:\n');
  console.log('Note: Sub-flows are automatically managed based on installed workflows.\n');
  
  for (const item of allItems) {
    const isInstalled = installedItems.includes(item);
    const isMandatory = mandatory.workflows.has(item);
    
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
 * Add a workflow (stub - to be implemented)
 */
export function addWorkflow(): void {
  console.log('OK');
}

/**
 * Remove a workflow (stub - to be implemented)
 */
export function removeWorkflow(): void {
  console.log('OK');
}

