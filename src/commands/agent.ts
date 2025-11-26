import { existsSync, copyFileSync, unlinkSync, mkdirSync } from 'fs';
import { join } from 'path';
import { loadMandatoryItems, listCategoryItems, promptConfirmation, resolveAgentsDir } from '../helpers.js';
import { getAgentVersion, compareVersions } from '../utils.js';

/**
 * List all agents
 */
export function listAgents(npmPackageRoot: string, batonDir: string): void {
  const mandatory = loadMandatoryItems(npmPackageRoot);
  const installedDir = join(batonDir, 'agents');
  const availableDir = resolveAgentsDir(npmPackageRoot);
  listCategoryItems('agent', installedDir, availableDir, '.md', mandatory.agents);
}

/**
 * Add an agent
 */
export function addAgent(agentName: string, npmPackageRoot: string, batonDir: string): void {
  const mandatory = loadMandatoryItems(npmPackageRoot);
  const agentsDir = resolveAgentsDir(npmPackageRoot);
  const sourcePath = join(agentsDir, `${agentName}.md`);
  const destDir = join(batonDir, 'agents');
  const destPath = join(destDir, `${agentName}.md`);

  // Check if agent exists in source
  if (!existsSync(sourcePath)) {
    console.error(`\n❌ Error: Agent '${agentName}' not found in source.\n`);
    process.exit(1);
  }

  // Check if already installed
  if (existsSync(destPath)) {
    console.error(`\n❌ Error: Agent '${agentName}' is already installed.\n`);
    process.exit(1);
  }

  // Create destination directory if it doesn't exist
  try {
    mkdirSync(destDir, { recursive: true });
  } catch (error) {
    console.error(`\n❌ Error: Cannot create agents directory: ${destDir}\n`);
    process.exit(1);
  }

  // Copy agent file
  try {
    copyFileSync(sourcePath, destPath);
    console.log(`\n✅ Agent '${agentName}' added successfully.\n`);
  } catch (error) {
    console.error(`\n❌ Error: Failed to copy agent file: ${error}\n`);
    process.exit(1);
  }
}

/**
 * Remove an agent
 */
export function removeAgent(agentName: string, npmPackageRoot: string, batonDir: string): void {
  const mandatory = loadMandatoryItems(npmPackageRoot);
  const destPath = join(batonDir, 'agents', `${agentName}.md`);

  // Check if agent is mandatory
  if (mandatory.agents.has(agentName)) {
    console.error(`\n❌ Error: Agent '${agentName}' is mandatory and cannot be removed.\n`);
    process.exit(1);
  }

  // Check if agent is installed
  if (!existsSync(destPath)) {
    console.error(`\n❌ Error: Agent '${agentName}' is not installed.\n`);
    process.exit(1);
  }

  // Delete agent file
  try {
    unlinkSync(destPath);
    console.log(`\n✅ Agent '${agentName}' removed successfully.\n`);
  } catch (error) {
    console.error(`\n❌ Error: Failed to remove agent file: ${error}\n`);
    process.exit(1);
  }
}

/**
 * Update an agent to the latest version from source
 */
export async function updateAgent(agentName: string, npmPackageRoot: string, batonDir: string): Promise<void> {
  const agentsDir = resolveAgentsDir(npmPackageRoot);
  const sourcePath = join(agentsDir, `${agentName}.md`);
  const destPath = join(batonDir, 'agents', `${agentName}.md`);

  // Check if agent exists in source
  if (!existsSync(sourcePath)) {
    console.error(`\n❌ Error: Agent '${agentName}' not found in source.\n`);
    process.exit(1);
  }

  // Check if agent is installed
  if (!existsSync(destPath)) {
    console.error(`\n❌ Error: Agent '${agentName}' is not installed. Use 'baton agent add ${agentName}' to install it.\n`);
    process.exit(1);
  }

  // Get versions
  const sourceVersion = getAgentVersion(sourcePath);
  const installedVersion = getAgentVersion(destPath);

  if (!sourceVersion) {
    console.error(`\n❌ Error: Cannot read version from source agent file.\n`);
    process.exit(1);
  }

  if (!installedVersion) {
    console.error(`\n❌ Error: Cannot read version from installed agent file.\n`);
    process.exit(1);
  }

  // Compare versions
  const comparison = compareVersions(sourceVersion, installedVersion);

  if (comparison > 0) {
    // Source is newer - update automatically
    try {
      copyFileSync(sourcePath, destPath);
      console.log(`\n✅ Agent '${agentName}' updated from version ${installedVersion} to ${sourceVersion}.\n`);
    } catch (error) {
      console.error(`\n❌ Error: Failed to update agent file: ${error}\n`);
      process.exit(1);
    }
  } else if (comparison < 0) {
    // Source is older - warn and ask for confirmation
    console.log(`\n⚠️  Warning: Source version (${sourceVersion}) is older than installed version (${installedVersion}).`);
    const confirmed = await promptConfirmation('Do you want to downgrade?');
    if (confirmed) {
      try {
        copyFileSync(sourcePath, destPath);
        console.log(`\n✅ Agent '${agentName}' downgraded from version ${installedVersion} to ${sourceVersion}.\n`);
      } catch (error) {
        console.error(`\n❌ Error: Failed to update agent file: ${error}\n`);
        process.exit(1);
      }
    } else {
      console.log('\nUpdate cancelled.\n');
    }
  } else {
    // Versions are the same
    console.log(`\nℹ️  Agent '${agentName}' is already at version ${installedVersion} (same as source).`);
    const confirmed = await promptConfirmation('Do you want to overwrite anyway?');
    if (confirmed) {
      try {
        copyFileSync(sourcePath, destPath);
        console.log(`\n✅ Agent '${agentName}' updated (version ${installedVersion}).\n`);
      } catch (error) {
        console.error(`\n❌ Error: Failed to update agent file: ${error}\n`);
        process.exit(1);
      }
    } else {
      console.log('\nUpdate cancelled.\n');
    }
  }
}

