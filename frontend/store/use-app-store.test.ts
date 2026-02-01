import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "./use-app-store";

describe("useAppStore", () => {
  beforeEach(() => {
    // 각 테스트 전 스토어 초기화
    useAppStore.setState({ theme: "light" });
  });

  it("초기 테마가 light이다", () => {
    const state = useAppStore.getState();
    expect(state.theme).toBe("light");
  });

  it("toggleTheme으로 dark로 전환된다", () => {
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe("dark");
  });

  it("toggleTheme 두 번 호출하면 원래 값으로 돌아온다", () => {
    useAppStore.getState().toggleTheme();
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe("light");
  });

  it("dark 상태에서 toggleTheme하면 light가 된다", () => {
    useAppStore.setState({ theme: "dark" });
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe("light");
  });
});
