import { existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { promptConfirmation, addBatonToGitignore } from "../helpers.js";
import { collectProjectConfig, generateProjectConfig } from "../config.js";
import { copyInitFiles } from "../file-operations.js";

/**
 * Initialize a new Baton Framework project
 */
export async function initCommand(
  npmPackageRoot: string,
  batonDir: string,
  projectRoot: string,
  packageJson: any
): Promise<void> {
  try {
    // Step 1: Create .baton folder
    console.log("\n📦 Initializing Baton Framework...\n");

    if (existsSync(batonDir)) {
      // Check what's in .baton/ directory
      const batonContextDir = join(batonDir, "context");
      let contextFiles: string[] = [];
      let otherItems: string[] = [];
      
      try {
        const items = readdirSync(batonDir);
        for (const item of items) {
          if (item === "context") {
            // Check context directory for context files
            try {
              const contextItems = readdirSync(batonContextDir);
              contextFiles = contextItems.filter(file => file.endsWith('-context.md'));
            } catch {
              // If we can't read context directory, treat it as an "other" item
              otherItems.push(item);
            }
          } else {
            // Any item other than "context" is not allowed
            otherItems.push(item);
          }
        }
      } catch (error) {
        console.error(`\n❌ Error: Cannot read .baton directory: ${error}\n`);
        process.exit(1);
      }
      
      // If there are other items besides context, fail
      if (otherItems.length > 0) {
        console.error("❌ Error: .baton directory already exists and contains files/folders other than context/");
        console.error(`   Found: ${otherItems.join(", ")}`);
        console.error("");
        console.error("The .baton/ directory can only contain the context/ folder.");
        console.error("Please remove these items or use 'baton --uninstall' to clean up.\n");
        process.exit(1);
      }
      
      // If only context exists (or directory is empty), show info and continue
      if (contextFiles.length > 0) {
        console.log("📝 Context files found in .baton/context/:");
        contextFiles.forEach(file => {
          console.log(`   - ${file}`);
        });
        console.log("");
        console.log("These files will be preserved during initialization.");
        console.log("");
      } else {
        console.log("ℹ️  .baton directory exists (empty or only contains context/).");
        console.log("");
      }
    } else {
      mkdirSync(batonDir, { recursive: true });
      console.log("✅ Created .baton directory\n");
    }

    // Step 2: Interactive prompts to collect project configuration
    console.log(
      "📝 Please answer the following questions to configure your project:\n"
    );

    const config = await collectProjectConfig(npmPackageRoot, packageJson);

    // Step 3: Generate project.config.yml from template
    await generateProjectConfig(config, npmPackageRoot, batonDir);

    // Step 4: Load core-init.json and copy files (based on answers)
    await copyInitFiles(config, npmPackageRoot, projectRoot);
    
    // Step 5: Update .gitignore if requested
    if (config.add_to_gitignore) {
      console.log('📝 Updating .gitignore...');
      addBatonToGitignore(projectRoot);
      console.log('');
    }
    
    console.log("\n✅ Initialization complete!");
    console.log("   Step 1: .baton directory created");
    console.log("   Step 2: Project configuration collected");
    console.log("   Step 3: project.config.yml generated");
    console.log("   Step 4: Files copied");
    if (config.add_to_gitignore) {
      console.log("   Step 5: .gitignore updated");
    }
    console.log('');
    console.log("📋 Next Steps:");
    // Get the primary GenAI platform name (first one selected, or first in array)
    const primaryPlatform =
      config.gen_ai.find((p: any) => p.primary) || config.gen_ai[0];
    const platformName = primaryPlatform
      ? primaryPlatform.name.charAt(0).toUpperCase() +
        primaryPlatform.name.slice(1)
      : "your GenAI platform";
    console.log(
      `   To finish the setup process, run the following command from ${platformName}:`
    );
    console.log("   \x1b[1m/start-baton-project\x1b[0m\n");
    console.log("   This will complete the project initialization by:");
    console.log(
      "   - Populating project.manifest.md with your project details"
    );
    console.log("   - Creating project-boundaries.md");
    console.log("   - Finalizing all configuration files\n");
  } catch (error) {
    console.error(`\n❌ Error during initialization: ${error}\n`);
    process.exit(1);
  }
}
