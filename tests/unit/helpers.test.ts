import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { cleanupTestDir, setupTestDir, TEST_DIR } from '../helpers/test-utils.js';
import { 
  loadMandatoryItems, 
  getFilesFromDir, 
  getWorkflowFiles,
  listCategoryItems 
} from '../../src/helpers.js';

// Get npm package root (for test environment)
const npmPackageRoot = process.cwd();

describe('Helper Functions (Unit Tests)', () => {
  beforeEach(() => {
    setupTestDir();
  });

  afterEach(() => {
    cleanupTestDir();
    vi.restoreAllMocks();
  });

  describe('loadMandatoryItems', () => {
    it('should load mandatory items from core-init.json', () => {
      const result = loadMandatoryItems(npmPackageRoot);
      
      expect(result).toHaveProperty('agents');
      expect(result).toHaveProperty('workflows');
      expect(result).toHaveProperty('knowledge');
      expect(result.agents).toBeInstanceOf(Set);
      expect(result.workflows).toBeInstanceOf(Set);
      expect(result.knowledge).toBeInstanceOf(Set);
    });
  });

  describe('getFilesFromDir', () => {
    it('should return empty array for non-existent directory', () => {
      const result = getFilesFromDir(join(TEST_DIR, 'non-existent'), '.md');
      expect(result).toEqual([]);
    });

    it('should return files with matching extension', () => {
      const testDir = join(TEST_DIR, 'test-dir');
      mkdirSync(testDir, { recursive: true });
      writeFileSync(join(testDir, 'file1.md'), 'content');
      writeFileSync(join(testDir, 'file2.md'), 'content');
      writeFileSync(join(testDir, 'file3.txt'), 'content'); // Different extension

      const result = getFilesFromDir(testDir, '.md');
      expect(result).toContain('file1');
      expect(result).toContain('file2');
      expect(result).not.toContain('file3');
    });
  });

  describe('getWorkflowFiles', () => {
    it('should return empty array for non-existent directory', () => {
      const result = getWorkflowFiles(join(TEST_DIR, 'non-existent'), '.yml');
      expect(result).toEqual([]);
    });

    it('should return only files, not subdirectories', () => {
      const testDir = join(TEST_DIR, 'workflows');
      mkdirSync(testDir, { recursive: true });
      writeFileSync(join(testDir, 'workflow1.yml'), 'content');
      writeFileSync(join(testDir, 'workflow2.yml'), 'content');

      const result = getWorkflowFiles(testDir, '.yml');
      expect(result).toContain('workflow1');
      expect(result).toContain('workflow2');
    });
  });

  describe('listCategoryItems', () => {
    it('should list items with installed indicators', () => {
      const installedDir = join(TEST_DIR, 'installed');
      const availableDir = join(TEST_DIR, 'available');
      mkdirSync(installedDir, { recursive: true });
      mkdirSync(availableDir, { recursive: true });
      
      writeFileSync(join(installedDir, 'item1.md'), 'content');
      writeFileSync(join(availableDir, 'item2.md'), 'content');

      const mandatoryItems = new Set<string>();
      
      // Mock console.log to capture output
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      listCategoryItems('agent', installedDir, availableDir, '.md', mandatoryItems);
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

