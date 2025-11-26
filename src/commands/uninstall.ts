import { existsSync, rmSync, readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { promptConfirmation } from "../helpers.js";

/**
 * Uninstall Baton Framework from the project
 */
export async function uninstallCommand(projectRoot: string): Promise<void> {
  try {
    console.log("\n🗑️  Uninstalling Baton Framework...\n");

    const batonDir = join(projectRoot, ".baton");
    const batonContextDir = join(batonDir, "context");
    const cursorCommandsDir = join(projectRoot, ".cursor", "commands", "baton");
    const claudeCommandsDir = join(projectRoot, ".claude", "commands", "baton");
    const geminiCommandsDir = join(projectRoot, ".gemini", "commands", "baton");

    // Check for context files
    let hasContextFiles = false;
    let contextFiles: string[] = [];
    if (existsSync(batonContextDir)) {
      try {
        const files = readdirSync(batonContextDir);
        contextFiles = files.filter(file => file.endsWith('-context.md'));
        hasContextFiles = contextFiles.length > 0;
      } catch {
        // If we can't read the directory, assume no context files
      }
    }

    // Check what exists
    const dirsToRemove: { path: string; name: string }[] = [];
    let skipBatonDir = false;
    
    if (existsSync(batonDir)) {
      if (hasContextFiles) {
        console.log("📝 Context files detected in .baton/context/:");
        contextFiles.forEach(file => {
          console.log(`   - ${file}`);
        });
        console.log("");
        
        const keepContext = await promptConfirmation(
          "Do you want to keep the context files? (This will preserve the entire .baton/ directory)"
        );
        
        if (keepContext) {
          console.log("ℹ️  Keeping .baton/ directory and context files.\n");
          skipBatonDir = true;
        } else {
          dirsToRemove.push({ path: batonDir, name: ".baton/" });
        }
      } else {
        dirsToRemove.push({ path: batonDir, name: ".baton/" });
      }
    }
    if (existsSync(cursorCommandsDir)) {
      dirsToRemove.push({ path: cursorCommandsDir, name: ".cursor/commands/baton/" });
    }
    if (existsSync(claudeCommandsDir)) {
      dirsToRemove.push({ path: claudeCommandsDir, name: ".claude/commands/baton/" });
    }
    if (existsSync(geminiCommandsDir)) {
      dirsToRemove.push({ path: geminiCommandsDir, name: ".gemini/commands/baton/" });
    }

    if (dirsToRemove.length === 0) {
      console.log("ℹ️  No Baton Framework files found to remove.\n");
      return;
    }

    // Show what will be removed
    console.log("⚠️  WARNING: This will permanently delete the following directories:");
    dirsToRemove.forEach((dir) => {
      console.log(`   - ${dir.name}`);
    });
    console.log("");
    console.log("This action cannot be undone!\n");

    // Ask for confirmation
    const confirmed = await promptConfirmation(
      "Are you sure you want to uninstall Baton Framework?"
    );

    if (!confirmed) {
      console.log("\n❌ Uninstallation cancelled.\n");
      return;
    }

    // Remove directories
    console.log("\n📁 Removing directories...\n");
    let removedCount = 0;
    let errorCount = 0;

    for (const dir of dirsToRemove) {
      try {
        rmSync(dir.path, { recursive: true, force: true });
        console.log(`   ✓ Removed ${dir.name}`);
        removedCount++;
      } catch (error) {
        console.error(`   ✗ Failed to remove ${dir.name}: ${error}`);
        errorCount++;
      }
    }

    console.log("");
    if (errorCount === 0) {
      console.log("✅ Uninstallation complete!");
      console.log(`   Removed ${removedCount} director${removedCount === 1 ? "y" : "ies"}\n`);
    } else {
      console.log("⚠️  Uninstallation completed with errors.");
      console.log(`   Removed: ${removedCount}, Errors: ${errorCount}\n`);
    }
  } catch (error) {
    console.error(`\n❌ Error during uninstallation: ${error}\n`);
    process.exit(1);
  }
}

