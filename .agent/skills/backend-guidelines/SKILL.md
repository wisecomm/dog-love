---
name: backend-guidelines
description: Core architectural rules, coding conventions, and tech stack guidelines for the Dog-Love Backend. Reference this for all backend code changes.
---

# Dog-Love Backend — Agent Instructions

## Tech Stack

- Java 21+ / Kotlin (Check project usage)
- Spring Boot 3+
- Gradle (Kotlin DSL preferred)
- JPA / Hibernate
- MySQL / PostgreSQL

## Commands

```bash
./gradlew build          # 빌드 (테스트 포함)
./gradlew build -x test  # 빌드 (테스트 제외, 빠른 검증)
./gradlew test           # 유닛 테스트 실행
./gradlew bootRun        # 로컬 서버 실행
```

## 코드 수정 후 필수 검증 절차

코드를 수정한 후 반드시 다음 순서로 검증할 것:

1. `./gradlew build -x test` — 컴파일 오류 없음 확인
2. `./gradlew test` — 유닛 테스트 통과 확인

## 커밋 규칙

- **커밋 시 해당 스크립트 사용 권장** (스코프 제한 커밋):

```bash
./backend/scripts/committer.sh "feat: add user api" src/main/java/User.java
```

- committer가 자동으로 수행하는 것:
  1. conventional commit 메시지 형식 검증
  2. 지정 파일만 스테이징 (다른 파일 보호)
  3. build + test 검증
  4. 실패 시 스테이징 해제, 통과 시에만 커밋

- 커밋 메시지는 conventional commits 형식 사용:
  - `feat:` 새 기능
  - `fix:` 버그 수정
  - `refactor:` 리팩토링
  - `style:` 포맷/스타일 변경
  - `docs:` 문서 변경
  - `test:` 테스트 추가/수정
  - `chore:` 기타

## 코딩 컨벤션

- RESTful API 설계 원칙 준수
- Controller, Service, Repository 계층 분리
- DTO 사용 필수 (Entity 직접 반환 금지)
- 적절한 예외 처리 (@ExceptionHandler)
- 테스트 코드 작성 필수 (JUnit 5 + Mockito)

## 디렉토리 구조 (표준 Spring Boot)

```
src/
├── main/
│   ├── java/com/example/project/
│   │   ├── config/          # 설정 클래스
│   │   ├── controller/      # API 엔드포인트
│   │   ├── service/         # 비즈니스 로직
│   │   ├── repository/      # 데이터 접근
│   │   ├── entity/          # DB 엔티티
│   │   └── dto/             # 데이터 전송 객체
│   └── resources/
│       └── application.yml
└── test/                    # 테스트 코드
```

## 주의사항

- 민감 정보는 환경변수 또는 외부 설정 파일로 관리
- N+1 문제 주의 (FetchType.LAZY 권장)
- Transaction 관리 (@Transactional) 주의
