'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        router.push('/admin/users');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user?.role, router]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRedirect;