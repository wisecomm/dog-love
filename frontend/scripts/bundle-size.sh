#!/bin/bash
set -euo pipefail

# ============================================================
# bundle-size.sh - Next.js 빌드 출력에서 번들 사이즈 추출
#
# 사용법:
#   ./scripts/bundle-size.sh > bundle-size.json
#
# next build 출력을 파싱하여 라우트별 사이즈를 JSON으로 저장
# ============================================================

BUILD_OUTPUT=$(pnpm build 2>&1) || {
  echo "빌드 실패"
  exit 1
}

# next build 출력에서 Route 테이블 파싱
echo "$BUILD_OUTPUT" | node -e "
const lines = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n');
const routes = [];
let sharedSize = '';

for (const line of lines) {
  // Route 라인 매칭: ├ ○ /path  size  firstLoad
  const routeMatch = line.match(/[├└┌│]\s*[○●ƒ◐]\s+(\/\S*)\s+([\d.]+\s*[kKmM]?B)\s+([\d.]+\s*[kKmM]?B)/);
  if (routeMatch) {
    routes.push({
      route: routeMatch[1],
      size: routeMatch[2].trim(),
      firstLoad: routeMatch[3].trim(),
    });
  }

  // First Load JS shared
  const sharedMatch = line.match(/First Load JS shared.*?([\d.]+\s*[kKmM]?B)/);
  if (sharedMatch) {
    sharedSize = sharedMatch[1].trim();
  }
}

const result = {
  timestamp: new Date().toISOString(),
  shared: sharedSize,
  routes,
};

console.log(JSON.stringify(result, null, 2));
"
