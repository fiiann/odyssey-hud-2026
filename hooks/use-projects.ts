'use client';

import { useState, useEffect } from 'react';
import { projectApi } from '@/services/mock-api';
import { Project } from '@/lib/types';
import { transformProjectData, toProjectData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';
import { STORAGE_KEYS } from '@/lib/constants';

// Initialize from localStorage for instant data availability
const getInitialProjects = (): Project[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return data.map(transformProjectData);
      } catch {
        return [];
      }
    }
  }
  return [];
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(getInitialProjects);
  const [isLoading, setIsLoading] = useState(() => getInitialProjects().length === 0);

  useEffect(() => {
    // Only fetch if we don't have data yet
    if (projects.length > 0) {
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const response = await projectApi.getProjects();

    if (response.success && response.data) {
      setProjects(response.data.map(transformProjectData));
    }
    setIsLoading(false);
  };

  const createProject = async (projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>) => {
    const response = await projectApi.createProject(toProjectData(projectData) as any);

    if (response.success && response.data) {
      const newProject = transformProjectData(response.data);
      setProjects((prev) => [...prev, newProject]);
      toast({ title: 'New Project Initiated!' });
      return { success: true, data: newProject };
    } else {
      toast({
        title: 'Failed to initiate project',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    const response = await projectApi.updateProject(projectId, toProjectData(updates));

    if (response.success && response.data) {
      const updatedProject = transformProjectData(response.data);
      setProjects((prev) =>
        prev.map((p) => (p.projectId === projectId ? updatedProject : p))
      );
      toast({ title: 'Project status updated' });
      return { success: true, data: updatedProject };
    } else {
      toast({
        title: 'Failed to update project',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const deleteProject = async (projectId: string) => {
    const response = await projectApi.deleteProject(projectId);

    if (response.success) {
      setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
      toast({ title: 'Project archived' });
    } else {
      toast({
        title: 'Failed to delete project',
        description: response.error,
        variant: 'destructive',
      });
    }
  };

  const getProjectById = (projectId: string): Project | undefined => {
    return projects.find((p) => p.projectId === projectId);
  };

  return {
    projects,
    isLoading,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    refetch: fetchProjects,
  };
}
