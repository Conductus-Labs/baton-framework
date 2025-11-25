import { join } from 'path';
import { loadMandatoryItems, listCategoryItems } from '../helpers.js';

/**
 * List all knowledge files (structure under review)
 */
export function listKnowledge(npmPackageRoot: string, batonDir: string): void {
  const mandatory = loadMandatoryItems(npmPackageRoot);
  const installedDir = join(batonDir, 'knowledge');
  const availableDir = join(npmPackageRoot, 'src', 'core', 'knowledge');
  // Note: Knowledge file structure is still being reviewed
  // For now, only list top-level .md files
  listCategoryItems('knowledge', installedDir, availableDir, '.md', mandatory.knowledge);
}

/**
 * Add a knowledge file (stub - to be implemented)
 */
export function addKnowledge(): void {
  console.log('OK');
}

/**
 * Remove a knowledge file (stub - to be implemented)
 */
export function removeKnowledge(): void {
  console.log('OK');
}

