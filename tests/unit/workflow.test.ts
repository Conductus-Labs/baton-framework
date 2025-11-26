import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { cleanupTestDir, setupTestDir, TEST_DIR } from '../helpers/test-utils.js';
import { listWorkflows } from '../../src/commands/workflow.js';

// Mock console methods to capture output
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
};

// Get npm package root (for test environment)
const npmPackageRoot = process.cwd();
const BATON_DIR = join(TEST_DIR, '.baton');

describe('Workflow Commands (Unit Tests)', () => {
  beforeEach(() => {
    setupTestDir();
    consoleSpy.log.mockClear();
  });

  afterEach(() => {
    cleanupTestDir();
    vi.restoreAllMocks();
  });

  describe('listWorkflows', () => {
    it('should list workflows when .baton directory exists', () => {
      const workflowsDir = join(BATON_DIR, 'workflows');
      mkdirSync(workflowsDir, { recursive: true });
      
      listWorkflows(npmPackageRoot, BATON_DIR);
      
      // Should have called console.log
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it('should handle missing .baton directory gracefully', () => {
      // Should not throw, just show no workflows
      expect(() => listWorkflows(npmPackageRoot, BATON_DIR)).not.toThrow();
      // May or may not call console.log if there are no workflows
      // The important thing is it doesn't throw
    });
  });
});

