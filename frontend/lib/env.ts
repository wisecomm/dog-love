import { z } from 'zod';

/**
 * 클라이언트 사이드 환경 변수 스키마 (NEXT_PUBLIC_)
 * 브라우저에서 접근 가능한 환경 변수만 정의
 */
const clientEnvSchema = z.object({
  /** API 요청 Base URL */
  NEXT_PUBLIC_API_URL: z.string().default('/api'),
  /** 세션 타임아웃 (ms) - 기본 30분 */
  NEXT_PUBLIC_SESSION_TIMEOUT_MS: z.string().optional(),
  /** 앱 환경 */
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'production', 'test']).optional(),
});

/**
 * 서버 사이드 전용 환경 변수 스키마
 * 브라우저에서 접근 불가 (undefined)
 */
const serverEnvSchema = z.object({
  /** 백엔드 API URL (서버에서만 사용) */
  BACKEND_API_URL: z.string().optional(),
  /** 쿠키 Secure 플래그 */
  COOKIE_SECURE: z.string().optional(),
  /** Node 환경 */
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

/**
 * 클라이언트 환경 변수 (브라우저 + 서버)
 */
export const env = clientEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SESSION_TIMEOUT_MS: process.env.NEXT_PUBLIC_SESSION_TIMEOUT_MS,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
});

/**
 * 서버 전용 환경 변수 (API Routes, Server Actions에서만 사용)
 * 클라이언트에서 import하면 undefined 값들
 */
export const serverEnv = serverEnvSchema.parse({
  BACKEND_API_URL: process.env.BACKEND_API_URL,
  COOKIE_SECURE: process.env.COOKIE_SECURE,
  NODE_ENV: process.env.NODE_ENV,
});

/** 세션 타임아웃 숫자로 변환 (기본 30분) */
export const SESSION_TIMEOUT_MS = parseInt(
  env.NEXT_PUBLIC_SESSION_TIMEOUT_MS || '1800000',
  10
);

/** 개발 환경 여부 */
export const isDev = env.NEXT_PUBLIC_APP_ENV === 'development' || serverEnv.NODE_ENV === 'development';

/** 프로덕션 환경 여부 */
export const isProd = env.NEXT_PUBLIC_APP_ENV === 'production' || serverEnv.NODE_ENV === 'production';
