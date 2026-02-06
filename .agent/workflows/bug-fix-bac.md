---
description: Fix Backend bugs (Spring Boot/Java)
---

# 버그 수정 워크플로우 (Backend)

## Step 1: 버그 재현 확인

- 버그 재현 경로/조건을 명확히 파악 (API 요청, 데이터 상태 등)
- 관련 코드 파일을 전체 읽기 (생략 없이)
- 서버 로그(Log4j2), 에러 스택 트레이스 확인

검증:

- 버그가 발생하는 API 요청과 예상 응답/실제 응답이 명확한가?
- 불명확하면 → 사용자에게 curl 예시나 로그 추가 요청

## Step 2: 근본 원인 분석

- `.agent/prompts/is.md` 프롬프트 방식으로 분석
- 이슈에 적힌 원인 분석은 무시 (대체로 부정확)
- 코드 경로를 직접 추적:
  - Controller → Service → Mapper/Repository → DB 테이블
  - 트랜잭션 범위, 예외 처리 로직 확인

검증:

- 근본 원인을 코드 라인 수준으로 특정했는가? (예: NPE 발생 지점, SQL 쿼리 오류 등)
- 특정 못하면 → 디버깅 로그 추가 후 재현

## Step 3: 최소 범위 수정

- 근본 원인에 대한 최소한의 수정만 적용
- 주변 코드 리팩토링, "개선" 금지 (단, Critical한 Anti-pattern 발견 시 보고)
- 수정 범위가 예상보다 넓으면 → 사용자에게 알리고 확인 받기

검증:

```bash
# 컴파일 및 단위 테스트 실행 (프로젝트 루트에서)
./mvnw clean test
# 또는 Gradle 사용 시: ./gradlew clean test
```

## Step 4: 회귀 방지 테스트 작성

- 이 버그를 재현하는 JUnit 테스트 케이스 작성 (ServiceTest 또는 ControllerTest)
- 수정 전에는 실패하고 수정 후에는 통과하는 테스트

검증:

- 새 테스트 케이스만 단독 실행하여 통과 확인
- 전체 테스트 슈트를 실행하여 다른 기능에 영향이 없는지 확인

## Step 5: 전체 검증

```bash
# 전체 빌드 및 테스트 수행
./mvnw clean verify
# 또는 Gradle 사용 시: ./gradlew clean build
```

- 컴파일 + 테스트 + 패키징 모두 통과
- 실패 시 → 해당 단계로 돌아가 수정

