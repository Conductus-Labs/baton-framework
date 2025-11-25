import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { cleanupTestDir, setupTestDir, TEST_DIR } from '../helpers/test-utils.js';
import { listKnowledge } from '../../src/cli/src/commands/knowledge.js';

// Mock console methods to capture output
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
};

// Get npm package root (for test environment)
const npmPackageRoot = resolve(process.cwd(), 'src/cli');
const BATON_DIR = join(TEST_DIR, '.baton');

describe('Knowledge Commands (Unit Tests)', () => {
  beforeEach(() => {
    setupTestDir();
    consoleSpy.log.mockClear();
  });

  afterEach(() => {
    cleanupTestDir();
    vi.restoreAllMocks();
  });

  describe('listKnowledge', () => {
    it('should list knowledge files when .baton directory exists', () => {
      const knowledgeDir = join(BATON_DIR, 'knowledge');
      mkdirSync(knowledgeDir, { recursive: true });
      
      listKnowledge(npmPackageRoot, BATON_DIR);
      
      // Should have called console.log
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it('should handle missing .baton directory gracefully', () => {
      // Should not throw, just show no knowledge files
      expect(() => listKnowledge(npmPackageRoot, BATON_DIR)).not.toThrow();
      // May or may not call console.log if there are no knowledge files
      // The important thing is it doesn't throw
    });
  });
});

