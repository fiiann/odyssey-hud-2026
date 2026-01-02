import { Mission, Project, Task } from './types';

export function calculateLevel(totalMinutes: number): number {
  return Math.floor(Math.sqrt(totalMinutes / 60));
}

export function calculateXpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel + 1, 2) * 60;
}

export function getXpProgress(totalMinutes: number): {
  currentLevel: number;
  currentLevelXp: number;
  nextLevelXp: number;
  xpToNextLevel: number;
  progressPercent: number;
} {
  const currentLevel = calculateLevel(totalMinutes);
  const currentLevelXp = Math.pow(currentLevel, 2) * 60;
  const nextLevelXp = calculateXpForNextLevel(currentLevel);
  const progressInLevel = totalMinutes - currentLevelXp;
  const xpNeededForLevel = nextLevelXp - currentLevelXp;
  const progressPercent = xpNeededForLevel > 0 ? (progressInLevel / xpNeededForLevel) * 100 : 100;
  const xpToNextLevel = nextLevelXp - totalMinutes;

  return {
    currentLevel,
    currentLevelXp,
    nextLevelXp,
    xpToNextLevel,
    progressPercent,
  };
}

export function getProjectExecutionStats(missions: Mission[], projects: Project[], tasks: Task[] = []) {
  const projectMissions: Record<string, number> = {};

  missions.forEach(m => {
    projectMissions[m.projectId] = (projectMissions[m.projectId] || 0) + m.durationMin;
  });

  return projects.map(p => {
    // Filter tasks for this project, excluding cancelled ones
    const projectTasks = tasks.filter(t => t.projectId === p.projectId && t.status !== 'CANCELLED');
    const totalTasks = projectTasks.length;
    const completedTasks = projectTasks.filter(t => t.status === 'COMPLETED').length;

    // Calculate progress: if no tasks, progress is 0. Otherwise (completed / total) * 100
    const computedProgress = totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return {
      ...p,
      totalMinutes: projectMissions[p.projectId] || 0,
      progress: computedProgress, // Overwrite manual progress
    };
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function calculateLevelProgress(totalXp: number): number {
  const currentLevel = calculateLevel(totalXp);
  const currentLevelXp = Math.pow(currentLevel, 2) * 60;
  const nextLevelXp = calculateXpForNextLevel(currentLevel);
  const xpNeededForLevel = nextLevelXp - currentLevelXp;
  const progressInLevel = totalXp - currentLevelXp;

  return xpNeededForLevel > 0 ? (progressInLevel / xpNeededForLevel) * 100 : 100;
}
