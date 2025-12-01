---
type: bug
id: BUG-001
title: Password validation allows weak passwords
status: open
severity: medium
priority: high
created: 2025-11-19
reported_by: qa-agent
parent: WU-001
environment: development
---

# Bug: Password validation allows weak passwords

## Description

The password validation in the registration endpoint is not properly enforcing password complexity requirements. Weak passwords like "password123" are being accepted when they should be rejected.

## Reproduction Steps

1. Navigate to registration form
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Enter confirmPassword: `password123`
5. Submit form
6. **Actual Result:** Registration succeeds
7. **Expected Result:** Registration should fail with password complexity error

## Environment

- **Environment:** Development
- **Browser:** Chrome 120
- **API Version:** v1.0.0
- **Date:** 2025-11-19

## Impact

**Severity:** Medium  
**Priority:** High

**Impact Description:**
- Security risk: Weak passwords compromise user account security
- Affects all new user registrations
- Must be fixed before production deployment

## Root Cause

The password validation regex in `register.validator.ts` is not correctly checking for special characters. The current regex only checks for uppercase, lowercase, and numbers, but not special characters.

## Expected Behavior

Password validation should reject passwords that don't meet all complexity requirements:
- At least 8 characters
- Contains uppercase letter
- Contains lowercase letter
- Contains number
- Contains special character (!@#$%^&*)

## Proposed Solution

Update the password validation regex in `register.validator.ts` to include special character check:

```typescript
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
```

## Related Items

- **Parent Work Unit:** [WU-001: User Registration](work-units/WU-001-user-registration.md)
- **Related Feature:** [FEAT-001: User Authentication](features/FEAT-001-user-authentication.md)
- **Related Agent Task:** [TASK-003: Input Validation](agent-tasks/TASK-003-input-validation.md)

## Resolution

**Status:** Open  
**Assigned To:** backend-agent  
**Target Fix:** Before WU-001 completion

