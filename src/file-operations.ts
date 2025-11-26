import { readFileSync, copyFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { cwd } from 'process';
import { getFileVersion, compareVersions } from './utils.js';
import yaml from 'js-yaml';
import inquirer from 'inquirer';

/**
 * Copy files from core-init.json based on configuration
 */
export async function copyInitFiles(config: any, npmPackageRoot: string, projectRoot: string): Promise<void> {
  // Load core-init.json
  const coreInitPath = join(npmPackageRoot, 'src', 'config', 'core-init.json');
  
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
      
      // Skip project.config.yml - it's already generated in step 3 with user's values
      if (file.destination === '.baton/project.config.yml') {
        continue;
      }

      // Files are at npmPackageRoot/src/core/... (included via package.json "files")
      const sourcePath = join(npmPackageRoot, file.source);
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

        // Files are at npmPackageRoot/src/core/... (included via package.json "files")
        const sourcePath = join(npmPackageRoot, file.source);
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
 * Check if a value is a placeholder pattern
 */
function isPlaceholder(value: any): boolean {
  if (typeof value !== 'string') return false;
  return /^\{[^}]+\}$/.test(value.trim()) || value.trim() === '';
}

/**
 * Find new sections in template compared to existing file
 */
function findNewSections(templateObj: any, existingObj: any, path: string = ''): string[] {
  const newSections: string[] = [];
  
  for (const key in templateObj) {
    const currentPath = path ? `${path}.${key}` : key;
    const templateValue = templateObj[key];
    const existingValue = existingObj[key];
    
    if (existingValue === undefined) {
      // New section found
      newSections.push(currentPath);
    } else if (typeof templateValue === 'object' && templateValue !== null && !Array.isArray(templateValue)) {
      // Recursively check nested objects
      if (typeof existingValue === 'object' && existingValue !== null && !Array.isArray(existingValue)) {
        newSections.push(...findNewSections(templateValue, existingValue, currentPath));
      }
    }
  }
  
  return newSections;
}

/**
 * Deep merge two objects, preserving existing values
 */
function deepMerge(existing: any, template: any): any {
  const merged = { ...existing };
  
  for (const key in template) {
    if (template[key] === undefined) continue;
    
    if (Array.isArray(template[key])) {
      // For arrays, preserve existing array if it exists and has values
      if (Array.isArray(merged[key]) && merged[key].length > 0) {
        // Keep existing array
        continue;
      } else {
        // Use template array (or empty array if template has empty array)
        merged[key] = [...template[key]];
      }
    } else if (typeof template[key] === 'object' && template[key] !== null) {
      // Recursively merge nested objects
      if (typeof merged[key] === 'object' && merged[key] !== null && !Array.isArray(merged[key])) {
        merged[key] = deepMerge(merged[key], template[key]);
      } else {
        // Existing value is not an object, preserve it unless it's a placeholder
        if (merged[key] === undefined || isPlaceholder(merged[key])) {
          merged[key] = template[key];
        }
      }
    } else {
      // For non-object values, only replace if existing is a placeholder or undefined
      if (merged[key] === undefined || isPlaceholder(merged[key])) {
        merged[key] = template[key];
      }
      // Otherwise keep existing value
    }
  }
  
  return merged;
}

/**
 * Prompt for new section values (simplified - just returns template values for now)
 * TODO: Implement full wizard similar to baton init
 */
async function promptForNewSections(newSections: string[], templateObj: any, existingObj: any): Promise<any> {
  const values: any = {};
  
  // For now, use template values (full wizard implementation would go here)
  // This is a placeholder - in a full implementation, we'd prompt for each new section
  for (const sectionPath of newSections) {
    const keys = sectionPath.split('.');
    let value = templateObj;
    for (const key of keys) {
      value = value?.[key];
    }
    // Set the value in the nested structure
    let target = values;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) target[keys[i]] = {};
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
  }
  
  return values;
}

/**
 * Merge special files (project.manifest and project.config.yml)
 */
export async function mergeSpecialFile(file: any, npmPackageRoot: string, projectRoot: string, updatedFiles: string[], devforce: boolean = false): Promise<void> {
  // Files are at npmPackageRoot/src/core/... (package.json "files" includes src/core)
  const sourcePath = join(npmPackageRoot, file.source);
  
  const destPath = join(projectRoot, file.destination);
  
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
  
  // File exists - check versions
  const sourceVersion = getFileVersion(sourcePath, file.destination);
  const destVersion = getFileVersion(destPath, file.destination);
  
  if (!sourceVersion || !destVersion) {
    // Can't compare versions
    if (devforce) {
      console.log(`   ⚠️  ${file.destination}: Cannot determine versions, but proceeding in devforce mode...`);
    } else {
      console.log(`   ℹ️  Skipped ${file.destination}: Cannot determine versions for comparison.`);
      return;
    }
  } else {
    const versionComparison = compareVersions(sourceVersion, destVersion);
    
    // EDGE CASE: Template is older than installed version
    if (versionComparison < 0) {
      console.error(`\n❌ Error: Template version (${sourceVersion}) is older than installed version (${destVersion})`);
      console.error(`   This should not happen. Please check for corruption or manual version changes.\n`);
      return;
    }
    
    // Versions match - nothing to do (unless devforce)
    if (versionComparison === 0) {
      if (devforce) {
        console.log(`   🔄 ${file.destination}: Versions match, but proceeding in devforce mode...`);
      } else {
        console.log(`   ✓ ${file.destination} is up to date (version ${destVersion})`);
        return;
      }
    } else {
      // Template is newer - proceed with merge
      console.log(`\n🔄 Updating ${file.destination} (${destVersion} → ${sourceVersion})...`);
    }
  }
  
  // Create backup (just in case)
  const backupPath = `${destPath}.bak`;
  try {
    copyFileSync(destPath, backupPath);
    console.log(`   📦 Backup saved: ${backupPath}`);
  } catch (error) {
    console.error(`   ⚠️  Warning: Could not create backup: ${error}`);
  }
  
  // Read both files
  const sourceContent = readFileSync(sourcePath, 'utf-8');
  const destContent = readFileSync(destPath, 'utf-8');
  
  // Parse based on file type
  let templateObj: any;
  let existingObj: any;
  let isYaml = false;
  
  try {
    if (file.destination.endsWith('.yml') || file.destination.endsWith('.yaml')) {
      // YAML file (project.config.yml)
      isYaml = true;
      templateObj = yaml.load(sourceContent) as any;
      existingObj = yaml.load(destContent) as any;
    } else if (file.destination.endsWith('.md')) {
      // Markdown with frontmatter (project.manifest.md)
      const sourceFrontmatter = sourceContent.match(/^---\s*\n([\s\S]*?)\n---/);
      const destFrontmatter = destContent.match(/^---\s*\n([\s\S]*?)\n---/);
      
      if (sourceFrontmatter && destFrontmatter) {
        templateObj = yaml.load(sourceFrontmatter[1]) as any;
        existingObj = yaml.load(destFrontmatter[1]) as any;
      } else {
        throw new Error('Invalid frontmatter format');
      }
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error(`   ✗ Error parsing files: ${error}`);
    console.error(`   ⚠️  Manual merge required. Backup saved to ${backupPath}\n`);
    return;
  }
  
  // Find new sections in template
  const newSections = findNewSections(templateObj, existingObj);
  
  // Merge existing sections (preserve user values)
  let mergedObj = deepMerge(existingObj, templateObj);
  
  // If there are new sections, prompt for values (simplified for now)
  if (newSections.length > 0) {
    console.log(`   📝 New sections detected: ${newSections.join(', ')}`);
    console.log(`   ℹ️  Using template defaults. Full wizard implementation coming soon.`);
    // TODO: Implement full wizard for new sections
    const newValues = await promptForNewSections(newSections, templateObj, existingObj);
    // Merge new values
    mergedObj = { ...mergedObj, ...newValues };
  }
  
  // Write merged content
  try {
    let mergedContent: string;
    if (isYaml) {
      mergedContent = yaml.dump(mergedObj, { 
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
      });
    } else {
      // Markdown with frontmatter
      const frontmatter = yaml.dump(mergedObj, { 
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
      });
      const markdownContent = destContent.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
      mergedContent = `---\n${frontmatter}---\n${markdownContent}`;
    }
    
    writeFileSync(destPath, mergedContent, 'utf-8');
    updatedFiles.push(file.destination);
    console.log(`   ✓ Successfully merged ${file.destination}`);
    if (newSections.length > 0) {
      console.log(`   ⚠️  Please review new sections: ${newSections.join(', ')}`);
    }
    console.log('');
  } catch (error) {
    console.error(`   ✗ Error writing merged file: ${error}`);
    console.error(`   ⚠️  Manual merge required. Backup saved to ${backupPath}\n`);
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
  const coreInitPath = join(npmPackageRoot, 'src', 'config', 'core-init.json');
  
  if (!existsSync(coreInitPath)) {
    console.error(`\n❌ Error: core-init.json not found at ${coreInitPath}\n`);
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
      const sourcePath = join(npmPackageRoot, file.source);
      
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

