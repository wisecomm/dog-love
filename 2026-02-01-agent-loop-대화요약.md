# AI 에이전트 자기검증 루프 — 대화 요약

**날짜**: 2026-02-01
**도구**: Claude Code (claude-opus-4-5)

---

## 1. GeekNews 기사 확인

**출처**: https://news.hada.io/topic?id=26222

PSPDFKit 창업자 Peter Steinberger가 AI 에이전트로 2026년 1월 한 달간 6,600+ 커밋 달성. Moltbot(구 Clawdbot → OpenClaw) 프로젝트에서 5~10개 에이전트 동시 운영.

**핵심 원칙**:
- 코드 스타일 완벽주의 버리기
- 에이전트가 컴파일/린트/테스트로 스스로 검증하는 루프 설계
- PR 대신 "Prompt Request"
- 코드 리뷰 대신 아키텍처 토론
- 시스템 설계 > 구현 디테일

**댓글 반응**: 유지보수/보안 우려, 토큰 비용 놀라움, 회의적 시각 다수

---

## 2. 에이전트 자기검증 루프 구축 방법 (일반론)

| 방법 | 설명 |
|------|------|
| Claude Code Hooks | `.claude/settings.json`에 afterEdit/afterWrite 설정, 파일 수정 시 자동 lint/typecheck |
| CLAUDE.md | 에이전트에게 빌드/린트/테스트 검증 절차 명시 |
| CI/CD 파이프라인 | PR 자동 검증, 실패 시 에이전트가 재수정 |
| 커스텀 스크립트 래퍼 | verify.sh 같은 검증 스크립트를 에이전트가 호출 |

**권장 조합**: Hooks(즉시 피드백) + CLAUDE.md(행동 규칙) + CI/CD(최종 게이트)

---

## 3. OpenClaw 프로젝트 분석

**로컬 경로**: `/Users/ojeong-il/XXX-AI-DOC/XXX-VIBE/openclaw`

### 6층 검증 구조

| 층 | 구성 | 역할 |
|----|------|------|
| 1층 | `CLAUDE.md` → `AGENTS.md` 심볼릭 링크 | 에이전트 행동 규칙 179줄, 멀티에이전트 안전수칙 |
| 2층 | `.pre-commit-config.yaml` + `git-hooks/pre-commit` | oxlint, oxfmt, shellcheck, 시크릿 감지 |
| 3층 | `.pi/` 디렉토리 | PR 리뷰(`pr.md`), 이슈 분석(`is.md`), 체인지로그 감사(`cl.md`) |
| 4층 | `.agent/workflows/` | 단계별 검증 루프 4개 정의 |
| 5층 | `.github/workflows/` | 14+ 병렬 검증 (크로스플랫폼, Docker E2E 등) |
| 6층 | `package.json` 스크립트 | lint, build, test, test:all, test:coverage(70%) |

### 주요 파일
- `AGENTS.md` — 179줄 에이전트 지침서
- `.pre-commit-config.yaml` — 다층 pre-commit 훅
- `scripts/format-staged.js` — 스테이징 파일 자동 포맷
- `.pi/prompts/` — 에이전트 역할별 전문 프롬프트
- `.agent/workflows/update_clawdbot.md` — 단계별 검증 워크플로우
- `CONTRIBUTING.md` — AI PR 환영 + 투명성 요구 정책

---

## 4. dog-love/frontend에 적용

**대상**: `/Users/ojeong-il/XXX-VIBE/dog-love/frontend` (Next.js 16 + TypeScript + pnpm)

### 생성/수정한 파일 6개

| 파일 | 역할 |
|------|------|
| `CLAUDE.md` | 에이전트 행동 규칙 (검증 절차, 커밋 규칙, 코딩 컨벤션) |
| `package.json` | `typecheck`, `format:check/fix`, `validate`, `prepare` 스크립트 추가 + husky/lint-staged |
| `.lintstagedrc.json` | 커밋 시 자동 eslint fix + prettier format |
| `.husky/pre-commit` (git root) | git 커밋 시 lint-staged 자동 실행 |
| `.claude/settings.json` | Claude Code hooks — 파일 수정 시 자동 lint + typecheck |
| `.github/workflows/ci.yml` | PR/push 시 lint → typecheck → build → e2e |

### 추가된 스크립트

```json
"typecheck": "tsc --noEmit",
"format:check": "prettier --check .",
"format:fix": "prettier --write .",
"validate": "pnpm lint && pnpm typecheck && pnpm build",
"prepare": "husky"
```

### 검증 루프 구조

```
에이전트 코드 수정
  ↓
Claude Code Hook (자동 lint + typecheck) ← 즉시 피드백
  ↓ 실패 → 에이전트가 수정 후 재시도
git commit 시도
  ↓
pre-commit hook (lint-staged: eslint fix + prettier) ← 자동 교정
  ↓ 실패 → 커밋 차단, 에이전트가 수정
PR 생성
  ↓
GitHub Actions (lint → typecheck → build → e2e) ← 최종 게이트
  ↓ 실패 → 에이전트가 수정 후 재푸시
머지
```

### 검증 결과
- `pnpm lint` — 통과 (warning 9개, error 0)
- `pnpm typecheck` — 통과

---

## 5. OpenClaw vs dog-love/frontend 비교

### OpenClaw에 있고 dog-love/frontend에 없는 것

| 항목 | 설명 |
|------|------|
| 멀티에이전트 안전수칙 | git stash/worktree/브랜치 충돌 방지 프로토콜 |
| 에이전트 전용 프롬프트 (`.pi/`) | PR 리뷰, 이슈 분석, 체인지로그 감사 역할별 프롬프트 |
| 에이전트 워크플로우 (`.agent/`) | 단계별 검증 루프 정의 |
| 시크릿 감지 | `detect-secrets` + `.secrets.baseline` |
| 유닛 테스트 + 커버리지 게이트 | vitest + 70% 커버리지 임계값 |
| 고속 도구 | oxlint, oxfmt (Rust 기반) vs ESLint, Prettier |
| 커밋 스크립트 | `scripts/committer` 스코프별 스테이징 |
| AI PR 정책 | `CONTRIBUTING.md` AI PR 투명성 요구 |
| 크로스플랫폼 CI | Windows/macOS/Android 14+ 병렬 검증 |

### 추후 도입 권장
1. **vitest 유닛 테스트** — 에이전트가 빠르게 검증할 수 있는 경량 테스트 루프
2. **에이전트 전용 프롬프트 (`.pi/`)** — PR 리뷰, 이슈 분석 자동화
3. **시크릿 감지** — 보안 강화
