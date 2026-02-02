import { describe, it, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './page';

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/lib/auth/auth-service', () => ({
    authService: {
        login: vi.fn(),
        isAuthenticated: vi.fn(() => false),
    },
}));

vi.mock('@/lib/auth/session-manager', () => ({
    sessionManager: {
        getSavedId: vi.fn(() => null),
        setSavedId: vi.fn(),
        clearSavedId: vi.fn(),
    },
}));

describe('로그인 페이지', () => {
    it('아이디, 비밀번호 입력과 제출 버튼을 렌더링한다', () => {
        render(<LoginPage />);

        expect(screen.getByRole('textbox', { name: /아이디/ })).toBeInTheDocument();
        expect(screen.getByLabelText(/비밀번호/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
    });

    it('빈 필드 제출 시 유효성 검사 에러를 표시한다', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        await user.click(screen.getByRole('button', { name: /로그인/ }));

        expect(await screen.findByText('아이디를 입력해주세요.')).toBeInTheDocument();
        expect(await screen.findByText('비밀번호를 입력해주세요.')).toBeInTheDocument();
    });
});
