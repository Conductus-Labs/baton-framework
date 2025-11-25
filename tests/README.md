# Baton CLI Tests

This directory contains tests for the Baton CLI tool.

## Test Structure

- `unit/` - Unit tests for individual CLI commands
- `integration/` - Integration tests that test full command workflows
- `helpers/` - Test utilities and helper functions
- `fixtures/` - Test fixtures and mock data

## Test Directory

All tests use the `.test/` directory in the project root as a temporary working directory. This directory is automatically cleaned up before and after each test to ensure test isolation.

## Running Tests

**Important**: Tests must be run from the `src/cli` directory, not from the `tests` directory.

```bash
# Navigate to the CLI directory
cd src/cli

# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

The test configuration is set up to find tests in the `tests/` directory at the project root, but the npm scripts are defined in `src/cli/package.json`.

### Coverage Notes

The coverage command (`npm run test:coverage`) will run successfully, but may show 0% coverage for integration tests that run the CLI as an external process. This is expected because:

- Integration tests execute the compiled CLI binary (`bin/baton.js`) as a separate process
- Coverage instrumentation only works for code that's imported and executed within the test process
- To get meaningful coverage, you would need to import and test functions directly (unit tests)

The coverage feature is functional and will work correctly for unit tests that import source code directly.

## Test Framework

Tests use [Vitest](https://vitest.dev/), a fast Vite-native test framework that works seamlessly with TypeScript and ES modules.

## Writing Tests

### Basic Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanupTestDir, setupTestDir, runCommand } from '../helpers/test-utils.js';

describe('My Feature', () => {
  beforeEach(() => {
    setupTestDir(); // Clean and create .test directory
  });

  afterEach(() => {
    cleanupTestDir(); // Clean up .test directory
  });

  it('should do something', () => {
    const result = runCommand(['my', 'command']);
    expect(result.exitCode).toBe(0);
  });
});
```

### Test Utilities

The `test-utils.ts` helper provides:

- `cleanupTestDir()` - Remove the `.test` directory
- `setupTestDir()` - Create a clean `.test` directory
- `runCommand(args)` - Run a CLI command and get the result
- `testFileExists(path)` - Check if a file exists in `.test`
- `readTestFile(path)` - Read a file from `.test`
- `writeTestFile(path, content)` - Write a file to `.test`
- `testDirExists(path)` - Check if a directory exists in `.test`

## Important Notes

1. **Always clean up**: Tests must clean up the `.test` directory to prevent test pollution
2. **Use helpers**: Use the test utilities instead of directly manipulating files
3. **Isolation**: Each test should be independent and not rely on state from other tests

