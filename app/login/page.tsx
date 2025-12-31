'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { useAuth } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (data: { email: string; password: string }) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      router.push('/dashboard');
    }
    return result;
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      <Toaster />
    </>
  );
}
