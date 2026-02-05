---
description: 표준 패턴(menus)을 기반으로 풀스택(프론트엔드 + 백엔드 + DB) CRUD 모듈을 생성합니다.
---

이 워크플로우는 Admin CRUD 모듈을 위한 **풀스택** 스캐폴딩을 제공합니다. 
새로운 테이블을 생성하거나, 기존 테이블을 사용하여 코드를 생성할 수 있습니다.

## 사용법 (Usage)

### 1. 신규 테이블 생성 (기본값)
`/crud-agent [모듈명] [한글명]`
예시: `/crud-agent orders 주문`
- **생성 범위**: DB 마이그레이션(SQL), 백엔드(Java/MyBatis), 프론트엔드(Next.js) 전체 생성.

### 2. 기존 테이블 사용
`/crud-agent [모듈명] [한글명] --table=[테이블명]`
예시: `/crud-agent history 주문이력 --table=tb_order_history`
- **DB 마이그레이션 생성 건너뜀**.
- `src/main/resources/db/migration` 경로에서 해당 테이블 스키마를 찾아 컬럼을 분석합니다.
- 기존 컬럼 구조에 맞춰 백엔드/프론트엔드 코드를 자동 생성합니다.

### 3. 기획 문서 참조 (선택 사항)
`--plan=[파일명]`
예시: `/crud-agent orders 주문 --plan=implementation_plan.md`
- **목적**: `implementation_plan.md` 등 기획 문서를 명시적으로 참조하여 더 정확한 코드를 생성합니다.
- 지정하지 않을 경우, AI가 컨텍스트에서 관련 내용을 찾아보거나 기본 패턴을 따릅니다.

## 실행 단계 (Steps)

### 0. 🔍 레퍼런스 분석 (Analyze Reference)
- **목표**: `orders` 패턴을 **반드시 읽고** 코딩 스타일을 학습.
- **액션**: 다음 파일들을 `view_file`로 읽어 구조를 파악합니다.
  - **Backend**:
    - `src/main/java/com/example/springrest/domain/order/service/OrderService.java`
    - `src/main/java/com/example/springrest/domain/order/controller/OrderController.java`
    - `src/main/resources/mapper/MenuMapper.xml`
  - **Frontend**:
    - `app/(admin)/orders/page.tsx`
    - `app/(admin)/orders/hooks/use-menu-management.ts`

### 1. 📋 컨텍스트 분석 및 계획 (Context Analysis & Planning)
- **목표**: 도메인 용어 정의 및 DB 전략 결정.
- **액션**:
  - `--table` 플래그 유무 확인.
  - `--plan` 플래그가 있으면 해당 파일을 `view_file`로 읽어 설계를 먼저 파악합니다.
  - **신규 테이블인 경우**:
    - 새 테이블 스키마(`tb_[snake]`) 계획 수립.
    - 주요 필드 정의: id, name, desc, use_yn, reg_dt 등.
  - **기존 테이블인 경우**:
    - **검색**: `src/main/resources/db/migration` 내에서 `[테이블명]` 검색.
    - **분석**: SQL 파일을 읽어 컬럼명과 데이터 타입을 추출.
    - **매핑**: Snake Case 컬럼명을 Camel Case 속성명으로 변환 (VO/Frontend용).

### 2. 🗄️ 백엔드: 데이터베이스 및 영속성 (Backend: Database & Persistence)
- **목표**: 영속성 레이어(Persistence Layer) 생성.
- **액션**:
  - **Flyway 마이그레이션**:
    - **신규**: `src/main/resources/db/migration/V{TIMESTAMP}__create_[snake]_table.sql` 생성.
    - **기존**: 생성 건너뜀.
  - **VO (Value Object)**: `src/main/java/.../vo/[Pascal]VO.java` 생성 (Lombok `@Data`).
    - 분석된 테이블 컬럼과 필드 일치시킴.
  - **Mapper 인터페이스**: `src/main/java/.../mapper/[Pascal]Mapper.java` 생성.
  - **Mapper XML**: `src/main/resources/mapper/[Pascal]Mapper.xml` 생성.

### 3. 🔄 백엔드: DTO 및 변환기 (Backend: DTO & Converter)
- **목표**: 데이터 전송 객체 및 매핑 로직 생성 (VO 직접 반환 금지).
- **액션**:
  - **DTO**: `src/main/java/.../dto/[Pascal]DTO.java` 생성.
    - Lombok `@Data` 사용, VO 필드와 호환되도록 구성.
  - **Struct Mapper**: `src/main/java/.../mapper/[Pascal]StructMapper.java` 생성.
    - `@Mapper(componentModel = "spring")` 사용.
    - `toDTO(VO vo)`, `toVO(DTO dto)` 메소드 정의.

### 4. ⚙️ 백엔드: 비즈니스 로직 및 API (Backend: Business Logic & API)
- **목표**: 서비스 및 REST 컨트롤러 구현.
- **액션**:
  - **Service**: `src/main/java/.../service/[Pascal]Service.java` 생성.
  - **Controller**: `src/main/java/.../controller/[Pascal]Controller.java` 생성.
    - 엔드포인트: `GET /v1/mgmt/[kebab]`, `POST`, `PUT`, `DELETE`.

### 5. 🛠 프론트엔드: 훅 (Frontend: Hooks)
- **목표**: React Query 훅 및 비즈니스 로직 생성.
- **액션**:
  - `hooks/use-[kebab]-query.ts`: VO와 일치하는 TypeScript `interface` 정의.
  - `hooks/use-[kebab]-management.ts`: 테이블 데이터, 페이지네이션, 다이얼로그 상태 관리 로직.

### 6. 🧩 프론트엔드: UI 컴포넌트 (Frontend: UI Components)
- **목표**: 화면 구성 요소 생성.
- **액션**:
  - `columns.tsx`: 테이블 컬럼 정의 (DB 컬럼 타입 반영).
  - `input-form.tsx`: 입력 폼 생성 (예: `VARCHAR` -> Input, `TIMESTAMP` -> DatePicker, `CHAR(1)` -> Switch/Select).
  - `data-table-toolbar.tsx`, `input-dialog.tsx`: 검색 바 및 팝업 래퍼.

### 7. 📄 프론트엔드: 페이지 통합 (Frontend: Page Integration)
- **목표**: 최종 페이지 조립.
- **액션**:
  - `page.tsx`: 생성된 컴포넌트들을 `SearchPageLayout` 안에 배치.

### 8. 🧪 테스트 작성 (write Tests)
- **목표**: 안정적인 기능 동작을 보장하기 위한 테스트 코드 작성.
- **액션**:
 - **Backend**: `src/test/java/...` 생성 (JUnit5) → `/test-unit` 참고
 - **Frontend(Unit)**: `components/.../[Pascal].test.tsx` (소스 옆) 생성 (Vitest) → `/test-unit` 참고

### 9. ✅ 검증 (Verification)
- **목표**: 코드 리뷰 및 후속 조치 안내.
- **액션**:
  - 생성된 파일 경로 및 임포트 구문 확인.