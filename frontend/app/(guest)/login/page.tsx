"use client";

import React from "react";
import {
  ScanBarcode,
  Boxes,
  IdCard,
  LockKeyhole,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useLogin } from "./hooks/use-login";
import { env } from "@/lib/env";

function Login() {
  const {
    form,
    onSubmit,
    isPending,
    showPassword,
    setShowPassword,
    rememberId,
    setRememberId,
  } = useLogin();

  const handleGoogleLogin = () => {
    const clientId = env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      alert("구글 로그인 설정이 되어있지 않습니다. (환경변수 확인 필요)");
      return;
    }

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    window.location.href = url;
  };

  return (
    <div className="font-sans bg-muted text-foreground min-h-screen flex flex-col antialiased selection:bg-primary/30">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center p-4 pb-3 justify-between max-w-md mx-auto w-full">
          <div className="text-primary flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <ScanBarcode className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
          </div>
          <h2 className="text-foreground text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            개좋아
          </h2>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-4 justify-center">
        <div className="flex flex-col items-center pb-8 pt-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30 mb-6">
            <Boxes className="h-9 w-9 text-white stroke-[1.5]" aria-hidden="true" />
          </div>
          <h1 className="text-foreground tracking-tight text-[32px] font-bold leading-tight text-center mb-2">
            로그인
          </h1>
          <p className="text-muted-foreground text-base font-normal leading-relaxed text-center max-w-75">
            작업자 ID와 비밀번호를 입력하거나<br />사원증을 스캔하세요.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            {/* User ID Field */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full space-y-0">
                  <FormLabel className="text-muted-foreground text-sm font-semibold leading-normal pb-2 ml-1">
                    사용자 ID
                  </FormLabel>
                  <FormControl>
                    <div className="flex w-full items-stretch rounded-xl shadow-sm">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-muted-foreground">
                          <IdCard className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          {...field}
                          autoComplete="username"
                          className="flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-border bg-background text-foreground focus:outline-0 focus:ring-2 focus:ring-ring focus:border-primary h-14 placeholder:text-muted-foreground pl-10 pr-2 text-base font-normal leading-normal transition-all"
                          placeholder="ID 입력"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="userPwd"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full space-y-0">
                  <div className="flex justify-between items-baseline pb-2 px-1">
                    <FormLabel className="text-muted-foreground text-sm font-semibold leading-normal">
                      비밀번호
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="flex w-full items-stretch rounded-xl shadow-sm">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-muted-foreground">
                          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="flex w-full min-w-0 resize-none overflow-hidden rounded-l-xl border border-border bg-background text-foreground focus:outline-0 focus:ring-2 focus:ring-ring focus:border-primary h-14 placeholder:text-muted-foreground pl-10 pr-2 text-base font-normal leading-normal transition-all"
                          placeholder="비밀번호 입력"
                        />
                      </div>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center justify-center px-4 rounded-r-xl border border-l-0 border-border bg-muted hover:bg-muted transition-colors group"
                        type="button"
                        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5 text-muted-foreground group-hover:text-muted-foreground transition-colors" aria-hidden="true" />
                        ) : (
                          <EyeOff className="h-5 w-5 text-muted-foreground group-hover:text-muted-foreground transition-colors" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Password Utilities */}
                  <div className="flex justify-between items-center mt-3 px-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberId"
                        checked={rememberId}
                        onCheckedChange={(checked) => setRememberId(checked as boolean)}
                      />
                      <label
                        htmlFor="rememberId"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground cursor-pointer"
                      >
                        아이디 저장
                      </label>
                    </div>
                    <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                      비밀번호 찾기
                    </a>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "flex w-full items-center justify-center rounded-xl bg-primary h-14 px-4 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mt-2",
                isPending && "opacity-70 cursor-not-allowed"
              )}
            >
              {isPending ? "로그인 중..." : "로그인"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-muted px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center rounded-xl h-14 px-4 text-base font-medium hover:bg-background/80 transition-all shadow-sm"
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google 로그인
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}

export default Login;
