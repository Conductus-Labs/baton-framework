import { existsSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the project root (two levels up from tests/helpers/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '../..');

export const TEST_DIR = resolve(PROJECT_ROOT, '.test');
export const CLI_PATH = resolve(PROJECT_ROOT, 'bin/baton.js');

/**
 * Clean up the test directory
 * On Windows, we need to retry if files are locked
 */
export function cleanupTestDir() {
  if (existsSync(TEST_DIR)) {
    try {
      rmSync(TEST_DIR, { recursive: true, force: true });
    } catch (error: any) {
      // On Windows, files might be locked - wait a bit and retry
      if (error.code === 'EBUSY' || error.code === 'EPERM') {
        // Wait 100ms and retry once
        setTimeout(() => {
          try {
            rmSync(TEST_DIR, { recursive: true, force: true });
          } catch {
            // Ignore errors on retry - test will continue
          }
        }, 100);
      }
    }
  }
}

/**
 * Setup the test directory
 */
export function setupTestDir() {
  cleanupTestDir();
  mkdirSync(TEST_DIR, { recursive: true });
}

/**
 * Run a CLI command and return the result
 */
export function runCommand(args: string[], options: { cwd?: string } = {}): {
  stdout: string;
  stderr: string;
  exitCode: number;
} {
  const { execSync } = require('child_process');
  const cwd = options.cwd || TEST_DIR;
  
  try {
    const stdout = execSync(`node ${CLI_PATH} ${args.join(' ')}`, {
      encoding: 'utf-8',
      cwd,
      stdio: 'pipe'
    });
    return { stdout, stderr: '', exitCode: 0 };
  } catch (error: any) {
    // Combine stdout and stderr for easier testing (CLI errors often go to stderr)
    const stdout = error.stdout?.toString() || '';
    const stderr = error.stderr?.toString() || '';
    return {
      stdout: stdout + stderr, // Combine for easier assertion
      stderr: stderr,
      exitCode: error.status || 1
    };
  }
}

/**
 * Check if a file exists in the test directory
 */
export function testFileExists(relativePath: string): boolean {
  return existsSync(join(TEST_DIR, relativePath));
}

/**
 * Read a file from the test directory
 */
export function readTestFile(relativePath: string): string {
  return readFileSync(join(TEST_DIR, relativePath), 'utf-8');
}

/**
 * Write a file to the test directory
 */
export function writeTestFile(relativePath: string, content: string): void {
  const filePath = join(TEST_DIR, relativePath);
  const dir = require('path').dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, content, 'utf-8');
}

/**
 * Check if a directory exists in the test directory
 */
export function testDirExists(relativePath: string): boolean {
  return existsSync(join(TEST_DIR, relativePath));
}

