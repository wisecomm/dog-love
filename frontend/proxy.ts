import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for Route Protection
 * 
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define Public Routes (add new guest pages here)
    const publicRoutes = ['/login', '/signup', '/find-password', '/error', '/auth'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // 2. If it's a public route or static file/api, skip checks
    // (Redundant with matcher but safe for logic)
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // 3. Check for accessToken cookie
    const token = request.cookies.get('accessToken')?.value;
    /*
        console.log(`[Proxy-Debug] ${request.method} ${pathname}`);
        console.log(`[Proxy-Debug] Token exists: ${!!token}`);
        console.log(`[Proxy-Debug] Headers: Next-Action=${request.headers.get('next-action') ? 'yes' : 'no'}, Content-Type=${request.headers.get('content-type')}`);
    */
    // 4. Redirect logic for Protected Routes
    if (!token) {
        //        console.log(`[Proxy-Debug] No token for protected route: ${pathname} -> Redirecting to login`);
        // Create the login URL with return_to parameter (optional, but good UX)
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('return_to', request.nextUrl.pathname);

        return NextResponse.redirect(loginUrl);
    }

    // 4. Continue request
    const response = NextResponse.next();
    /*
        const setCookie = response.headers.get('set-cookie');
        if (setCookie) {
            console.log(`[Proxy-Debug] Response from ${pathname} sets cookie: ${setCookie.substring(0, 30)}...`);
        }
    */
    return response;
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
