# Test E2E Workflow

This workflow executes high-level integration tests: Playwright for Frontend, Spring Boot Integration Tests for Backend.

## Usage
Run with the feature name.
Example: `/test-e2e Board File Upload` (Frontend)
Example: `/test-e2e User API` (Backend)

## Logic
**Step 0: Detect Context**
- If task implies UI/Browser or checks `frontend/`: **Frontend Mode**
- If task implies API/Database or checks `backend/`: **Backend Mode**

---

## Frontend Mode (Playwright)

### 1. Plan (Frontend)
- **Goal**: Verify user flows (clicks, navigation).
- **Output**: Test plan in `implementation_plan.md`.

### 2. Implement (Frontend)
- **Tool**: Playwright (`tests/*.spec.ts`).
- **Mocking**: Use `app/api/mock/...` if backend is unavailable.
- **Helper**: Use `tests/fixtures/auth.ts` for login.

### 3. Verify (Frontend)
- Command: `pnpm test:e2e tests/...`

---

## Backend Mode (Spring Integration Test)

### 1. Plan (Backend)
- **Goal**: Verify API endpoints with real/embedded DB.
- **Output**: Test plan in `implementation_plan.md`.

### 2. Implement (Backend)
- **Tool**: Spring Boot Test (`@SpringBootTest`).
- **Location**: `src/test/java/.../integration/...`
- **Method**: `MockMvc` or `TestRestTemplate`.
- **Annotation**: `@AutoConfigureMockMvc`, `@Transactional`.

### 3. Verify (Backend)
- Command: `./gradlew test --tests *IntegrationTest`

---

## Final Verification
- Run the verify command.
- If it fails, analyze, fix, and retry.
