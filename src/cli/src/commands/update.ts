import { execSync } from 'child_process';
import https from 'https';
import { compareVersions } from '../utils.js';
import { promptConfirmation } from '../helpers.js';
import { updateInstalledFiles } from '../file-operations.js';

/**
 * Check npm registry for latest version
 */
export async function getLatestVersion(packageName: string): Promise<string | null> {
  return new Promise((resolve) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const packageInfo = JSON.parse(data);
          resolve(packageInfo.version);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => {
      resolve(null);
    });
  });
}

/**
 * Check for updates and display message
 */
export async function checkForUpdates(packageJson: any): Promise<void> {
  try {
    const latestVersion = await getLatestVersion(packageJson.name);
    if (!latestVersion) {
      // Can't check, silently fail
      return;
    }
    
    const currentVersion = packageJson.version;
    const comparison = compareVersions(latestVersion, currentVersion);
    
    if (comparison > 0) {
      console.log(`\n📦 A newer version is available: ${latestVersion}`);
      console.log(`   Current version: ${currentVersion}`);
      console.log(`   Run 'baton update' to update.\n`);
    } else {
      console.log(`\n✅ You are using the latest version (${currentVersion})\n`);
    }
  } catch {
    // Silently fail if check fails
  }
}

/**
 * Update command handler
 */
export async function updateCommand(npmPackageRoot: string, packageJson: any, devforce: boolean): Promise<void> {
  if (!devforce) {
    console.log('\n🔄 Checking for updates...\n');
    
    // Check npm for latest version
    const latestVersion = await getLatestVersion(packageJson.name);
    if (!latestVersion) {
      console.log('❌ Unable to check for updates. Please try again later.\n');
      return;
    }
    
    const currentVersion = packageJson.version;
    const comparison = compareVersions(latestVersion, currentVersion);
    
    if (comparison <= 0) {
      console.log(`✅ You are already using the latest version (${currentVersion})\n`);
      return;
    }
    
    console.log(`📦 New version available: ${latestVersion}`);
    console.log(`   Current version: ${currentVersion}\n`);
    
    const confirmed = await promptConfirmation('Do you want to update?');
    if (!confirmed) {
      console.log('\nUpdate cancelled.\n');
      return;
    }
    
    // Update the CLI package itself
    console.log('\n📥 Updating CLI package...');
    try {
      execSync(`npm install -g ${packageJson.name}@${latestVersion}`, { stdio: 'inherit' });
      console.log('✅ CLI package updated successfully\n');
    } catch (error) {
      console.error(`\n❌ Error updating CLI package: ${error}\n`);
      return;
    }
  } else {
    console.log('\n🔄 Development mode: Force updating all files (ignoring versions)...\n');
  }
  
  // Update installed files
  await updateInstalledFiles(npmPackageRoot, devforce);
}

