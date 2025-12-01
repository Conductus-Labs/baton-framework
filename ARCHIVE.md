# Archived Components

**Date:** 2025-12-01  
**Status:** Archiving in Progress  
**Purpose:** Document archived CLI components from Baton Framework repository restructuring

## Overview

As part of the repository restructuring from CLI-based to npm package-based architecture, the original CLI implementation has been archived. The CLI served as a proof of concept and initial implementation, but has been replaced by:

1. **npm packages** - Modular packages for framework consumption
2. **RHYTHM Board** - Open-source platform for agent management (future)
3. **Baton Platform** - Paid SaaS platform (future)

## Archive Strategy

**Preservation Method:**

- Git tag: `archive/cli-v1.0.0` - Preserves CLI code in git history
- Files removed from main branch but remain accessible via git history
- This document serves as reference for what was archived

**Accessing Archived Code:**

```bash
# View archived CLI code
git show archive/cli-v1.0.0

# Checkout archived version (for reference only)
git checkout archive/cli-v1.0.0
```

## Archived Components

### CLI Entry Point

- **File:** `bin/baton.js`
- **Type:** CLI entry point script
- **Version:** 1.0.0
- **Reason:** CLI replaced by npm packages and RHYTHM Board

### CLI Command Files

- **File:** `src/index.ts`
  - Main CLI program (Commander.js setup)
- **File:** `src/commands/init.ts`
  - Init command handler
  - Functionality replaced by RHYTHM Board initialization
- **File:** `src/commands/agent.ts`
  - Agent management commands
  - Functionality replaced by RHYTHM Board agent management
- **File:** `src/commands/workflow.ts`
  - Workflow management commands
  - Functionality replaced by RHYTHM Board workflow management
- **File:** `src/commands/knowledge.ts`
  - Knowledge file management commands
  - Functionality replaced by RHYTHM Board knowledge management
- **File:** `src/commands/update.ts`
  - Update command handler
  - Functionality replaced by npm package updates
- **File:** `src/commands/uninstall.ts`
  - Uninstall command handler
  - Functionality replaced by npm uninstall

### CLI Support Files

- **File:** `src/config.ts`
  - CLI-specific configuration functions
- **File:** `src/file-operations.ts`
  - File operation utilities (reviewed, no utilities extracted)
- **File:** `src/helpers.ts`
  - CLI helper functions (reviewed, no utilities extracted)
- **File:** `src/utils.ts`
  - CLI utility functions (reviewed, no utilities extracted)

### CLI Test Files

- **File:** `tests/integration/cli-agent.test.ts`
- **File:** `tests/integration/cli-init.test.ts`
- **File:** `tests/integration/cli-update.test.ts`
- **File:** `tests/unit/cli.test.ts`
- **File:** `tests/unit/cli-utils.test.ts`

## Utility Extraction

**Status:** ✅ Complete

All CLI files were reviewed for utilities that could be extracted to `@conductus-labs/baton-core`. The following files were reviewed:

- `src/utils.ts` - No framework-agnostic utilities found
- `src/helpers.ts` - No framework-agnostic utilities found
- `src/file-operations.ts` - No framework-agnostic utilities found

All useful utilities were already present in `packages/core/src/utils/` or were not needed for the package-based architecture.

## Migration Path

**From CLI to Packages:**

1. **Install packages:**

   ```bash
   npm install @conductus-labs/baton-core \
               @conductus-labs/baton-agents \
               @conductus-labs/baton-cognitive-patterns \
               @conductus-labs/baton-knowledge \
               @conductus-labs/baton-workflows
   ```

2. **Use framework components:**

   ```typescript
   import { loadAgent, loadPattern } from "@conductus-labs/baton-core";
   ```

3. **For agent management:**
   - Use RHYTHM Board (when available)
   - Or use packages directly in your application

**See:** `docs/integration-guide.md` for detailed integration instructions.

## Git Tag Reference

**Tag:** `archive/cli-v1.0.0`  
**Created:** 2025-12-01  
**Purpose:** Preserve CLI code in git history

**Verify tag exists:**

```bash
git tag -l "archive/*"
git show archive/cli-v1.0.0
```

## Summary

**Total Files Archived:** 17 files

- 1 entry point
- 6 command files
- 4 support files
- 5 test files
- 1 package.json update (bin field removed)

**Status:** ✅ All CLI components archived and removed from main branch

**Verification:**

- ✅ Git tag `archive/cli-v1.0.0` created and accessible
- ✅ CLI files removed from working directory
- ✅ `package.json` verified clean (no `bin` field, no CLI keywords)
- ✅ All CLI files preserved in git history

**Replacement:**

- npm packages for framework consumption
- RHYTHM Board for agent management (future)
- Baton Platform for SaaS features (future)

## Verification Commands

```bash
# Verify tag exists
git tag -l "archive/*"

# View archived CLI code
git show archive/cli-v1.0.0:bin/baton.js

# List all archived CLI files
git ls-tree -r archive/cli-v1.0.0 --name-only | grep -E "(bin/baton|src/index|src/commands)"
```

---

**Created:** 2025-12-01  
**Last Updated:** 2025-12-01  
**Status:** ✅ Archiving Complete
