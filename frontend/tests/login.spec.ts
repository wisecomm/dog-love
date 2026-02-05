import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    });

    test("UI Elements Rendering", async ({ page }) => {
        await expect(page).toHaveURL(/\/login/);
        await expect(page.locator('h1:has-text("로그인")')).toBeVisible();
        await expect(page.locator('input[name="userId"]')).toBeVisible();
        await expect(page.locator('input[name="userPwd"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
        await expect(page.locator('label:has-text("아이디 저장")')).toBeVisible();
    });

    test("Login Success (Happy Path)", async ({ page }) => {
        // Mock API success response
        await page.route('**/api/v1/auth/login', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ code: '200', data: { accessToken: 'fake-token' } })
            });
        });

        await page.fill('input[name="userId"]', "admin");
        await page.fill('input[name="userPwd"]', "12345678");

        await page.click('button[type="submit"]');

        // Expect redirect to home
        await expect(page).toHaveURL(/\/(home|mainmenu)/, { timeout: 10000 });
    });

    test("Login Failure (Invalid Credentials)", async ({ page }) => {
        // Mock API failure response
        await page.route('**/api/v1/auth/login', async route => {
            await route.fulfill({
                status: 200, // API usually returns 200 with error code in body, based on use-login logic
                contentType: 'application/json',
                body: JSON.stringify({ code: '401', message: '비밀번호가 일치하지 않습니다.' })
            });
        });

        await page.fill('input[name="userId"]', "admin");
        await page.fill('input[name="userPwd"]', "wrongpassword");

        await page.click('button[type="submit"]');

        // Expect Error Toast
        // Use getByText with a regular expression for robustness
        // Expect Error Toast - Just check for the title "로그인 실패"
        await expect(page.getByText('로그인 실패')).toBeVisible({ timeout: 10000 });

        // Expect URL to stay on login
        await expect(page).toHaveURL(/\/login/);
    });

    test("Password Toggle Interaction", async ({ page }) => {
        const passwordInput = page.locator('input[name="userPwd"]');
        const eyeButton = page.getByRole('button', { name: "비밀번호 보기" }); // Initial state is hidden

        // Initial state: password
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // Click to show
        await eyeButton.click();
        await expect(passwordInput).toHaveAttribute('type', 'text');

        // Click to hide (Label changes to '비밀번호 숨기기' if implemented in logic)
        const eyeOffButton = page.getByRole('button', { name: "비밀번호 숨기기" });
        await eyeOffButton.click();
        await expect(passwordInput).toHaveAttribute('type', 'password');
    });
});
