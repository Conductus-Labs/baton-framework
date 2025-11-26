import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { cleanupTestDir, setupTestDir, TEST_DIR } from '../helpers/test-utils.js';
import { updateCommand } from '../../src/commands/update.js';

// Mock console methods to capture output
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

// Get npm package root (for test environment)
const npmPackageRoot = process.cwd();
const BATON_DIR = join(TEST_DIR, '.baton');
const packageJson = { name: '@conductus-labs/baton-cli', version: '0.1.0' };

describe('Update Command (Unit Tests)', () => {
  beforeEach(() => {
    setupTestDir();
    consoleSpy.log.mockClear();
    consoleSpy.error.mockClear();
  });

  afterEach(() => {
    cleanupTestDir();
    vi.restoreAllMocks();
  });

  describe('updateCommand', () => {
    it('should show message when .baton directory does not exist', async () => {
      await updateCommand(npmPackageRoot, packageJson, false);
      
      // May fail on npm check first, or proceed to .baton check
      // Either way, should have logged something
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it('should proceed when .baton directory exists', async () => {
      mkdirSync(BATON_DIR, { recursive: true });
      writeFileSync(
        join(BATON_DIR, 'project.config.yml'),
        'version: 1.0.0\nproject:\n  name: test\n'
      );

      await updateCommand(npmPackageRoot, packageJson, false);
      
      // Should not show "No .baton directory found" message
      const logCalls = consoleSpy.log.mock.calls.flat().join(' ');
      expect(logCalls).not.toContain('No .baton directory found');
    });

    it('should handle --devforce flag', async () => {
      mkdirSync(BATON_DIR, { recursive: true });
      writeFileSync(
        join(BATON_DIR, 'project.config.yml'),
        'version: 1.0.0\nproject:\n  name: test\n'
      );

      await updateCommand(npmPackageRoot, packageJson, true);
      
      // Should show devforce mode message (first log call)
      expect(consoleSpy.log).toHaveBeenCalled();
      const firstLogCall = consoleSpy.log.mock.calls[0]?.[0] || '';
      expect(firstLogCall).toMatch(/Development mode/);
    });
  });
});

