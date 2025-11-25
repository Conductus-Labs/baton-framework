import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { promptConfirmation } from '../helpers.js';
import { collectProjectConfig, generateProjectConfig } from '../config.js';
import { copyInitFiles } from '../file-operations.js';

/**
 * Initialize a new Baton Framework project
 */
export async function initCommand(npmPackageRoot: string, batonDir: string, projectRoot: string, packageJson: any): Promise<void> {
  try {
    // Step 1: Create .baton folder
    console.log('\n📦 Initializing Baton Framework...\n');
    
    if (existsSync(batonDir)) {
      console.log('⚠️  Warning: .baton directory already exists.');
      const overwrite = await promptConfirmation('Do you want to continue? This may overwrite existing files.');
      if (!overwrite) {
        console.log('\n❌ Initialization cancelled.\n');
        process.exit(0);
      }
    } else {
      mkdirSync(batonDir, { recursive: true });
      console.log('✅ Created .baton directory\n');
    }

    // Step 2: Interactive prompts to collect project configuration
    console.log('📝 Please answer the following questions to configure your project:\n');
    
    const config = await collectProjectConfig(npmPackageRoot, packageJson);
    
    // Step 3: Generate project.config.yml from template
    await generateProjectConfig(config, npmPackageRoot, batonDir);
    
    // Step 4: Load core-init.json and copy files (based on answers)
    await copyInitFiles(config, npmPackageRoot, projectRoot);
    console.log('\n✅ Initialization complete!');
    console.log('   Step 1: .baton directory created');
    console.log('   Step 2: Project configuration collected');
    console.log('   Step 3: project.config.yml generated');
    console.log('   Step 4: Files copied\n');

  } catch (error) {
    console.error(`\n❌ Error during initialization: ${error}\n`);
    process.exit(1);
  }
}

