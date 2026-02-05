---
description: Generate Vitest unit tests for a specific component, hook, or utility.
---

# Generate Unit Test Workflow

This workflow guides the AI to generate comprehensive unit tests using internal `vi.fn()`, `@testing-library/react`, and `renderHook`.

## Usage
Run with the target file path.
Example: `/generate-test frontend/hooks/use-auth.ts`

## Steps

### 1. Analyze Target Code
- Read the target file content.
- Identify:
  - Exported functions/components.
  - Props / Arguments.
  - Return values / Rendered output.
  - Edge cases (null, empty, error states).
  - External dependencies to mock (imports).

### 2. Check Existing Tests
- Look for an existing test file (e.g., `*.test.ts` or `*.test.tsx`).
- If it exists, read it to understand current coverage.
- If not, create a new file next to the source (colocation).

### 3. Generate Test Plan
- Propose a list of test cases covering:
  - **Happy Path**: Correct input returns correct output/UI.
  - **Edge Cases**: Empty strings, min/max values, boundary conditions.
  - **Error States**: Exception handling, error message display.
  - **Interactions**: Button clicks, form submissions (using `fireEvent` or `userEvent`).

### 4. Implement Tests (Vitest)
- Write the test code using:
  - `describe`, `it`, `expect` from `vitest`.
  - `render`, `screen` from `@testing-library/react`.
  - `renderHook`, `act` for custom hooks.
  - `vi.fn()` for mocking callbacks.
- **Rule**: Do not use `any`. Use proper types or mock types.

### 5. Verify & Refine
- Run the test command for the specific file:
  `pnpm test frontend/path/to/test-file.ts`
- If fails:
  - Analyze error message.
  - Correct the test code or mock implementation.
  - Retry.
- Check coverage if requested:
  `pnpm test:coverage`
