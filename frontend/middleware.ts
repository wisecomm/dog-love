import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for Route Protection
 * 
 * checks for the presence of 'accessToken' cookie.
 * If missing for protected routes, redirects to /login.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define Public Routes (add new guest pages here)
    const publicRoutes = ['/login', '/signup', '/find-password', '/error'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // 2. If it's a public route or static file/api, skip checks
    // (Redundant with matcher but safe for logic)
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // 3. Check for accessToken cookie
    const token = request.cookies.get('accessToken')?.value;

    // 4. Redirect logic for Protected Routes
    if (!token) {
        // Create the login URL with return_to parameter (optional, but good UX)
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('return_to', request.nextUrl.pathname);

        return NextResponse.redirect(loginUrl);
    }

    // 4. Continue request
    return NextResponse.next();
}

/**
 * Configure paths where middleware should run
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - login (public login page)
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
    ],
};
