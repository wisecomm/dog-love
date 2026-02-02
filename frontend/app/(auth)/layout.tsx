'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sessionManager } from '@/lib/auth/session-manager';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        if (sessionManager.getUserInfo()) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            {children}
        </div>
    );
}
