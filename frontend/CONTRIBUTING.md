# Contributing Guide

## 개발 환경 설정

```bash
pnpm install
pnpm dev
```

- Node.js 22+
- pnpm 필수 (npm/yarn 사용 금지)
- 에디터: ESLint + Prettier 플러그인 권장

## 브랜치 전략

- `main` — 프로덕션 브랜치
- `feat/기능명` — 신규 기능
- `fix/버그명` — 버그 수정
- `refactor/대상` — 리팩토링

## PR 제출 전 체크리스트

```bash
pnpm validate   # lint + typecheck + test + build 모두 통과
```

- [ ] `pnpm validate` 통과
- [ ] 관련 테스트 작성/수정 (`*.test.ts`, `*.test.tsx`)
- [ ] 불필요한 `console.log`, 주석 제거
- [ ] 커밋 메시지 conventional commits 형식

## 커밋 규칙

```bash
# committer 스크립트 사용 권장
./scripts/committer.sh "feat: 설명" file1.tsx file2.ts

# 커밋 타입
feat:     새 기능
fix:      버그 수정
refactor: 리팩토링
style:    포맷/스타일
docs:     문서
test:     테스트
chore:    기타
```

## AI/Vibe-Coded PR 정책

AI 도구(Claude, Cursor, Copilot 등)로 작성한 코드의 PR을 환영합니다. 다음 규칙을 따라주세요.

### 필수 표시 사항

PR 제목 또는 본문에 다음을 포함:

1. **AI 사용 표시** — PR 제목에 `[AI]` 태그 추가
2. **테스트 수준** — 아래 중 하나 명시
   - `미테스트` — 검증 없이 제출 (추가 리뷰 필요)
   - `간단 테스트` — pnpm validate 통과
   - `전체 테스트` — validate + 수동 확인 + E2E
3. **코드 이해 확인** — 생성된 코드의 동작을 이해했는지 확인
4. **프롬프트 공유** (선택) — 어떤 지시로 생성했는지 (맥락 파악에 유용)

### PR 본문 템플릿

```markdown
## 변경 내용

-

## AI 사용 정보

- 도구: Claude Code / Cursor / Copilot / 기타
- 테스트 수준: 미테스트 / 간단 테스트 / 전체 테스트
- 코드 이해: 확인 / 부분 확인 / 미확인
- 프롬프트 (선택):

## 테스트

- [ ] pnpm validate 통과
- [ ] 관련 테스트 작성
- [ ] 브라우저 수동 확인
```

### 리뷰 기준

AI 생성 코드는 다음에 특히 주의해서 리뷰:

- **과잉 추상화** — 불필요한 헬퍼, 유틸리티, 래퍼
- **불필요한 에러 핸들링** — 발생할 수 없는 시나리오에 대한 방어 코드
- **보안** — XSS, injection, 하드코딩된 시크릿
- **성능** — 불필요한 리렌더링, 잘못된 캐시 무효화
- **일관성** — 기존 코드 패턴과 맞는지
