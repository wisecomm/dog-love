# Dog-Love Frontend — Agent Instructions

## Tech Stack

- Next.js 16 (App Router, Hybrid SPA)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 + shadcn/ui
- React Query + Zustand + React Hook Form + Zod
- pnpm (필수, npm/yarn 사용 금지)

## Commands

```bash
pnpm dev            # 개발 서버 (http://localhost:3000)
pnpm build          # 프로덕션 빌드
pnpm lint           # ESLint 검사
pnpm typecheck      # TypeScript 타입 검사 (tsc --noEmit)
pnpm format:check   # Prettier 포맷 검사
pnpm format:fix     # Prettier 자동 수정
pnpm test           # vitest 유닛 테스트
pnpm test:watch     # vitest watch 모드
pnpm test:coverage  # 커버리지 포함 테스트 (70% 임계값)
pnpm test:e2e       # Playwright E2E 테스트
pnpm validate       # 전체 검증 (lint + typecheck + test + build)
```

## 코드 수정 후 필수 검증 절차

코드를 수정한 후 반드시 다음 순서로 검증할 것:

1. `pnpm lint` — ESLint 통과 확인
2. `pnpm typecheck` — 타입 에러 없음 확인
3. `pnpm test` — 유닛 테스트 통과 확인
4. `pnpm build` — 빌드 성공 확인

실패 시 스스로 수정하고 다시 검증할 것. 모든 검증을 통과할 때까지 반복.

한 번에 실행: `pnpm validate`

## 커밋 규칙

- **모든 검증(`pnpm validate`)을 통과한 후에만 커밋**할 것
- 커밋 메시지는 conventional commits 형식 사용:
  - `feat:` 새 기능
  - `fix:` 버그 수정
  - `refactor:` 리팩토링
  - `style:` 포맷/스타일 변경
  - `docs:` 문서 변경
  - `test:` 테스트 추가/수정

## 코딩 컨벤션

- 컴포넌트: `PascalCase` named export (`export function MyComponent`)
- 유틸/훅: `camelCase` named export
- 파일명: `kebab-case.tsx`
- Path alias: `@/*` (프로젝트 루트)
- UI 컴포넌트: `components/ui/` (shadcn/ui)
- API 클라이언트: `lib/api/`
- 전역 상태: `store/`
- React Query 훅: `hooks/query/`

## 주의사항

- `"use client"` 디렉티브: 클라이언트 컴포넌트에만 사용
- 환경변수: `lib/env.ts`에서 Zod로 검증된 값 사용
- API 호출: `lib/api/api-client.ts`의 Axios 인스턴스 사용
- 불필요한 코드, 주석, docstring 추가 금지
- 보안 취약점 (XSS, injection 등) 주의

## 테스트 가이드

- 프레임워크: vitest + @testing-library/react
- 테스트 파일: 소스 파일 옆에 `*.test.ts` 또는 `*.test.tsx`
- 커버리지 임계값: 70% (lines/branches/functions/statements)
- 코드 수정 시 관련 테스트도 함께 작성/수정할 것
- 테스트 설명은 한국어로 작성

## 에이전트 전용 프롬프트 (.pi/)

- `.pi/prompts/pr.md` — PR 리뷰 (Good/Bad/Ugly 구조)
- `.pi/prompts/is.md` — 이슈 분석 (버그 근본 원인 추적, 기능 요청 구현 제안)
- `.pi/prompts/test.md` — 테스트 작성 가이드

## 에이전트 워크플로우 (.agent/workflows/)

복잡한 작업은 해당 워크플로우를 따라 단계별로 수행할 것. 각 단계의 검증을 통과해야 다음 단계로 진행.

- `.agent/workflows/deploy.md` — 배포 (사전 검증 → 환경별 빌드 → 결과 검증 → 배포)
- `.agent/workflows/new-feature.md` — 신규 기능 (설계 → 타입 → API → 컴포넌트 → 테스트 → 검증)
- `.agent/workflows/bug-fix.md` — 버그 수정 (재현 → 원인 분석 → 최소 수정 → 회귀 테스트 → 검증)
- `.agent/workflows/refactor.md` — 리팩토링 (범위 정의 → 기존 테스트 확인 → 단계별 수정 → 검증)
