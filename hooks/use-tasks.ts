'use client';

import { useState, useEffect } from 'react';
import { taskApi } from '@/services/mock-api';
import { Task } from '@/lib/types';
import { transformTaskData, toTaskData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';
import { STORAGE_KEYS } from '@/lib/constants';

// Initialize from localStorage for instant data availability
const getInitialTasks = (projectId?: string): Task[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const allTasks = data.map(transformTaskData);
        // Filter by projectId if provided
        return projectId ? allTasks.filter((t: Task) => t.projectId === projectId) : allTasks;
      } catch {
        return [];
      }
    }
  }
  return [];
};

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>(() => getInitialTasks(projectId));
  const [isLoading, setIsLoading] = useState(() => getInitialTasks(projectId).length === 0);

  useEffect(() => {
    // Always fetch to ensure we have the latest data
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    setIsLoading(true);
    const response = await taskApi.getTasks(projectId);

    if (response.success && response.data) {
      setTasks(response.data.map(transformTaskData));
    }
    setIsLoading(false);
  };

  const createTask = async (taskData: Omit<Task, 'taskId' | 'createdAt' | 'updatedAt' | 'actualMin'>) => {
    const response = await taskApi.createTask(toTaskData(taskData) as any);

    if (response.success && response.data) {
      const newTask = transformTaskData(response.data);
      setTasks((prev) => [...prev, newTask]);
      toast({ title: '✨ Task Created!' });
      return { success: true, data: newTask };
    } else {
      toast({
        title: 'Failed to create task',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === taskId ? { ...t, ...updates } : t
      )
    );

    const response = await taskApi.updateTask(taskId, toTaskData(updates));

    if (response.success && response.data) {
      const updatedTask = transformTaskData(response.data);
      setTasks((prev) =>
        prev.map((t) => (t.taskId === taskId ? updatedTask : t))
      );
      toast({ title: 'Task updated' });
      return { success: true, data: updatedTask };
    } else {
      // Rollback on error
      await fetchTasks();
      toast({
        title: 'Failed to update task',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const deleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));

    const response = await taskApi.deleteTask(taskId);

    if (response.success) {
      toast({ title: 'Task deleted' });
    } else {
      await fetchTasks();
      toast({
        title: 'Failed to delete task',
        description: response.error,
        variant: 'destructive',
      });
    }
  };

  const updateTaskTime = async (taskId: string, durationMin: number) => {
    const response = await taskApi.updateTaskTime(taskId, durationMin);

    if (response.success && response.data) {
      const updatedTask = transformTaskData(response.data);
      setTasks((prev) =>
        prev.map((t) => (t.taskId === taskId ? updatedTask : t))
      );
    }
  };

  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.find((t) => t.taskId === taskId);
  };

  // Computed values
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    cancelled: tasks.filter(t => t.status === 'CANCELLED').length,
    estimatedTotal: tasks.reduce((sum, t) => sum + (t.estimatedMin || 0), 0),
    actualTotal: tasks.reduce((sum, t) => sum + (t.actualMin || 0), 0),
  };

  return {
    tasks,
    isLoading,
    taskStats,
    createTask,
    updateTask,
    deleteTask,
    updateTaskTime,
    getTaskById,
    refetch: fetchTasks,
  };
}
