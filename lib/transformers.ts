import { Profile, ProfileData, Mission, MissionData, Project, ProjectData, Task, TaskData } from './types';

export function transformProfileData(data: ProfileData): Profile {
  return {
    userId: data.user_id,
    username: data.username,
    avatarUrl: data.avatar_url,
    totalXp: data.total_xp,
    currentLevel: data.current_level,
    createdAt: data.created_at,
    terminologyMode: data.terminology_mode, // NEW: Terminology mode
  };
}

export function transformMissionData(data: MissionData): Mission {
  return {
    missionId: data.mission_id,
    projectId: data.project_id,
    taskId: data.task_id, // NEW: Optional task link
    createdAt: data.created_at,
    title: data.title,
    description: data.description,
    durationMin: data.duration_min,
    category: data.category, // NEW: Category
  };
}

// NEW: Transform Task API data to client format
export function transformTaskData(data: TaskData): Task {
  return {
    taskId: data.task_id,
    projectId: data.project_id,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    category: data.category as Task['category'],
    estimatedMin: data.estimated_min,
    actualMin: data.actual_min || 0,
    assignedTo: data.assigned_to,
    parentTaskId: data.parent_task_id,
    milestoneId: data.milestone_id,
    tags: data.tags || [],
    position: data.position,
    dueDate: data.due_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    completedAt: data.completed_at,
  };
}

export function transformProjectData(data: ProjectData): Project {
  return {
    projectId: data.project_id,
    title: data.title,
    description: data.description,
    status: data.status,
    progress: data.progress,
    repoUrl: data.repo_url,
    deployUrl: data.deploy_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export function toProfileData(profile: Partial<Profile>): Partial<ProfileData> {
  const data: Partial<ProfileData> = {};
  if (profile.username !== undefined) data.username = profile.username;
  if (profile.avatarUrl !== undefined) data.avatar_url = profile.avatarUrl;
  if (profile.totalXp !== undefined) data.total_xp = profile.totalXp;
  if (profile.currentLevel !== undefined) data.current_level = profile.currentLevel;
  if (profile.terminologyMode !== undefined) data.terminology_mode = profile.terminologyMode; // NEW
  return data;
}

export function toMissionData(mission: Omit<Mission, 'missionId' | 'createdAt'>): Omit<MissionData, 'mission_id' | 'created_at'> {
  return {
    project_id: mission.projectId,
    task_id: mission.taskId, // NEW
    title: mission.title,
    description: mission.description,
    duration_min: mission.durationMin,
    category: mission.category, // NEW
  };
}

// NEW: Transform Task client format to API format
export function toTaskData(task: Partial<Task>): Partial<TaskData> {
  const data: Partial<TaskData> = {};

  if (task.projectId !== undefined) data.project_id = task.projectId;
  if (task.title !== undefined) data.title = task.title;
  if (task.description !== undefined) data.description = task.description;
  if (task.status !== undefined) data.status = task.status;
  if (task.priority !== undefined) data.priority = task.priority;
  if (task.category !== undefined) data.category = task.category;
  if (task.estimatedMin !== undefined) data.estimated_min = task.estimatedMin;
  if (task.actualMin !== undefined) data.actual_min = task.actualMin;
  if (task.assignedTo !== undefined) data.assigned_to = task.assignedTo;
  if (task.parentTaskId !== undefined) data.parent_task_id = task.parentTaskId;
  if (task.milestoneId !== undefined) data.milestone_id = task.milestoneId;
  if (task.tags !== undefined) data.tags = task.tags;
  if (task.position !== undefined) data.position = task.position;
  if (task.dueDate !== undefined) data.due_date = task.dueDate;
  if (task.completedAt !== undefined) data.completed_at = task.completedAt;

  return data;
}

export function toProjectData(project: Partial<Project>): Partial<ProjectData> {
  const data: Partial<ProjectData> = {};

  if (project.title !== undefined) data.title = project.title;
  if (project.description !== undefined) data.description = project.description;
  if (project.status !== undefined) data.status = project.status;
  if (project.progress !== undefined) data.progress = project.progress;
  if (project.repoUrl !== undefined) data.repo_url = project.repoUrl;
  if (project.deployUrl !== undefined) data.deploy_url = project.deployUrl;

  return data;
}
