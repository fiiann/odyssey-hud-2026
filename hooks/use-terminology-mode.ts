'use client';

import { useState, useEffect } from 'react';
import { useProfile } from './use-profile';

export function useTerminologyMode() {
  const { profile, updateProfile } = useProfile();
  const [mode, setMode] = useState<'PROFESSIONAL' | 'ODYSSEY'>(() => {
    // Initialize from localStorage or profile
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('terminologyMode');
      if (saved === 'PROFESSIONAL' || saved === 'ODYSSEY') {
        return saved;
      }
    }
    return profile?.terminologyMode || 'PROFESSIONAL';
  });

  // Sync with profile when it loads
  useEffect(() => {
    if (profile?.terminologyMode) {
      setMode(profile.terminologyMode);
    }
  }, [profile]);

  const changeMode = async (newMode: 'PROFESSIONAL' | 'ODYSSEY') => {
    setMode(newMode);

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('terminologyMode', newMode);
    }

    // Update profile if available
    if (profile && updateProfile) {
      try {
        await updateProfile({ terminologyMode: newMode });
      } catch (error) {
        console.error('Failed to update terminology mode in profile:', error);
      }
    }
  };

  return {
    mode,
    setMode: changeMode,
    isProfessional: mode === 'PROFESSIONAL',
    isOdyssey: mode === 'ODYSSEY'
  };
}
