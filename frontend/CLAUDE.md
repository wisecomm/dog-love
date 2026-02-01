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
pnpm test:e2e       # Playwright E2E 테스트
pnpm validate       # 전체 검증 (lint + typecheck + build)
```

## 코드 수정 후 필수 검증 절차

코드를 수정한 후 반드시 다음 순서로 검증할 것:

1. `pnpm lint` — ESLint 통과 확인
2. `pnpm typecheck` — 타입 에러 없음 확인
3. `pnpm build` — 빌드 성공 확인

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
