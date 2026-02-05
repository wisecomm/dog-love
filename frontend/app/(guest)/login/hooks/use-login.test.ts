import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useLogin, accountFormSchema } from "./use-login";
import { login, getTokens } from "@/app/actions/auth-actions";
import { sessionManager } from "@/lib/auth/session-manager";

// --- Mocks ---
const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        replace: mockReplace,
    }),
}));

const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

vi.mock("@/app/actions/auth-actions", () => ({
    login: vi.fn(),
    getTokens: vi.fn(),
}));

vi.mock("@/lib/auth/session-manager", () => ({
    sessionManager: {
        getSavedId: vi.fn(),
        setSavedId: vi.fn(),
        clearSavedId: vi.fn(),
        setSession: vi.fn(),
        updateLastActivity: vi.fn(),
    },
}));

describe("useLogin Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (getTokens as Mock).mockResolvedValue({}); // Default: Not logged in
    });

    // --- Schema Tests ---
    describe("Schema Validation", () => {
        it("validates empty userId", () => {
            const result = accountFormSchema.safeParse({ userId: "", userPwd: "password" });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("사용자 아이디를 입력하세요.");
            }
        });

        it("validates short userPwd", () => {
            const result = accountFormSchema.safeParse({ userId: "admin", userPwd: "123" });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("패스워드는 4자리 이상입니다.");
            }
        });

        it("accepts valid input", () => {
            const result = accountFormSchema.safeParse({ userId: "admin", userPwd: "password" });
            expect(result.success).toBe(true);
        });
    });

    // --- Hook Logic Tests ---
    it("initializes with default state", () => {
        const { result } = renderHook(() => useLogin());
        expect(result.current.showPassword).toBe(false);
        expect(result.current.rememberId).toBe(false);
        expect(result.current.form.getValues("userId")).toBe("admin"); // From defaultValues
    });

    it("toggles password visibility", () => {
        const { result } = renderHook(() => useLogin());
        act(() => {
            result.current.setShowPassword(true);
        });
        expect(result.current.showPassword).toBe(true);
    });

    it("toggles rememberId", () => {
        const { result } = renderHook(() => useLogin());
        act(() => {
            result.current.setRememberId(true);
        });
        expect(result.current.rememberId).toBe(true);
    });

    it("loads saved ID on mount", async () => {
        (sessionManager.getSavedId as Mock).mockReturnValue("saved_user");

        const { result } = renderHook(() => useLogin());

        await waitFor(() => {
            expect(result.current.form.getValues("userId")).toBe("saved_user");
        });
        // rememberId set is inside setTimeout, so we wait or check async
        await waitFor(() => {
            expect(result.current.rememberId).toBe(true);
        });
    });

    it("redirects if already logged in", async () => {
        (getTokens as Mock).mockResolvedValue({ accessToken: "valid-token" });

        renderHook(() => useLogin());

        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith("/home", { scroll: false });
        });
    });

    // --- Submit Logic ---
    it("handles login success", async () => {
        (login as Mock).mockResolvedValue({ code: "200", data: { token: "abc" } });
        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.onSubmit({ userId: "user", userPwd: "pwd" });
        });

        expect(login).toHaveBeenCalled();
        expect(sessionManager.setSession).toHaveBeenCalledWith({ token: "abc" });
        expect(mockReplace).toHaveBeenCalledWith("/home", { scroll: false });
        expect(sessionManager.clearSavedId).toHaveBeenCalled(); // Default rememberId is false
    });

    it("handles login success with rememberId", async () => {
        (login as Mock).mockResolvedValue({ code: "200", data: { token: "abc" } });
        const { result } = renderHook(() => useLogin());

        act(() => {
            result.current.setRememberId(true);
        });

        await act(async () => {
            await result.current.onSubmit({ userId: "user", userPwd: "pwd" });
        });

        expect(sessionManager.setSavedId).toHaveBeenCalledWith("user");
    });

    it("handles login failure (API Error)", async () => {
        (login as Mock).mockResolvedValue({ code: "401", message: "Invalid credentials" });
        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.onSubmit({ userId: "user", userPwd: "pwd" });
        });

        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: "로그인 실패",
            description: "Invalid credentials",
            variant: "destructive"
        }));
        expect(mockReplace).not.toHaveBeenCalled();
    });

    it("handles exception during login", async () => {
        (login as Mock).mockRejectedValue(new Error("Network Error"));
        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.onSubmit({ userId: "user", userPwd: "pwd" });
        });

        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: "오류",
            description: "로그인 처리 중 오류가 발생했습니다.",
        }));
    });
});
