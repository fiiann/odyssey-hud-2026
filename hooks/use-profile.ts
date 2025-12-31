'use client';

import { useState, useEffect } from 'react';
import { profileApi } from '@/services/mock-api';
import { Profile, ProfileData } from '@/lib/types';
import { transformProfileData, toProfileData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';
import { calculateLevel } from '@/lib/calculations';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [levelUpModal, setLevelUpModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    const response = await profileApi.getProfile();

    if (response.success && response.data) {
      const transformed = transformProfileData(response.data);
      setProfile(transformed);
    }
    setIsLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    const response = await profileApi.updateProfile(toProfileData(updates));

    if (response.success && response.data) {
      const newProfile = transformProfileData(response.data);
      const oldLevel = profile?.currentLevel || 1;
      const newLevel = newProfile.currentLevel;

      setProfile(newProfile);

      // Check for level up
      if (newLevel > oldLevel) {
        setLevelUpModal(true);
        setTimeout(() => setLevelUpModal(false), 3000);
      }

      toast({ title: 'Profile updated!' });
      return { success: true, data: newProfile };
    } else {
      toast({
        title: 'Failed to update profile',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const refreshProfile = () => {
    fetchProfile();
  };

  return {
    profile,
    isLoading,
    levelUpModal,
    setLevelUpModal,
    updateProfile,
    refreshProfile,
  };
}
