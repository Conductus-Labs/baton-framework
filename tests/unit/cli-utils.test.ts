import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { join, resolve } from 'path';
// Import directly from source utils module (no CLI setup code)
import { 
  getAgentVersion, 
  getFileVersion, 
  compareVersions 
} from '../../src/cli/src/utils.js';
import { cleanupTestDir, setupTestDir, TEST_DIR } from '../helpers/test-utils.js';

describe('CLI Utility Functions', () => {
  beforeEach(() => {
    setupTestDir();
  });

  afterEach(() => {
    cleanupTestDir();
  });

  describe('getAgentVersion', () => {
    it('should extract version from YAML frontmatter', () => {
      const testFile = join(TEST_DIR, 'test-agent.md');
      writeFileSync(testFile, `---
version: 1.2.3
---
# Test Agent
Content here
`);
      
      const version = getAgentVersion(testFile);
      expect(version).toBe('1.2.3');
    });

    it('should return null if file does not exist', () => {
      const version = getAgentVersion(join(TEST_DIR, 'non-existent.md'));
      expect(version).toBeNull();
    });

    it('should return null if no version in frontmatter', () => {
      const testFile = join(TEST_DIR, 'test-agent.md');
      writeFileSync(testFile, `---
name: test
---
# Test Agent
`);
      
      const version = getAgentVersion(testFile);
      expect(version).toBeNull();
    });
  });

  describe('getFileVersion', () => {
    it('should extract version from YAML file', () => {
      const testFile = join(TEST_DIR, 'test.yml');
      writeFileSync(testFile, `version: 2.0.0
name: test
`);
      
      const version = getFileVersion(testFile, '.yml');
      expect(version).toBe('2.0.0');
    });

    it('should extract version from JSON file', () => {
      const testFile = join(TEST_DIR, 'test.json');
      writeFileSync(testFile, JSON.stringify({ version: '3.1.0', name: 'test' }));
      
      const version = getFileVersion(testFile, '.json');
      expect(version).toBe('3.1.0');
    });

    it('should return null if file does not exist', () => {
      const version = getFileVersion(join(TEST_DIR, 'non-existent.yml'), '.yml');
      expect(version).toBeNull();
    });
  });

  describe('compareVersions', () => {
    it('should return positive number if first version is newer', () => {
      expect(compareVersions('1.1.0', '1.0.0')).toBeGreaterThan(0);
      expect(compareVersions('2.0.0', '1.9.9')).toBeGreaterThan(0);
      expect(compareVersions('1.0.1', '1.0.0')).toBeGreaterThan(0);
    });

    it('should return negative number if first version is older', () => {
      expect(compareVersions('1.0.0', '1.1.0')).toBeLessThan(0);
      expect(compareVersions('1.9.9', '2.0.0')).toBeLessThan(0);
      expect(compareVersions('1.0.0', '1.0.1')).toBeLessThan(0);
    });

    it('should return zero if versions are equal', () => {
      expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
      expect(compareVersions('2.5.3', '2.5.3')).toBe(0);
    });

    it('should handle patch version differences', () => {
      expect(compareVersions('1.0.1', '1.0.0')).toBeGreaterThan(0);
      expect(compareVersions('1.0.0', '1.0.1')).toBeLessThan(0);
    });

    it('should handle minor version differences', () => {
      expect(compareVersions('1.1.0', '1.0.0')).toBeGreaterThan(0);
      expect(compareVersions('1.0.0', '1.1.0')).toBeLessThan(0);
    });

    it('should handle major version differences', () => {
      expect(compareVersions('2.0.0', '1.9.9')).toBeGreaterThan(0);
      expect(compareVersions('1.9.9', '2.0.0')).toBeLessThan(0);
    });
  });
});

