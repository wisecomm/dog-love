import { describe, it, expect } from "vitest";
import { env, serverEnv, SESSION_TIMEOUT_MS } from "./env";

describe("env (클라이언트 환경변수)", () => {
  it("기본 API URL이 /api이다", () => {
    expect(env.NEXT_PUBLIC_API_URL).toBe("/api");
  });

  it("SESSION_TIMEOUT_MS 기본값이 문자열이거나 undefined이다", () => {
    expect(
      env.NEXT_PUBLIC_SESSION_TIMEOUT_MS === undefined ||
        typeof env.NEXT_PUBLIC_SESSION_TIMEOUT_MS === "string"
    ).toBe(true);
  });
});

describe("serverEnv (서버 환경변수)", () => {
  it("스키마 파싱이 성공한다", () => {
    expect(serverEnv).toBeDefined();
  });

  it("NODE_ENV가 유효한 값이거나 undefined이다", () => {
    const valid = [undefined, "development", "production", "test"];
    expect(valid).toContain(serverEnv.NODE_ENV);
  });
});

describe("SESSION_TIMEOUT_MS", () => {
  it("숫자 타입이다", () => {
    expect(typeof SESSION_TIMEOUT_MS).toBe("number");
  });

  it("기본값은 30분(1800000ms)이다", () => {
    expect(SESSION_TIMEOUT_MS).toBe(1800000);
  });

  it("NaN이 아니다", () => {
    expect(Number.isNaN(SESSION_TIMEOUT_MS)).toBe(false);
  });
});
