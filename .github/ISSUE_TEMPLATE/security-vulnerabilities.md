---
name: Security Vulnerabilities
about: Document and track security vulnerabilities from npm audit
title: "Security: Address npm audit vulnerabilities (5 moderate - esbuild/Vitest)"
labels: ["security", "dependencies", "maintenance"]
assignees: ""
---

## Security Vulnerabilities Summary

After updating dependencies and aligning workspace versions, `npm audit` reports **5 moderate severity vulnerabilities** related to esbuild (transitive dependency of Vitest).

## Current Status

✅ **Fixed:**

- `markdownlint-cli` updated from `0.45.0` to `0.46.0` (fixed high-severity glob command injection vulnerability)

⚠️ **Remaining:**

- 5 moderate vulnerabilities in `esbuild` (via Vitest dependency chain)

## Vulnerability Details

**Vulnerability:** esbuild <=0.24.2  
**Severity:** Moderate  
**CWE:** CWE-346 (Origin Validation Error)  
**CVSS Score:** 5.3  
**Description:** esbuild enables any website to send any requests to the development server and read the response

**Affected Packages:**

- `esbuild` (via vite)
- `vite` (via vite-node)
- `vite-node` (via vitest)
- `vitest` (direct dependency: `^1.6.1`)
- `@vitest/coverage-v8` (direct dependency: `^1.6.1`)

**Fix Available:** Upgrade to `vitest@4.0.14` (breaking change)

## Risk Assessment

**Risk Level:** Low for this project

**Reasons:**

1. **Development-only**: This vulnerability only affects the development server, not production builds
2. **Local development**: The risk requires:
   - Running `vitest` in watch/dev mode
   - Visiting a malicious website while the dev server is running
   - The malicious site making requests to the local dev server
3. **CI/CD**: In CI/CD environments, tests run in isolated containers without browser access
4. **No production impact**: Production builds and published packages are not affected

**Mitigation:**

- Tests are typically run in CI/CD (isolated) or local development (user controls browser)
- The vulnerability requires active exploitation (malicious website + dev server running)
- No risk to end users or production deployments

## Resolution Options

### Option 1: Accept Risk (Current Approach)

**Pros:**

- No breaking changes to test infrastructure
- Low actual risk (dev-only, requires active exploitation)
- Current test suite works correctly (23/23 tests passing)

**Cons:**

- Security audit shows vulnerabilities
- May need to address in future

### Option 2: Upgrade to Vitest 4.0

**Pros:**

- Fixes all vulnerabilities
- Latest features and improvements

**Cons:**

- **Breaking changes** require:
  - Updating `vitest.config.ts` (API changes)
  - Potentially updating test files
  - Testing all 23+ tests to ensure compatibility
  - Risk of test failures during migration

**Required Changes:**

- Update `vitest` from `^1.6.1` to `^4.0.14`
- Update `@vitest/coverage-v8` from `^1.6.1` to `^4.0.14`
- Update `vitest.config.ts` for new API
- Test all existing tests

## Recommendation

**Current Approach:** Accept the moderate risk from esbuild vulnerability because:

- It only affects development environment
- Requires active exploitation (malicious website + dev server)
- No production impact
- Breaking changes in Vitest 4.0 require careful migration

**Future Plan:** Schedule Vitest 4.0 migration as a separate task when:

- Migration guide is more mature
- We have dedicated time for testing
- Breaking changes are well-documented

## References

- [esbuild Vulnerability](https://github.com/advisories/GHSA-67mh-4wv8-2f99)
- [Vitest 4.0 Migration Guide](https://vitest.dev/guide/migration)
- [Security Assessment Document](.baton/notes/repo-restructure/security-vulnerabilities-assessment.md)

## Action Items

- [ ] Decide on approach (accept risk vs. upgrade Vitest)
- [ ] If upgrading: Plan Vitest 4.0 migration
- [ ] If accepting risk: Document decision in project docs
- [ ] Monitor for Vitest 4.0 migration guide updates
