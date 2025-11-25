import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanupTestDir, setupTestDir, runCommand, TEST_DIR } from '../helpers/test-utils.js';

describe('Baton CLI', () => {
  beforeEach(() => {
    setupTestDir();
  });

  afterEach(() => {
    cleanupTestDir();
  });

  describe('Version and Help', () => {
    it('should show version with --version flag', () => {
      const result = runCommand(['--version']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('0.1.0');
    });

    it('should show version with -v flag', () => {
      const result = runCommand(['-v']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('0.1.0');
    });

    it('should show help with --help flag', () => {
      const result = runCommand(['--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('baton');
      expect(result.stdout).toContain('Commands:');
    });

    it('should show help by default', () => {
      const result = runCommand([]);
      // Help command may exit with non-zero, but should show help text
      expect(result.stdout).toContain('baton');
      expect(result.stdout).toContain('Commands:');
    });
  });

  describe('Agent Commands', () => {
    it('should show agent help', () => {
      const result = runCommand(['agent']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('agent');
    });

    it('should list agents', () => {
      const result = runCommand(['agent', 'ls']);
      expect(result.exitCode).toBe(0);
      // May show "No agent items found" if no agents are installed
      expect(result.stdout).toMatch(/Agents:|No agent items found/);
    });
  });

  describe('Workflow Commands', () => {
    it('should show workflow help', () => {
      const result = runCommand(['workflow']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('workflow');
    });

    it('should list workflows', () => {
      const result = runCommand(['workflow', 'ls']);
      expect(result.exitCode).toBe(0);
      // May show "No workflow items found" if no workflows are installed
      expect(result.stdout).toMatch(/Workflows:|No workflow items found/);
    });
  });

  describe('Knowledge Commands', () => {
    it('should show knowledge help', () => {
      const result = runCommand(['knowledge']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('knowledge');
    });

    it('should list knowledge files', () => {
      const result = runCommand(['knowledge', 'ls']);
      expect(result.exitCode).toBe(0);
      // May show "No knowledge items found" if no knowledge files are installed
      expect(result.stdout).toMatch(/Knowledge|No knowledge items found/);
    });
  });

  describe('Update Command', () => {
    it('should show update help', () => {
      const result = runCommand(['update', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('update');
    });
  });
});

