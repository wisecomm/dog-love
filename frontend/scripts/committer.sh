#!/bin/bash
set -euo pipefail

# ============================================================
# committer - 스코프 제한 커밋 스크립트
#
# 사용법:
#   ./scripts/committer.sh "feat: add login page" file1.tsx file2.ts ...
#
# 기능:
#   1. conventional commit 메시지 형식 검증
#   2. 지정된 파일만 스테이징 (다른 파일 보호)
#   3. 파일 존재 여부 확인
#   4. validate 실행 후 통과 시에만 커밋
#   5. 실패 시 스테이징 해제
# ============================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

# --- 인자 확인 ---
if [ $# -lt 2 ]; then
  echo -e "${RED}Error: 커밋 메시지와 파일을 지정하세요${NC}"
  echo ""
  echo "사용법: ./scripts/committer.sh \"feat: 설명\" file1 file2 ..."
  echo ""
  echo "커밋 타입:"
  echo "  feat:     새 기능"
  echo "  fix:      버그 수정"
  echo "  refactor: 리팩토링"
  echo "  style:    포맷/스타일"
  echo "  docs:     문서"
  echo "  test:     테스트"
  echo "  chore:    기타"
  exit 1
fi

COMMIT_MSG="$1"
shift
FILES=("$@")

# --- conventional commit 형식 검증 ---
VALID_PREFIXES="^(feat|fix|refactor|style|docs|test|chore|build|ci|perf|revert)(\(.+\))?: .+"
if ! echo "$COMMIT_MSG" | grep -qE "$VALID_PREFIXES"; then
  echo -e "${RED}Error: conventional commit 형식이 아닙니다${NC}"
  echo "  현재: \"$COMMIT_MSG\""
  echo "  예시: \"feat: add login page\""
  echo "  예시: \"fix(auth): session timeout issue\""
  exit 1
fi

# --- 파일 존재 확인 ---
MISSING=()
for f in "${FILES[@]}"; do
  if [ ! -e "$f" ]; then
    MISSING+=("$f")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo -e "${RED}Error: 존재하지 않는 파일:${NC}"
  for f in "${MISSING[@]}"; do
    echo "  - $f"
  done
  exit 1
fi

# --- 스테이징 ---
echo -e "${YELLOW}스테이징할 파일 (${#FILES[@]}개):${NC}"
for f in "${FILES[@]}"; do
  echo "  + $f"
done
echo ""

git add "${FILES[@]}"

# --- validate 실행 ---
echo -e "${YELLOW}검증 실행 중... (frontend: pnpm lint && pnpm typecheck && pnpm test)${NC}"

# 프론트엔드 검증을 위해 디렉토리 이동
pushd frontend > /dev/null

if ! pnpm lint; then
  echo -e "${RED}lint 실패 — 스테이징 해제${NC}"
  popd > /dev/null
  git reset HEAD "${FILES[@]}" > /dev/null 2>&1
  exit 1
fi

if ! pnpm typecheck; then
  echo -e "${RED}typecheck 실패 — 스테이징 해제${NC}"
  popd > /dev/null
  git reset HEAD "${FILES[@]}" > /dev/null 2>&1
  exit 1
fi

if ! pnpm test; then
  echo -e "${RED}test 실패 — 스테이징 해제${NC}"
  popd > /dev/null
  git reset HEAD "${FILES[@]}" > /dev/null 2>&1
  exit 1
fi

popd > /dev/null

# --- 커밋 ---
echo ""
echo -e "${GREEN}검증 통과 — 커밋 실행${NC}"
git commit -m "$COMMIT_MSG"

echo ""
echo -e "${GREEN}커밋 완료:${NC} $COMMIT_MSG"
echo -e "${GREEN}파일 ${#FILES[@]}개${NC}"
