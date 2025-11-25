import { readFileSync, copyFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { cwd } from 'process';
import { getFileVersion, compareVersions } from './utils.js';

/**
 * Copy files from core-init.json based on configuration
 */
export async function copyInitFiles(config: any, npmPackageRoot: string, projectRoot: string): Promise<void> {
  // Load core-init.json
  let coreInitPath = join(npmPackageRoot, 'src', 'config', 'core-init.json');
  if (!existsSync(coreInitPath)) {
    // Fallback for development: try repo root location
    coreInitPath = join(npmPackageRoot, '..', 'config', 'core-init.json');
  }
  
  if (!existsSync(coreInitPath)) {
    console.error(`\n❌ Error: core-init.json not found at ${coreInitPath}\n`);
    process.exit(1);
  }

  const coreInit = JSON.parse(readFileSync(coreInitPath, 'utf-8'));

  // Get selected platforms from config
  const selectedPlatforms = config.gen_ai.map((platform: any) => platform.name);

  // Step 1: Create directory structure
  console.log('📁 Creating directory structure...');
  if (coreInit.directories && Array.isArray(coreInit.directories)) {
    for (const dir of coreInit.directories) {
      // Skip platform-specific directories if platform not selected
      if (dir.path.startsWith('.cursor/') && !selectedPlatforms.includes('cursor')) {
        continue;
      }
      if (dir.path.startsWith('.claude/') && !selectedPlatforms.includes('claude')) {
        continue;
      }
      if (dir.path.startsWith('.gemini/') && !selectedPlatforms.includes('gemini')) {
        continue;
      }
      
      const dirPath = join(projectRoot, dir.path);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
        console.log(`   ✓ ${dir.path}`);
      }
    }
  }
  console.log('');

  // Step 2: Copy files to .baton/ (non-platform-specific)
  console.log('📄 Copying files to .baton/...');
  let copiedCount = 0;
  let errorCount = 0;

  if (coreInit.files && Array.isArray(coreInit.files)) {
    for (const file of coreInit.files) {
      // Skip platform-specific files (they'll be handled separately)
      if (file.platform) {
        continue;
      }
      
      // Only copy files that go to .baton/
      if (!file.destination.startsWith('.baton/')) {
        continue;
      }

      // In production: files are at npmPackageRoot/src/core/... (included via package.json "files")
      // In development: files are at repo root src/core/... (go up 2 levels from src/cli/ to repo root)
      let sourcePath = join(npmPackageRoot, file.source);
      if (!existsSync(sourcePath)) {
        // Development fallback: go up to repo root, then use file.source as-is
        sourcePath = join(npmPackageRoot, '..', '..', file.source);
      }
      const destPath = join(projectRoot, file.destination);

      // Create destination directory if it doesn't exist
      const destDir = dirname(destPath);
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }

      // Copy file
      try {
        if (!existsSync(sourcePath)) {
          console.error(`   ✗ ${file.destination} (source not found: ${file.source})`);
          errorCount++;
          continue;
        }

        copyFileSync(sourcePath, destPath);
        console.log(`   ✓ ${file.destination}`);
        copiedCount++;
      } catch (error) {
        console.error(`   ✗ ${file.destination} (error: ${error})`);
        errorCount++;
      }
    }
  }

  console.log('');

  // Step 3: Copy platform-specific command files
  if (selectedPlatforms.length > 0) {
    console.log('📄 Copying platform-specific command files...');
    
    if (coreInit.files && Array.isArray(coreInit.files)) {
      for (const file of coreInit.files) {
        // Only process platform-specific files
        if (!file.platform) {
          continue;
        }
        
        // Only copy if platform is selected
        if (!selectedPlatforms.includes(file.platform)) {
          continue;
        }

        // In production: files are at npmPackageRoot/src/core/... (included via package.json "files")
        // In development: files might be at repo root src/core/... (one level up from package root)
        let sourcePath = join(npmPackageRoot, file.source);
        if (!existsSync(sourcePath)) {
          // Fallback for development: try repo root location
          sourcePath = join(npmPackageRoot, '..', file.source);
        }
        const destPath = join(projectRoot, file.destination);

        // Create destination directory if it doesn't exist
        const destDir = dirname(destPath);
        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
        }

        // Copy file
        try {
          if (!existsSync(sourcePath)) {
            console.error(`   ✗ ${file.destination} (source not found: ${file.source})`);
            errorCount++;
            continue;
          }

          copyFileSync(sourcePath, destPath);
          console.log(`   ✓ ${file.destination}`);
          copiedCount++;
        } catch (error) {
          console.error(`   ✗ ${file.destination} (error: ${error})`);
          errorCount++;
        }
      }
    }
    console.log('');
  }

  console.log(`✅ File copying complete!`);
  console.log(`   Files copied: ${copiedCount}`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount}`);
  }
  console.log('');
}

/**
 * Merge special files (project.manifest and project.config.yml)
 */
export async function mergeSpecialFile(file: any, npmPackageRoot: string, projectRoot: string, updatedFiles: string[], devforce: boolean = false): Promise<void> {
  // In production: npmPackageRoot/src/core/... (package.json "files" includes src/core)
  // In development: repo root src/core/... (go up 2 levels from src/cli/ to repo root)
  let sourcePath = join(npmPackageRoot, file.source);
  if (!existsSync(sourcePath)) {
    // Development fallback: go up to repo root, then use file.source as-is
    sourcePath = join(npmPackageRoot, '..', '..', file.source);
  }
  
  const destPath = join(projectRoot, file.destination);
  const sourceContent = readFileSync(sourcePath, 'utf-8');
  
  if (!existsSync(destPath)) {
    // File doesn't exist, create it from template
    try {
      const destDir = dirname(destPath);
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }
      copyFileSync(sourcePath, destPath);
      updatedFiles.push(file.destination);
      console.log(`   ✓ Created ${file.destination} from template`);
    } catch (error) {
      console.error(`   ✗ Error creating ${file.destination}: ${error}`);
    }
    return;
  }
  
  // File exists, need to merge - always create backup and new template (NEVER overwrite)
  const destContent = readFileSync(destPath, 'utf-8');
  
  // Get versions to check if update is needed (unless devforce)
  if (!devforce) {
    const sourceVersion = getFileVersion(sourcePath, file.destination);
    const destVersion = getFileVersion(destPath, file.destination);
    
    if (sourceVersion && destVersion) {
      const versionComparison = compareVersions(sourceVersion, destVersion);
      if (versionComparison <= 0) {
        // Source is not newer, skip
        console.log(`   ℹ️  Skipped ${file.destination}: Source version (${sourceVersion}) is not newer than installed (${destVersion}).`);
        return;
      }
    }
  }
  
  // For special files, we need to preserve user data
  // Save backup and new template for manual review (NEVER overwrite the original)
  console.log(`\n⚠️  ${file.destination} needs manual merge`);
  console.log('   This file contains user data that must be preserved.\n');
  
  try {
    // Save backup of current file
    const backupPath = `${destPath}.bak`;
    copyFileSync(destPath, backupPath);
    console.log(`   📦 Backup saved: ${backupPath}`);
    
    // Save new template for reference
    const newPath = `${destPath}.new`;
    writeFileSync(newPath, sourceContent, 'utf-8');
    console.log(`   📄 New template saved: ${newPath}`);
    console.log(`   ⚠️  Please manually merge ${file.destination} with ${newPath}`);
    console.log(`   Original file backed up to ${backupPath}\n`);
    
    // Don't mark as updated since we're not actually merging automatically
    // User needs to manually merge - original file is preserved and NOT overwritten
  } catch (error) {
    console.error(`   ✗ Error preparing merge for ${file.destination}: ${error}\n`);
  }
}

/**
 * Update installed files with newer versions
 */
export async function updateInstalledFiles(npmPackageRoot: string, devforce: boolean = false): Promise<void> {
  const projectRoot = cwd();
  const batonDir = join(projectRoot, '.baton');
  
  if (!existsSync(batonDir)) {
    console.log('⚠️  No .baton directory found. Run "baton init" first.\n');
    return;
  }
  
  // Load project.config.yml to see what's installed
  const projectConfigPath = join(projectRoot, '.baton', 'project.config.yml');
  let installedFiles: Set<string> = new Set();
  
  if (existsSync(projectConfigPath)) {
    try {
      const projectConfigContent = readFileSync(projectConfigPath, 'utf-8');
      // Parse YAML manually (simple approach)
      const agentsMatch = projectConfigContent.match(/agents:\s*\n\s*enabled:\s*\n((?:\s*-\s*path:\s*[^\n]+\n?)+)/);
      if (agentsMatch) {
        const agentPaths = agentsMatch[1].match(/path:\s*([^\n]+)/g);
        if (agentPaths) {
          agentPaths.forEach(path => {
            const filePath = path.replace(/path:\s*/, '').trim();
            installedFiles.add(filePath);
          });
        }
      }
      
      const workflowsMatch = projectConfigContent.match(/workflows:\s*\n\s*enabled:\s*\n((?:\s*-\s*path:\s*[^\n]+\n?)+)/);
      if (workflowsMatch) {
        const workflowPaths = workflowsMatch[1].match(/path:\s*([^\n]+)/g);
        if (workflowPaths) {
          workflowPaths.forEach(path => {
            const filePath = path.replace(/path:\s*/, '').trim();
            installedFiles.add(filePath);
          });
        }
      }
      
      const knowledgeMatch = projectConfigContent.match(/knowledge:\s*\n((?:\s*-\s*path:\s*[^\n]+\n?)+)/);
      if (knowledgeMatch) {
        const knowledgePaths = knowledgeMatch[1].match(/path:\s*([^\n]+)/g);
        if (knowledgePaths) {
          knowledgePaths.forEach(path => {
            const filePath = path.replace(/path:\s*/, '').trim();
            installedFiles.add(filePath);
          });
        }
      }
    } catch (error) {
      console.log('⚠️  Could not parse project.config.yml, will update all mandatory files\n');
    }
  }
  
  // Load core-init.json for mandatory files
  // In production: npmPackageRoot/src/config/core-init.json (package.json "files" includes src/config)
  // In development: repo root src/config/core-init.json (go up 1 level from src/cli/ to src/, then config/)
  let coreInitPath = join(npmPackageRoot, 'src', 'config', 'core-init.json');
  if (!existsSync(coreInitPath)) {
    coreInitPath = join(npmPackageRoot, '..', 'config', 'core-init.json');
  }
  
  if (!existsSync(coreInitPath)) {
    console.error(`\n❌ Error: core-init.json not found\n`);
    return;
  }
  
  const coreInit = JSON.parse(readFileSync(coreInitPath, 'utf-8'));
  
  console.log('📄 Checking for file updates...\n');
  
  const updatedFiles: string[] = [];
  const skippedFiles: string[] = [];
  
  // Get mandatory files from core-init.json
  const mandatoryFiles = new Set<string>();
  if (coreInit.files && Array.isArray(coreInit.files)) {
    coreInit.files.forEach((file: any) => {
      if (file.destination && file.destination.startsWith('.baton/')) {
        mandatoryFiles.add(file.destination);
      }
    });
  }
  
  // Combine installed files and mandatory files
  const filesToUpdate = new Set([...installedFiles, ...mandatoryFiles]);
  
  if (coreInit.files && Array.isArray(coreInit.files)) {
    for (const file of coreInit.files) {
      // Skip platform-specific files for now
      if (file.platform) {
        continue;
      }
      
      // Skip files that don't go to .baton/
      if (!file.destination.startsWith('.baton/')) {
        continue;
      }
      
      // Only update if file is installed or mandatory
      const isInstalled = filesToUpdate.has(file.destination);
      const isMandatory = mandatoryFiles.has(file.destination);
      
      if (!isInstalled && !isMandatory) {
        continue; // Skip files that aren't installed and aren't mandatory
      }
      
      // Special handling for project.manifest and project.config.yml
      if (file.destination.includes('project.manifest') || file.destination.includes('project.config.yml')) {
        await mergeSpecialFile(file, npmPackageRoot, projectRoot, updatedFiles, devforce);
        continue;
      }
      
      // Regular file update logic
      let sourcePath = join(npmPackageRoot, file.source);
      if (!existsSync(sourcePath)) {
        sourcePath = join(npmPackageRoot, '..', '..', file.source);
      }
      
      if (!existsSync(sourcePath)) {
        console.error(`   ✗ Source file not found: ${file.source}`);
        skippedFiles.push(file.destination);
        continue;
      }
      
      const destPath = join(projectRoot, file.destination);
      
      // Get versions
      const sourceVersion = getFileVersion(sourcePath, file.destination);
      const destVersion = existsSync(destPath) ? getFileVersion(destPath, file.destination) : null;
      
      if (devforce) {
        // Force update - ignore version checks
        try {
          const destDir = dirname(destPath);
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true });
          }
          copyFileSync(sourcePath, destPath);
          updatedFiles.push(file.destination);
          if (sourceVersion && destVersion) {
            console.log(`   ✓ Updated ${file.destination} (${destVersion} → ${sourceVersion}) [forced]`);
          } else {
            console.log(`   ✓ Updated ${file.destination} [forced]`);
          }
        } catch (error) {
          console.error(`   ✗ Error updating ${file.destination}: ${error}`);
        }
        continue;
      }
      
      if (!sourceVersion || !destVersion) {
        // Can't compare versions, but if it's mandatory or installed, update anyway
        if (isMandatory || isInstalled) {
          try {
            const destDir = dirname(destPath);
            if (!existsSync(destDir)) {
              mkdirSync(destDir, { recursive: true });
            }
            copyFileSync(sourcePath, destPath);
            updatedFiles.push(file.destination);
            console.log(`   ✓ Updated ${file.destination} (no version info)`);
          } catch (error) {
            console.error(`   ✗ Error updating ${file.destination}: ${error}`);
          }
        } else {
          skippedFiles.push(file.destination);
        }
        continue;
      }
      
      const versionComparison = compareVersions(sourceVersion, destVersion);
      
      if (versionComparison > 0) {
        // Source is newer, update it
        try {
          const destDir = dirname(destPath);
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true });
          }
          copyFileSync(sourcePath, destPath);
          updatedFiles.push(file.destination);
          console.log(`   ✓ Updated ${file.destination} (${destVersion} → ${sourceVersion})`);
        } catch (error) {
          console.error(`   ✗ Error updating ${file.destination}: ${error}`);
        }
      }
    }
  }
  
  console.log('');
  if (updatedFiles.length > 0) {
    console.log(`✅ Updated ${updatedFiles.length} file(s):`);
    updatedFiles.forEach(file => console.log(`   - ${file}`));
  } else {
    console.log('✅ All files are up to date.');
  }
  if (skippedFiles.length > 0) {
    console.log(`\n⚠️  Skipped ${skippedFiles.length} file(s) (version info not available)`);
  }
  console.log('');
}

