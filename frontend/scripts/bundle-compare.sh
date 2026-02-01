#!/bin/bash
set -euo pipefail

# ============================================================
# bundle-compare.sh - 두 번들 사이즈 JSON을 비교하여 마크다운 리포트 생성
#
# 사용법:
#   ./scripts/bundle-compare.sh base.json pr.json
#
# CI에서 base 브랜치와 PR 브랜치의 번들 사이즈를 비교
# ============================================================

if [ $# -lt 2 ]; then
  echo "사용법: ./scripts/bundle-compare.sh base.json pr.json"
  exit 1
fi

BASE_FILE="$1"
PR_FILE="$2"

node -e "
const base = JSON.parse(require('fs').readFileSync('$BASE_FILE', 'utf8'));
const pr = JSON.parse(require('fs').readFileSync('$PR_FILE', 'utf8'));

function parseSize(s) {
  if (!s) return 0;
  const match = s.match(/([\d.]+)\s*(kB|mB|B)/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === 'kb') return num * 1024;
  if (unit === 'mb') return num * 1024 * 1024;
  return num;
}

function formatDiff(baseSize, prSize) {
  const diff = prSize - baseSize;
  if (diff === 0) return '0';
  const diffKB = (diff / 1024).toFixed(1);
  return diff > 0 ? '+' + diffKB + ' kB' : diffKB + ' kB';
}

function getEmoji(diff) {
  if (diff === 0) return '';
  if (Math.abs(diff) < 10240) return '';       // < 10KB
  if (Math.abs(diff) < 51200) return '⚠️ ';   // < 50KB
  return '❌ ';                                 // >= 50KB
}

const baseMap = {};
for (const r of base.routes) baseMap[r.route] = r;

const prMap = {};
for (const r of pr.routes) prMap[r.route] = r;

const allRoutes = [...new Set([...Object.keys(baseMap), ...Object.keys(prMap)])].sort();

let lines = [];
lines.push('## 📦 번들 사이즈 리포트');
lines.push('');
lines.push('| 페이지 | Before | After | 변화 |');
lines.push('|--------|--------|-------|------|');

let totalDiff = 0;

for (const route of allRoutes) {
  const b = baseMap[route];
  const p = prMap[route];
  const bFirst = b ? b.firstLoad : '—';
  const pFirst = p ? p.firstLoad : '—';
  const bSize = parseSize(b ? b.firstLoad : '0');
  const pSize = parseSize(p ? p.firstLoad : '0');
  const diff = pSize - bSize;
  totalDiff += diff;
  const emoji = getEmoji(diff);
  lines.push('| \`' + route + '\` | ' + bFirst + ' | ' + pFirst + ' | ' + emoji + formatDiff(bSize, pSize) + ' |');
}

// Shared JS
const bShared = parseSize(base.shared);
const pShared = parseSize(pr.shared);
const sharedDiff = pShared - bShared;
lines.push('| **Shared JS** | ' + (base.shared || '—') + ' | ' + (pr.shared || '—') + ' | ' + formatDiff(bShared, pShared) + ' |');

lines.push('');

const totalDiffKB = (totalDiff / 1024).toFixed(1);
if (totalDiff > 51200) {
  lines.push('❌ **총 번들 사이즈 ' + totalDiffKB + ' kB 증가 — 리뷰 필요**');
} else if (totalDiff > 10240) {
  lines.push('⚠️ **총 번들 사이즈 ' + totalDiffKB + ' kB 증가 — 확인 권장**');
} else if (totalDiff > 0) {
  lines.push('✅ 총 번들 사이즈 +' + totalDiffKB + ' kB (정상 범위)');
} else if (totalDiff < 0) {
  lines.push('🎉 총 번들 사이즈 ' + totalDiffKB + ' kB 감소!');
} else {
  lines.push('✅ 번들 사이즈 변화 없음');
}

console.log(lines.join('\n'));
"
