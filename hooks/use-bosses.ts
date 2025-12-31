'use client';

import { useState, useEffect } from 'react';
import { bossApi } from '@/services/mock-api';
import { Boss, BossData } from '@/lib/types';
import { transformBossData, toBossData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';

export function useBosses() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBosses();
  }, []);

  const fetchBosses = async () => {
    setIsLoading(true);
    const response = await bossApi.getBosses();

    if (response.success && response.data) {
      setBosses(response.data.map(transformBossData));
    }
    setIsLoading(false);
  };

  const createBoss = async (bossData: Omit<Boss, 'bossId' | 'createdAt' | 'updatedAt'>) => {
    const response = await bossApi.createBoss({
      title: bossData.title,
      quarter: bossData.quarter,
      status: bossData.status,
      progress: bossData.progress,
      repo_url: bossData.repoUrl,
      deploy_url: bossData.deployUrl,
    });

    if (response.success && response.data) {
      const newBoss = transformBossData(response.data);
      setBosses((prev) => [...prev, newBoss]);
      toast({ title: 'Boss created!' });
      return { success: true, data: newBoss };
    } else {
      toast({
        title: 'Failed to create boss',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const updateBoss = async (bossId: string, updates: Partial<Boss>) => {
    // Optimistic update
    const previousBosses = [...bosses];
    setBosses((prev) =>
      prev.map((b) =>
        b.bossId === bossId ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
      )
    );

    const response = await bossApi.updateBoss(bossId, toBossData(updates));

    if (response.success && response.data) {
      const updatedBoss = transformBossData(response.data);
      setBosses((prev) =>
        prev.map((b) => (b.bossId === bossId ? updatedBoss : b))
      );
      toast({ title: 'Boss updated!' });
      return { success: true, data: updatedBoss };
    } else {
      // Rollback
      setBosses(previousBosses);
      toast({
        title: 'Failed to update boss',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const deleteBoss = async (bossId: string) => {
    const response = await bossApi.deleteBoss(bossId);

    if (response.success) {
      setBosses((prev) => prev.filter((b) => b.bossId !== bossId));
      toast({ title: 'Boss deleted' });
      return { success: true };
    } else {
      toast({
        title: 'Failed to delete boss',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const getActiveBoss = () => {
    return bosses.find((b) => b.status === 'ACTIVE') || null;
  };

  const getBossesByQuarter = (quarter: number) => {
    return bosses.filter((b) => b.quarter === quarter);
  };

  const getCompletedBosses = () => {
    return bosses.filter((b) => b.status === 'COMPLETED');
  };

  return {
    bosses,
    isLoading,
    createBoss,
    updateBoss,
    deleteBoss,
    getActiveBoss,
    getBossesByQuarter,
    getCompletedBosses,
    refetch: fetchBosses,
  };
}
