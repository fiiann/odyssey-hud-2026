'use client';

import { useState, useEffect } from 'react';
import { questApi, withRateLimit } from '@/services/mock-api';
import { Quest, QuestData } from '@/lib/types';
import { transformQuestData, toQuestData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuests();
  }, []);

  const fetchQuests = async () => {
    setIsLoading(true);
    const response = await questApi.getQuests();

    if (response.success && response.data) {
      setQuests(response.data.map(transformQuestData));
    }
    setIsLoading(false);
  };

  const createQuest = async (questData: Omit<Quest, 'questId' | 'createdAt'>) => {
    // Optimistic update
    const optimisticQuest: Quest = {
      questId: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...questData,
    };

    setQuests((prev) => [optimisticQuest, ...prev]);

    // API call
    const response = await withRateLimit(
      'create-quest',
      () => questApi.createQuest(toQuestData(questData))
    );

    if (response.success && response.data) {
      // Replace optimistic with real data
      setQuests((prev) =>
        prev.map((q) =>
          q.questId === optimisticQuest.questId
            ? transformQuestData(response.data!)
            : q
        )
      );
      toast({ title: 'Quest logged!' });
      return { success: true, data: transformQuestData(response.data) };
    } else {
      // Rollback on error
      setQuests((prev) => prev.filter((q) => q.questId !== optimisticQuest.questId));
      toast({
        title: 'Failed to log quest',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const deleteQuest = async (questId: string) => {
    const deletedQuest = quests.find((q) => q.questId === questId);
    if (!deletedQuest) return;

    // Optimistic update
    setQuests((prev) => prev.filter((q) => q.questId !== questId));

    // API call
    const response = await questApi.deleteQuest(questId);

    if (response.success) {
      toast({ title: 'Quest deleted' });
    } else {
      // Rollback
      setQuests((prev) => [...prev, deletedQuest].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      toast({
        title: 'Failed to delete quest',
        description: response.error,
        variant: 'destructive',
      });
    }
  };

  const getRecentQuests = (limit: number = 10) => {
    return quests.slice(0, limit);
  };

  return {
    quests,
    isLoading,
    createQuest,
    deleteQuest,
    getRecentQuests,
    refetch: fetchQuests,
  };
}
