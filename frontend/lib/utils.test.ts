import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("여러 클래스를 병합한다", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("조건부 클래스를 처리한다", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("Tailwind 충돌 클래스를 머지한다", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("빈 입력을 처리한다", () => {
    expect(cn()).toBe("");
  });
});
