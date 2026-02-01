---
description: 테스트 작성 가이드
---

변경된 코드에 대한 유닛 테스트를 작성한다: $ARGUMENTS

## 규칙

1. 테스트 파일은 소스 파일 옆에 `*.test.ts` 또는 `*.test.tsx`로 생성
2. vitest + @testing-library/react 사용
3. 테스트 설명은 한국어로 작성

## 테스트 구조

```typescript
import { describe, it, expect } from "vitest";

describe("함수/컴포넌트명", () => {
  it("기대 동작을 설명한다", () => {
    // given
    // when
    // then
  });
});
```

## 컴포넌트 테스트

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ComponentName", () => {
  it("렌더링된다", () => {
    render(<ComponentName />);
    expect(screen.getByText("expected text")).toBeInTheDocument();
  });
});
```

## 우선순위

1. 유틸리티 함수 (`lib/`) — 순수 함수 우선
2. 커스텀 훅 (`hooks/`) — renderHook 사용
3. 컴포넌트 (`components/`) — 사용자 인터랙션 중심

## 검증

테스트 작성 후 반드시 `pnpm test` 실행하여 통과 확인.
