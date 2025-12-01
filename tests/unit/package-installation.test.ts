/**
 * Package Installation Testing
 * 
 * Tests for Phase 7, Task 7.1: Package Installation Testing
 * 
 * Verifies:
 * - Packages can be installed from local workspace
 * - All exports work correctly
 * - TypeScript type definitions are correct
 * - File structure is correct
 * - Post-install scripts create baton/ folder
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  rmSync,
} from "fs";
import { join, resolve } from "path";
import { execSync } from "child_process";

// Test directory for isolated package installation tests
const TEST_INSTALL_DIR = resolve(process.cwd(), ".test-install");

describe("Phase 7.1: Package Installation Testing", () => {
  beforeEach(() => {
    // Clean up test directory
    if (existsSync(TEST_INSTALL_DIR)) {
      rmSync(TEST_INSTALL_DIR, { recursive: true, force: true });
    }
    mkdirSync(TEST_INSTALL_DIR, { recursive: true });
  });

  afterEach(() => {
    // Clean up test directory
    if (existsSync(TEST_INSTALL_DIR)) {
      rmSync(TEST_INSTALL_DIR, { recursive: true, force: true });
    }
  });

  describe("Task 7.1.1: Local Package Installation", () => {
    it("should install @conductus-labs/baton-core from local workspace", () => {
      const packagePath = resolve(process.cwd(), "packages/core");
      
      // Create test package.json
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      // Install package
      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      // Verify package is installed
      const nodeModulesPath = join(
        TEST_INSTALL_DIR,
        "node_modules",
        "@conductus-labs",
        "baton-core"
      );
      expect(existsSync(nodeModulesPath)).toBe(true);
      expect(existsSync(join(nodeModulesPath, "package.json"))).toBe(true);
      expect(existsSync(join(nodeModulesPath, "dist"))).toBe(true);
    });

    it("should install @conductus-labs/baton-agents from local workspace", () => {
      const packagePath = resolve(process.cwd(), "packages/agents");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-agents": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const nodeModulesPath = join(
        TEST_INSTALL_DIR,
        "node_modules",
        "@conductus-labs",
        "baton-agents"
      );
      expect(existsSync(nodeModulesPath)).toBe(true);
    });

    it("should install @conductus-labs/baton-cognitive-patterns from local workspace", () => {
      const packagePath = resolve(process.cwd(), "packages/cognitive-patterns");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-cognitive-patterns": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const nodeModulesPath = join(
        TEST_INSTALL_DIR,
        "node_modules",
        "@conductus-labs",
        "baton-cognitive-patterns"
      );
      expect(existsSync(nodeModulesPath)).toBe(true);
    });

    it("should install @conductus-labs/baton-knowledge from local workspace", () => {
      const packagePath = resolve(process.cwd(), "packages/knowledge");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-knowledge": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const nodeModulesPath = join(
        TEST_INSTALL_DIR,
        "node_modules",
        "@conductus-labs",
        "baton-knowledge"
      );
      expect(existsSync(nodeModulesPath)).toBe(true);
    });

    it("should install @conductus-labs/baton-workflows from local workspace", () => {
      const packagePath = resolve(process.cwd(), "packages/workflows");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-workflows": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const nodeModulesPath = join(
        TEST_INSTALL_DIR,
        "node_modules",
        "@conductus-labs",
        "baton-workflows"
      );
      expect(existsSync(nodeModulesPath)).toBe(true);
    });
  });

  describe("Task 7.1.2: Verify Exports", () => {
    it("should export all types from @conductus-labs/baton-core", async () => {
      // Import from built dist file
      const coreModule = await import(
        resolve(process.cwd(), "packages/core/dist/index.js")
      );
      
      // Check type exports exist (types are compile-time only, so we check for runtime exports)
      expect(coreModule).toBeDefined();
      // Validators and utilities should be available
      expect(coreModule).toHaveProperty("validateAgent");
      expect(coreModule).toHaveProperty("validatePattern");
    });

    it("should export all validators from @conductus-labs/baton-core", async () => {
      const coreModule = await import(
        resolve(process.cwd(), "packages/core/dist/index.js")
      );
      
      // Check validator exports exist
      expect(coreModule).toHaveProperty("validateAgent");
      expect(coreModule).toHaveProperty("validatePattern");
      expect(coreModule).toHaveProperty("validateWorkflow");
      expect(coreModule).toHaveProperty("validateKnowledge");
    });

    it("should export all utilities from @conductus-labs/baton-core", async () => {
      const coreModule = await import(
        resolve(process.cwd(), "packages/core/dist/index.js")
      );
      
      // Check utility exports exist
      expect(coreModule).toHaveProperty("loadAgent");
      expect(coreModule).toHaveProperty("loadPattern");
      expect(coreModule).toHaveProperty("loadWorkflow");
      expect(coreModule).toHaveProperty("parseYamlFrontmatter");
      expect(coreModule).toHaveProperty("loadYamlFile");
      expect(coreModule).toHaveProperty("getBatonFolderPath");
      expect(coreModule).toHaveProperty("getFrameworkFilePath");
    });

    it("should export agents from @conductus-labs/baton-agents", async () => {
      // First install the package
      const packagePath = resolve(process.cwd(), "packages/agents");
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${resolve(process.cwd(), "packages/core")}`,
          "@conductus-labs/baton-agents": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      // Import and check exports
      const agentsModulePath = join(
        TEST_INSTALL_DIR,
        "node_modules",
        "@conductus-labs",
        "baton-agents",
        "dist",
        "index.js"
      );
      
      // Check that the file exists
      expect(existsSync(agentsModulePath)).toBe(true);
      
      // Agents package should export something (check based on actual exports)
      const agentsModule = await import(agentsModulePath);
      expect(agentsModule).toBeDefined();
    });
  });

  describe("Task 7.1.3: TypeScript Type Definitions", () => {
    it("should have correct type definitions in dist/", () => {
      const coreDistPath = resolve(process.cwd(), "packages/core/dist");
      
      // Check that dist directory exists and has .d.ts files
      expect(existsSync(coreDistPath)).toBe(true);
      
      const distFiles = readdirSync(coreDistPath, { recursive: true });
      const typeFiles = distFiles.filter((f) => 
        typeof f === "string" && f.endsWith(".d.ts")
      );
      
      expect(typeFiles.length).toBeGreaterThan(0);
    });

    it("should have index.d.ts in core package", () => {
      const indexDtsPath = resolve(
        process.cwd(),
        "packages/core/dist/index.d.ts"
      );
      expect(existsSync(indexDtsPath)).toBe(true);
      
      const content = readFileSync(indexDtsPath, "utf-8");
      // Check that it exports types
      expect(content).toContain("export");
    });

    it("should have correct package.json types field", () => {
      const corePackageJson = JSON.parse(
        readFileSync(
          resolve(process.cwd(), "packages/core/package.json"),
          "utf-8"
        )
      );
      
      expect(corePackageJson.types).toBe("dist/index.d.ts");
      expect(corePackageJson.main).toBe("dist/index.js");
    });
  });

  describe("Task 7.1.4: File Structure Verification", () => {
    it("should have correct file structure in core package", () => {
      const corePath = resolve(process.cwd(), "packages/core");
      
      // Check required directories
      expect(existsSync(join(corePath, "src"))).toBe(true);
      expect(existsSync(join(corePath, "dist"))).toBe(true);
      expect(existsSync(join(corePath, "scripts"))).toBe(true);
      expect(existsSync(join(corePath, "package.json"))).toBe(true);
      expect(existsSync(join(corePath, "tsconfig.json"))).toBe(true);
      
      // Check source structure
      expect(existsSync(join(corePath, "src", "types"))).toBe(true);
      expect(existsSync(join(corePath, "src", "validation"))).toBe(true);
      expect(existsSync(join(corePath, "src", "utils"))).toBe(true);
      expect(existsSync(join(corePath, "src", "config"))).toBe(true);
    });

    it("should have correct file structure in agents package", () => {
      const agentsPath = resolve(process.cwd(), "packages/agents");
      
      expect(existsSync(join(agentsPath, "src"))).toBe(true);
      expect(existsSync(join(agentsPath, "src", "agents"))).toBe(true);
      expect(existsSync(join(agentsPath, "scripts"))).toBe(true);
      expect(existsSync(join(agentsPath, "package.json"))).toBe(true);
    });

    it("should have correct file structure in cognitive-patterns package", () => {
      const patternsPath = resolve(process.cwd(), "packages/cognitive-patterns");
      
      expect(existsSync(join(patternsPath, "src"))).toBe(true);
      expect(existsSync(join(patternsPath, "src", "patterns"))).toBe(true);
      expect(existsSync(join(patternsPath, "scripts"))).toBe(true);
      expect(existsSync(join(patternsPath, "package.json"))).toBe(true);
    });

    it("should have correct file structure in knowledge package", () => {
      const knowledgePath = resolve(process.cwd(), "packages/knowledge");
      
      expect(existsSync(join(knowledgePath, "src"))).toBe(true);
      expect(existsSync(join(knowledgePath, "src", "knowledge"))).toBe(true);
      expect(existsSync(join(knowledgePath, "scripts"))).toBe(true);
      expect(existsSync(join(knowledgePath, "package.json"))).toBe(true);
    });

    it("should have correct file structure in workflows package", () => {
      const workflowsPath = resolve(process.cwd(), "packages/workflows");
      
      expect(existsSync(join(workflowsPath, "src"))).toBe(true);
      expect(existsSync(join(workflowsPath, "src", "workflows"))).toBe(true);
      expect(existsSync(join(workflowsPath, "scripts"))).toBe(true);
      expect(existsSync(join(workflowsPath, "package.json"))).toBe(true);
    });

    it("should have post-install scripts in all packages", () => {
      const packages = ["core", "agents", "cognitive-patterns", "knowledge", "workflows"];
      
      for (const pkg of packages) {
        const scriptPath = resolve(
          process.cwd(),
          "packages",
          pkg,
          "scripts",
          "setup-baton-folder.js"
        );
        expect(existsSync(scriptPath)).toBe(true);
      }
    });
  });

  describe("Task 7.1.5: Post-Install Script Testing", () => {
    it("should create baton/ folder structure after installing core package", () => {
      const packagePath = resolve(process.cwd(), "packages/core");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${packagePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      // Install package (triggers postinstall)
      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      // Check that baton/ folder was created
      const batonPath = join(TEST_INSTALL_DIR, "baton");
      expect(existsSync(batonPath)).toBe(true);
      expect(existsSync(join(batonPath, "core"))).toBe(true);
    });

    it("should create baton/agents/ after installing agents package", () => {
      const corePath = resolve(process.cwd(), "packages/core");
      const agentsPath = resolve(process.cwd(), "packages/agents");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${corePath}`,
          "@conductus-labs/baton-agents": `file:${agentsPath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const batonAgentsPath = join(TEST_INSTALL_DIR, "baton", "agents");
      expect(existsSync(batonAgentsPath)).toBe(true);
    });

    it("should create baton/cognitive/ after installing cognitive-patterns package", () => {
      const corePath = resolve(process.cwd(), "packages/core");
      const patternsPath = resolve(process.cwd(), "packages/cognitive-patterns");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${corePath}`,
          "@conductus-labs/baton-cognitive-patterns": `file:${patternsPath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const batonCognitivePath = join(TEST_INSTALL_DIR, "baton", "cognitive");
      expect(existsSync(batonCognitivePath)).toBe(true);
    });

    it("should create baton/knowledge/ after installing knowledge package", () => {
      const corePath = resolve(process.cwd(), "packages/core");
      const knowledgePath = resolve(process.cwd(), "packages/knowledge");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${corePath}`,
          "@conductus-labs/baton-knowledge": `file:${knowledgePath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const batonKnowledgePath = join(TEST_INSTALL_DIR, "baton", "knowledge");
      expect(existsSync(batonKnowledgePath)).toBe(true);
    });

    it("should create baton/workflows/ after installing workflows package", () => {
      const corePath = resolve(process.cwd(), "packages/core");
      const workflowsPath = resolve(process.cwd(), "packages/workflows");
      
      const testPackageJson = {
        name: "test-package",
        version: "1.0.0",
        type: "module",
        dependencies: {
          "@conductus-labs/baton-core": `file:${corePath}`,
          "@conductus-labs/baton-workflows": `file:${workflowsPath}`,
        },
      };

      const packageJsonPath = join(TEST_INSTALL_DIR, "package.json");
      writeFileSync(
        packageJsonPath,
        JSON.stringify(testPackageJson, null, 2),
        "utf-8"
      );

      execSync("npm install", {
        cwd: TEST_INSTALL_DIR,
        stdio: "pipe",
      });

      const batonWorkflowsPath = join(TEST_INSTALL_DIR, "baton", "workflows");
      expect(existsSync(batonWorkflowsPath)).toBe(true);
    });
  });
});
