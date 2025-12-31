'use client';

import { useState, useEffect } from 'react';
import { missionApi } from '@/services/mock-api';
import { Mission } from '@/lib/types';
import { transformMissionData, toMissionData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    setIsLoading(true);
    const response = await missionApi.getMissions();

    if (response.success && response.data) {
      setMissions(response.data.map(transformMissionData));
    }
    setIsLoading(false);
  };

  const createMission = async (missionData: Omit<Mission, 'missionId' | 'createdAt'>) => {
    const optimisticMission: Mission = {
      missionId: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...missionData,
    };

    setMissions((prev) => [optimisticMission, ...prev]);

    const response = await missionApi.createMission(toMissionData(missionData));

    if (response.success && response.data) {
      setMissions((prev) =>
        prev.map((m) =>
          m.missionId === optimisticMission.missionId
            ? transformMissionData(response.data!)
            : m
        )
      );
      toast({ title: 'Execution Logged!' });
      return { success: true, data: transformMissionData(response.data) };
    } else {
      setMissions((prev) => prev.filter((m) => m.missionId !== optimisticMission.missionId));
      toast({
        title: 'Failed to log execution',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const deleteMission = async (missionId: string) => {
    const deletedMission = missions.find((m) => m.missionId === missionId);
    if (!deletedMission) return;

    setMissions((prev) => prev.filter((m) => m.missionId !== missionId));

    const response = await missionApi.deleteMission(missionId);

    if (response.success) {
      toast({ title: 'Entry deleted' });
    } else {
      setMissions((prev) => [deletedMission, ...prev].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      toast({
        title: 'Failed to delete entry',
        description: response.error,
        variant: 'destructive',
      });
    }
  };

  return {
    missions,
    isLoading,
    createMission,
    deleteMission,
    refetch: fetchMissions,
  };
}
