import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';
import { cleanupTestDir, setupTestDir, TEST_DIR } from '../helpers/test-utils.js';
import { listAgents, addAgent, removeAgent, updateAgent } from '../../src/commands/agent.js';
import * as helpers from '../../src/helpers.js';

// Mock console methods to capture output
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

// Get npm package root (for test environment)
const npmPackageRoot = process.cwd();
const BATON_DIR = join(TEST_DIR, '.baton');
const AGENTS_DIR = join(BATON_DIR, 'agents');

describe('Agent Commands (Unit Tests)', () => {
  beforeEach(() => {
    setupTestDir();
    consoleSpy.log.mockClear();
    consoleSpy.error.mockClear();
    // Mock process.exit to prevent tests from actually exiting
    vi.spyOn(process, 'exit').mockImplementation((code?: number) => {
      throw new Error(`process.exit(${code})`);
    });
    // Mock promptConfirmation to return false by default (for update tests)
    vi.spyOn(helpers, 'promptConfirmation').mockResolvedValue(false);
  });

  afterEach(() => {
    cleanupTestDir();
    vi.restoreAllMocks();
  });

  describe('listAgents', () => {
    it('should list agents when .baton directory exists', () => {
      mkdirSync(AGENTS_DIR, { recursive: true });
      
      listAgents(npmPackageRoot, BATON_DIR);
      
      // Should have called console.log
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it('should handle missing .baton directory gracefully', () => {
      // Should not throw, just show no agents
      expect(() => listAgents(npmPackageRoot, BATON_DIR)).not.toThrow();
      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe('addAgent', () => {
    it('should fail when agent does not exist in source', () => {
      try {
        addAgent('non-existent-agent', npmPackageRoot, BATON_DIR);
        expect.fail('Should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('process.exit');
        expect(consoleSpy.error).toHaveBeenCalledWith(
          expect.stringContaining('not found'),
          expect.anything()
        );
      }
    });

    it('should fail when agent is already installed', () => {
      mkdirSync(AGENTS_DIR, { recursive: true });
      writeFileSync(
        join(AGENTS_DIR, 'test-agent.md'),
        '---\nversion: 1.0.0\n---\n# Test Agent'
      );

      // First check if source exists - if not, it will fail before checking if installed
      // For this test, we need the source to exist, so we'll create it
      const sourceDir = join(npmPackageRoot, 'src', 'core', 'agents');
      mkdirSync(sourceDir, { recursive: true });
      writeFileSync(
        join(sourceDir, 'test-agent.md'),
        '---\nversion: 1.0.0\n---\n# Test Agent'
      );

      try {
        addAgent('test-agent', npmPackageRoot, BATON_DIR);
        expect.fail('Should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('process.exit');
        expect(consoleSpy.error).toHaveBeenCalledWith(
          expect.stringContaining('already installed'),
          expect.anything()
        );
      }
    });
  });

  describe('removeAgent', () => {
    it('should fail when agent is not installed', () => {
      try {
        removeAgent('non-existent-agent', npmPackageRoot, BATON_DIR);
        expect.fail('Should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('process.exit');
        expect(consoleSpy.error).toHaveBeenCalledWith(
          expect.stringContaining('not installed'),
          expect.anything()
        );
      }
    });

    it('should fail when trying to remove mandatory agent', () => {
      mkdirSync(AGENTS_DIR, { recursive: true });
      writeFileSync(
        join(AGENTS_DIR, 'baton-agent.md'),
        '---\nversion: 1.0.0\n---\n# Baton Agent'
      );

      try {
        removeAgent('baton-agent', npmPackageRoot, BATON_DIR);
        expect.fail('Should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('process.exit');
        expect(consoleSpy.error).toHaveBeenCalledWith(
          expect.stringContaining('mandatory'),
          expect.anything()
        );
      }
    });
  });

  describe('updateAgent', () => {
    it('should fail when agent is not installed', async () => {
      // Create source file so it doesn't exit early
      const sourceDir = join(npmPackageRoot, 'src', 'core', 'agents');
      mkdirSync(sourceDir, { recursive: true });
      writeFileSync(
        join(sourceDir, 'test-agent.md'),
        '---\nversion: 1.0.0\n---\n# Test Agent'
      );

      // Don't create dest file - should fail with "not installed"
      try {
        await updateAgent('test-agent', npmPackageRoot, BATON_DIR);
        expect.fail('Should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('process.exit');
        // Check if console.error was called with "not installed" message
        const errorCalls = consoleSpy.error.mock.calls.flat().join(' ');
        expect(errorCalls).toContain('not installed');
      }
    });

    it('should fail when agent does not exist in source', async () => {
      // Don't create source - should fail with "not found"
      try {
        await updateAgent('non-existent-agent', npmPackageRoot, BATON_DIR);
        expect.fail('Should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('process.exit');
        // Check if console.error was called with "not found" message
        const errorCalls = consoleSpy.error.mock.calls.flat().join(' ');
        expect(errorCalls).toContain('not found');
      }
    });
  });
});

