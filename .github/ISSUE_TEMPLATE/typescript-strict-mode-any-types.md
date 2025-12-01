---
name: TypeScript Strict Mode and `any` Types
about: Refactor codebase to use strict TypeScript and eliminate `any` types
title: "Refactor: Enable TypeScript Strict Mode and Replace `any` Types"
labels: []
assignees: []
---

## Summary

The codebase currently has **42 instances** of `any` types that should be replaced with proper TypeScript types. Additionally, TypeScript should be configured to use strict mode to prevent future use of `any` types.

## Current Status

- **ESLint warnings**: 42 `@typescript-eslint/no-explicit-any` warnings
- **TypeScript config**: Not using strict mode
- **Impact**: Reduced type safety, potential runtime errors, decreased IDE support

## Locations

The `any` types are primarily found in:

1. **Validation functions** (`packages/core/src/validation/`):

   - `agent-validator.ts` (8 instances)
   - `knowledge-validator.ts` (4 instances)
   - `pattern-validator.ts` (6 instances)
   - `workflow-validator.ts` (11 instances)

2. **Type definitions** (`packages/core/src/types/`):

   - `context.ts` (1 instance: `RepositoryStatistics[key: string]: any`)
   - `workflow.ts` (2 instances: `Parameters[key: string]: any`, `SubFlow.parameters?: Record<string, any>`)

3. **Utility functions** (`packages/core/src/utils/`):

   - `agent-loader.ts` (2 instances)
   - `file-parser.ts` (4 instances)
   - `knowledge-loader.ts` (2 instances)

4. **Example files** (`docs/integration-examples/`):
   - `full-integration.ts` (1 instance: function parameter)

## Proposed Solution

### Phase 1: Enable TypeScript Strict Mode

1. Update `tsconfig.json` (root and all packages) to include:

   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true,
       "strictFunctionTypes": true,
       "strictBindCallApply": true,
       "strictPropertyInitialization": true,
       "noImplicitThis": true,
       "alwaysStrict": true
     }
   }
   ```

2. Update ESLint config to make `@typescript-eslint/no-explicit-any` an **error** instead of a warning:
   ```javascript
   rules: {
     "@typescript-eslint/no-explicit-any": "error"
   }
   ```

### Phase 2: Replace `any` Types

1. **Validation functions**: Create proper type guards and validation schemas

   - Use `unknown` instead of `any` for input validation
   - Implement proper type narrowing with type guards

2. **Type definitions**: Replace `any` with specific types or generics

   - `RepositoryStatistics[key: string]: any` → `RepositoryStatistics[key: string]: unknown` or specific union types
   - `Parameters[key: string]: any` → `Parameters[key: string]: unknown` or specific parameter types
   - `SubFlow.parameters?: Record<string, any>` → `SubFlow.parameters?: Record<string, unknown>` or typed parameter object

3. **Utility functions**: Use generics and proper type inference

   - Replace `any` return types with proper generic types
   - Use `unknown` for truly unknown data, then validate and narrow

4. **Example files**: Use proper types for demonstration purposes

### Phase 3: Testing and Validation

1. Run full test suite to ensure no breaking changes
2. Verify all TypeScript compilation passes
3. Ensure ESLint passes with no errors
4. Update documentation if needed

## Benefits

- **Type Safety**: Catch errors at compile time instead of runtime
- **Better IDE Support**: Improved autocomplete, refactoring, and navigation
- **Code Quality**: More maintainable and self-documenting code
- **Team Confidence**: Reduced risk of type-related bugs

## Estimated Effort

- **Phase 1** (Strict mode): ~1-2 hours
- **Phase 2** (Replace `any` types): ~4-8 hours (depending on complexity)
- **Phase 3** (Testing): ~1-2 hours
- **Total**: ~6-12 hours

## Acceptance Criteria

- [ ] TypeScript strict mode enabled in all `tsconfig.json` files
- [ ] ESLint `@typescript-eslint/no-explicit-any` set to "error"
- [ ] All 42 `any` types replaced with proper types
- [ ] All tests pass
- [ ] TypeScript compilation succeeds with no errors
- [ ] ESLint passes with 0 errors
- [ ] Code review completed

## Notes

- This is a **non-breaking change** from a runtime perspective
- May require updates to test files if they rely on `any` types
- Consider creating a migration guide for contributors
