"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { googleLogin } from "@/app/actions/auth-actions";
import { sessionManager } from "@/lib/auth/session-manager";
import { useToast } from "@/hooks/use-toast";

export default function GoogleCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const processedRef = useRef(false);
    const [status, setStatus] = useState("구글 로그인 처리 중...");

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
            toast({
                title: "로그인 실패",
                description: "구글 로그인 중 오류가 발생했습니다.",
                variant: "destructive",
            });
            router.replace("/login");
            return;
        }

        if (!code) {
            router.replace("/login");
            return;
        }

        if (processedRef.current) return;
        processedRef.current = true;

        const processLogin = async () => {
            try {
                const result = await googleLogin(code);

                if (result.code === "200" && result.data) {
                    sessionManager.setSession(result.data);

                    toast({
                        title: "로그인 성공",
                        description: "구글 계정으로 로그인되었습니다.",
                    });

                    setStatus("로그인 성공! 이동 중...");
                    // 로그인 성공 후 메인 페이지 또는 요청했던 페이지로 이동
                    router.replace("/orders");
                } else {
                    throw new Error(result.message || "로그인 처리에 실패했습니다.");
                }
            } catch (err) {
                console.error("Google login error:", err);
                toast({
                    title: "로그인 실패",
                    description: err instanceof Error ? err.message : "로그인 처리에 실패했습니다.",
                    variant: "destructive",
                });
                router.replace("/login");
            }
        };

        processLogin();
    }, [searchParams, router, toast]);

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium">{status}</p>
        </div>
    );
}
