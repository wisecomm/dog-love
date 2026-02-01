# 배포 워크플로우

## Step 1: 사전 검증

```bash
pnpm validate
```

- lint, typecheck, test, build 모두 통과해야 함
- 실패 시 → 수정 후 재검증, 다음 단계로 넘어가지 않음

## Step 2: 환경별 빌드

개발 환경:

```bash
pnpm build:deploy:dev
```

프로덕션 환경:

```bash
pnpm build:deploy:prod
```

- `dist/` 디렉토리가 생성되었는지 확인
- 실패 시 → 에러 로그 분석 후 수정, Step 1부터 재시작

## Step 3: 빌드 결과 검증

다음 파일/디렉토리가 존재하는지 확인:

```bash
ls dist/.next/static
ls dist/public
ls dist/.env
ls dist/server.js
```

- 하나라도 없으면 → Step 2의 deploy:copy 스크립트 점검
- standalone 서버 기동 테스트:

```bash
cd dist && node server.js &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

- 200 응답이 아니면 → next.config.ts의 output: "standalone" 설정 점검

## Step 4: 배포

- 대상 서버에 `dist/` 전체 복사
- 서버에서 `node server.js` 실행
- 헬스체크:

```bash
curl -s -o /dev/null -w "%{http_code}" http://<서버주소>:3000
```

- 200이 아니면 → 서버 로그 확인, .env 파일 내용 점검
