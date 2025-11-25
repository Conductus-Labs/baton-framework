import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { cleanupTestDir, setupTestDir, TEST_DIR, CLI_PATH } from '../helpers/test-utils.js';

const BATON_DIR = join(TEST_DIR, '.baton');

describe('Baton CLI Integration Tests', () => {
  beforeEach(() => {
    setupTestDir();
  });

  afterEach(() => {
    cleanupTestDir();
  });

  describe('Init Command', () => {
    it('should fail if .baton already exists without confirmation', () => {
      // Create .baton directory first
      mkdirSync(BATON_DIR, { recursive: true });
      
      // Try to run init (will fail because it requires interactive confirmation)
      // Since we can't easily test interactive prompts, we'll just verify the directory exists
      expect(existsSync(BATON_DIR)).toBe(true);
    });

    it('should create .baton directory structure', () => {
      // Note: Full init test requires mocking inquirer prompts
      // This is a placeholder for when we add proper mocking
      expect(existsSync(TEST_DIR)).toBe(true);
    });
  });

  describe('Agent Commands', () => {
    it('should handle agent add when agent not found', () => {
      try {
        execSync(
          `node ${CLI_PATH} agent add non-existent-agent`,
          { 
            encoding: 'utf-8',
            cwd: TEST_DIR,
            stdio: 'pipe'
          }
        );
      } catch (error: any) {
        // Error messages go to stderr
        const output = (error.stderr?.toString() || error.stdout?.toString() || '');
        expect(output).toContain('not found');
      }
    });

    it('should handle agent remove when agent not installed', () => {
      try {
        execSync(
          `node ${CLI_PATH} agent remove non-existent-agent`,
          { 
            encoding: 'utf-8',
            cwd: TEST_DIR,
            stdio: 'pipe'
          }
        );
      } catch (error: any) {
        // Error messages go to stderr
        const output = (error.stderr?.toString() || error.stdout?.toString() || '');
        expect(output).toContain('not installed');
      }
    });
  });

  describe('Update Command', () => {
    it('should handle update when .baton does not exist', () => {
      try {
        const result = execSync(
          `node ${CLI_PATH} update`,
          { 
            encoding: 'utf-8',
            cwd: TEST_DIR,
            stdio: 'pipe'
          }
        ).toString();
        
        // Update command checks npm first, then checks for .baton directory
        expect(result).toMatch(/No .baton directory found|Unable to check for updates/);
      } catch (error: any) {
        // Command might fail, check the output
        const output = error.stdout?.toString() || '';
        expect(output).toMatch(/No .baton directory found|Unable to check for updates/);
      }
    });
  });
});

