---
description: Fix Frontend bugs (Next.js/React)
---

# 버그 수정 워크플로우 (Frontend)

## Step 1: 버그 재현 확인

- 버그 재현 경로/조건을 명확히 파악
- 관련 코드 파일을 전체 읽기 (생략 없이)
- 에러 메시지, 콘솔 로그, 네트워크 요청 확인

검증:

- 버그 재현 경로가 명확한가?
- 불명확하면 → 사용자에게 추가 정보 요청

## Step 2: 근본 원인 분석

- `.agent/prompts/is.md` 프롬프트 방식으로 분석
- 이슈에 적힌 원인 분석은 무시 (대체로 부정확)
- 코드 경로를 직접 추적:
  - 컴포넌트 → 훅 → API 클라이언트 → 서버 응답
  - 상태 관리: Zustand store → React Query 캐시

검증:

- 근본 원인을 코드 라인 수준으로 특정했는가?
- 특정 못하면 → 관련 파일 범위를 넓혀 재분석

## Step 3: 최소 범위 수정

- 근본 원인에 대한 최소한의 수정만 적용
- 주변 코드 리팩토링, "개선" 금지
- 수정 범위가 예상보다 넓으면 → 사용자에게 알리고 확인 받기

검증:

```bash
cd frontend && pnpm lint && pnpm typecheck
```

## Step 4: 회귀 방지 테스트 작성

- 이 버그를 재현하는 테스트 케이스 작성
- 수정 전에는 실패하고 수정 후에는 통과하는 테스트

검증:

```bash
cd frontend && pnpm test
```

- 새 테스트가 통과하는지 확인
- 기존 테스트가 깨지지 않았는지 확인

## Step 5: 전체 검증

```bash
cd frontend && pnpm validate
```

- lint + typecheck + test + build 모두 통과
- 실패 시 → 해당 단계로 돌아가 수정

