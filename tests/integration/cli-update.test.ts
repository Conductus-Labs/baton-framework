import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cleanupTestDir, setupTestDir, runCommand, testFileExists, TEST_DIR } from '../helpers/test-utils.js';

const BATON_DIR = join(TEST_DIR, '.baton');

describe('Baton CLI Update Command Integration', () => {
  beforeEach(() => {
    setupTestDir();
  });

  afterEach(() => {
    cleanupTestDir();
  });

  describe('update command', () => {
    it('should show message when .baton directory does not exist', () => {
      const result = runCommand(['update']);
      // Update command checks npm first, then checks for .baton directory
      // If npm check fails, it returns early, so we check for either message
      expect(result.stdout).toMatch(/No .baton directory found|Unable to check for updates/);
    });

    it('should proceed when .baton directory exists', () => {
      // Create .baton directory
      if (!existsSync(BATON_DIR)) {
        mkdirSync(BATON_DIR, { recursive: true });
      }

      // Create a minimal project.config.yml
      writeFileSync(
        join(BATON_DIR, 'project.config.yml'),
        'version: 1.0.0\nproject:\n  name: test\n'
      );

      const result = runCommand(['update']);
      // Should proceed (may fail on npm check, but should not fail on .baton check)
      expect(result.stdout).not.toContain('No .baton directory found');
    });

    it('should handle --devforce flag', () => {
      // Create .baton directory
      if (!existsSync(BATON_DIR)) {
        mkdirSync(BATON_DIR, { recursive: true });
      }

      // Create a minimal project.config.yml
      writeFileSync(
        join(BATON_DIR, 'project.config.yml'),
        'version: 1.0.0\nproject:\n  name: test\n'
      );

      const result = runCommand(['update', '--devforce']);
      // Should proceed in devforce mode (skips npm check)
      expect(result.stdout).toMatch(/Development mode|Checking for file updates/);
    });
  });
});

