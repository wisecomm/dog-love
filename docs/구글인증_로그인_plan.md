# 구글 인증 로그인 구현 계획

## 1. 개요
본 문서는 Google OAuth 2.0을 이용한 소셜 로그인 기능을 `dog-love` 프로젝트에 도입하기 위한 데이터베이스 변경 사항 및 백엔드 프로세스를 정의합니다.

## 2. 데이터베이스 변경 사항 (`CHMM_USER_INFO`)

기존 `CHMM_USER_INFO` 테이블 구조를 활용하되, 소셜 로그인 사용자를 구분하기 위한 컬럼 추가 및 제약 조건 변경이 필요합니다.

### 2.1. 추가 및 수정 컬럼

| 컬럼명 | 타입 | 설명 | 비고 |
| :--- | :--- | :--- | :--- |
| **`PROVIDER`** | `VARCHAR(20)` | 로그인 제공자 구분 | 예: `'GOOGLE'`, `'KAKAO'`, `'NAVER'`, `'LOCAL'`<br>기존 일반 회원은 `'LOCAL'`로 설정 |
| **`USER_SNSID`** | `VARCHAR(100)` | 소셜 서비스 고유 ID | **[기존 컬럼 활용]**<br>Google의 `sub` 값 저장 (중복 가입 방지용 키) |
| **`USER_PWD`** | `VARCHAR(255)` | 비밀번호 | **[제약 조건 완화]**<br>`NOT NULL` -> `NULL 허용`<br>또는 소셜 회원 가입 시 난수/특정 문자열(예: `'OAUTH_LOGIN'`)로 처리 |

### 2.2. 마이그레이션 SQL 예시

```sql
-- 1. PROVIDER 컬럼 추가
ALTER TABLE CHMM_USER_INFO ADD COLUMN PROVIDER VARCHAR(20) DEFAULT 'LOCAL';

-- 2. USER_PWD 컬럼 제약 조건 변경 (선택 사항: NULL 허용 시)
ALTER TABLE CHMM_USER_INFO ALTER COLUMN USER_PWD DROP NOT NULL;
```

---

## 3. 구글 인증 프로세스 (Server-Side Flow)

보안을 위해 **Authorization Code Grant** 방식을 사용하며, 프론트엔드에서 인가 코드(Code)를 받아 백엔드에서 토큰 교환 및 사용자 정보를 조회하는 방식을 권장합니다.

### 3.1. 전체 흐름도

1.  **[Frontend] 로그인 요청**
    -   사용자가 "Google 로그인" 버튼 클릭.
    -   프론트엔드가 구글 인가(Authorization) URL로 리다이렉트.
    -   파라미터: `client_id`, `redirect_uri`, `response_type=code`, `scope=email profile` 등.

2.  **[User] 인증 및 동의**
    -   구글 로그인 화면에서 계정 선택 및 정보 제공 동의.

3.  **[Frontend] 인가 코드 수신**
    -   구글이 사전에 설정된 `redirect_uri` (프론트엔드 페이지)로 리다이렉트하며 `code` 파라미터를 전달.
    -   프론트엔드는 이 `code`를 백엔드 API (예: `/api/auth/google`)로 전송.

4.  **[Backend] 토큰 교환 및 정보 조회**
    -   백엔드는 받은 `code`, `client_id`, `client_secret`을 담아 구글 토큰 API(`https://oauth2.googleapis.com/token`)를 호출.
    -   응답으로 `Access Token`을 획득.
    -   `Access Token`을 이용해 구글 사용자 정보 API(`https://www.googleapis.com/oauth2/v2/userinfo`)를 호출하여 프로필(`sub`, `email`, `name` 등) 획득.

5.  **[Backend] 회원가입/로그인 처리**
    -   **조회**: 가져온 구글 ID(`sub`) 또는 이메일로 `CHMM_USER_INFO` 테이블 조회.
    -   **신규 회원**: DB에 해당 정보가 없다면 `INSERT`.
        -   `PROVIDER = 'GOOGLE'`, `USER_SNSID = 'sub값'` 저장.
        -   비밀번호는 NULL 또는 임의 값 설정.
    -   **기존 회원**: 정보 업데이트가 필요하다면 `UPDATE`.
    -   **세션/토큰 발급**: 자체 서비스의 `JWT (Access/Refresh Token)`을 생성하여 프론트엔드에 응답.

6.  **[Frontend] 로그인 완료**
    -   프론트엔드는 응답받은 자체 토큰(JWT)을 저장하고 로그인 상태로 전환.

### 3.2. 주요 고려 사항

-   **보안**: `Client Secret`은 절대 프론트엔드에 노출되지 않도록 백엔드 환경 변수(`application.yml` 등)로 관리해야 합니다.
-   **계정 연동**: 이메일 중복 시 기존 계정과 통합할지, 별도 계정으로 생성할지 정책 결정이 필요합니다. (일반적으로 이메일 기반 통합 권장)
-   **Refresh Token**: 구글의 Refresh Token은 최초 1회만 발급되므로, 필요시 DB에 별도 저장하여 액세스 토큰 갱신에 사용할 수 있습니다.
