---
description: Generate comprehensive unit tests for Frontend (Vitest) and Backend (JUnit 5).
---

# Unit Test Workflow

This workflow guides the AI to generate comprehensive unit tests for both Frontend (Vitest) and Backend (JUnit 5).

## Usage
Run with the target file path.
Example: `/test-unit frontend/hooks/use-auth.ts`
Example: `/test-unit backend/src/main/java/com/example/service/UserService.java`

## Logic
**Step 0: Detect Type**
- If file extension is `.ts` or `.tsx`: **Frontend Mode**
- If file extension is `.java`: **Backend Mode**
- 테스트 파일: 소스 파일 옆에 `*.test.ts` 또는 `*.test.tsx`
- 코드 수정 시 관련 테스트도 함께 작성/수정할 것
- 테스트 설명은 한국어로 작성

---

## Frontend Mode (Vitest)

### 1. Analyze (Frontend)
- Identify props, return values, hooks, and dependencies.
- Refer to `frontend-guidelines/SKILL.md`.

### 2. Plan (Frontend)
- **Happy Path**: Correct input -> Correct output/UI.
- **Edge Cases**: Empty, null, min/max.
- **Interactions**: Clicks, forms (use `fireEvent`/`userEvent`).

### 3. Implement (Frontend)
- Tool: `vitest`, `@testing-library/react`.
- Methods: `render`, `renderHook`, `vi.fn()`.
- **Constraint**: Do NOT use `any`. Use `vi.mock` for dependencies.

### 4. Verify (Frontend)
- Command: `pnpm test <path>`

---

## Backend Mode (JUnit 5)

### 1. Analyze (Backend)
- Identify public methods, return values, and external dependencies (Repositories, other Services).
- Refer to `backend-guidelines/SKILL.md`.

### 2. Plan (Backend)
- **Success Scenarios**: Valid inputs return expected DTOs/Entities.
- **Failure Scenarios**: Invalid inputs throw custom Exceptions.
- **Mocking**: Identify which Beans need `@Mock`.

### 3. Implement (Backend)
- Tool: JUnit 5, Mockito, AssertJ.
- annotations: `@ExtendWith(MockitoExtension.class)`.
- **Naming**: `[TargetClass]Test.java` in `src/test/java/...` (mirror package structure).
- **Structure**:
  - `private @Mock Repository repository;`
  - `private @InjectMocks Service service;`
  - Use `given(mock.method()).willReturn(...)` or `when().thenReturn()`.
  - Use `assertThat(result).isEqualTo(...)`.

### 4. Verify (Backend)
- Command: `./gradlew test --tests *[TestClassName]`
  (Example: `./gradlew test --tests *UserServiceTest`)

---

## Final Verification
- Run the verify command corresponding to the mode.
- If it fails, analyze the error log, fix the code, and retry.