---
description: 
---

# 신규 기능 개발 워크플로우

## Step 1: 설계 분석

- 요구사항을 명확히 파악
- 영향받는 파일 목록 작성
- 백엔드 API 엔드포인트 확인
- 필요한 Zod 스키마 식별
- React Query 캐시 키 설계

검증:

- API 엔드포인트가 백엔드에 존재하는지 확인

## Step 2: 타입 & 스키마 정의

- 환경변수: `lib/env.ts`에서 Zod로 검증된 값 사용
- API 호출: `lib/api/api-client.ts`의 Axios 인스턴스 사용
- Zod 스키마로 API 응답/요청 검증 정의

검증:

```bash
pnpm typecheck
```

- 실패 시 → 타입 수정 후 재검증

## Step 3: API 계층 구현

- `lib/api-client.ts` 또는 `lib/base-resource-client.ts` 활용
- 낙관적 업데이트 필요 시 mutation의 onMutate/onError/onSettled 구현

검증:

```bash
pnpm typecheck
```

## Step 4: 컴포넌트 구현

- 페이지: `app` 에 라우트 추가
- 컴포넌트: `components/` 에 구현
- Page, Layout(유상태), Component 파일은 무조건 `"use client"`로 시작
- shadcn/ui 컴포넌트 활용 (`components/ui/`)
- 전역 상태 필요 시 `store/` 에 Zustand 슬라이스 추가

검증:

```bash
pnpm lint && pnpm typecheck
```

## Step 5: 테스트 작성

- `.agent/workflows/test-unit.md` 가이드 참고

검증:

```bash
pnpm test
```

- 실패 시 → 테스트 또는 구현 수정 후 재검증

## Step 6: 전체 검증

```bash
pnpm validate
```

- lint + typecheck + test + build 모두 통과해야 함
- 실패 시 → 해당 단계로 돌아가 수정

## Step 7: 커밋

- conventional commit 메시지 (`feat: ...`)
- 관련 파일만 스테이징 (git add로 개별 파일 지정)
- 테스트 파일도 함께 커밋