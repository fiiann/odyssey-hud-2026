'use client';

import { useState, useEffect } from 'react';
import { authApi } from '@/services/mock-api';
import { STORAGE_KEYS } from '@/lib/constants';
import { AuthResponse } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

export function useAuth() {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      authApi.validateToken(token).then(response => {
        if (response.success) {
          // Token valid, fetch user info
          const userData = JSON.parse(atob(token));
          setUser({
            user_id: userData.user_id,
            email: userData.email,
            username: 'SkillSeeker', // From profile
          });
          setIsAuthenticated(true);
        } else {
          // Token expired
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await authApi.login(email, password);

    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      // Set cookie for middleware
      document.cookie = `odyssey_auth_token=${response.data.token}; path=/; max-age=3600`;
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast({ title: 'Welcome back!' });
      setIsLoading(false);
      return { success: true };
    } else {
      toast({
        title: 'Login failed',
        description: response.error,
        variant: 'destructive',
      });
      setIsLoading(false);
      return { success: false, error: response.error };
    }
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.clear(); // Clear all app data
    // Clear cookie
    document.cookie = 'odyssey_auth_token=; path=/; max-age=0';
    setUser(null);
    setIsAuthenticated(false);
    toast({ title: 'Logged out successfully' });
  };

  return { user, isAuthenticated, isLoading, login, logout };
}
