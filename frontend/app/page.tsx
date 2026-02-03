'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sessionManager } from '@/lib/auth/session-manager';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if session is valid
    if (sessionManager.isSessionValid()) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Optional Loading Spinner */}
    </div>
  );
}
