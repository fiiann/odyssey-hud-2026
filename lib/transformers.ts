import { Profile, ProfileData, Mission, MissionData, Project, ProjectData } from './types';

export function transformProfileData(data: ProfileData): Profile {
  return {
    userId: data.user_id,
    username: data.username,
    avatarUrl: data.avatar_url,
    totalXp: data.total_xp,
    currentLevel: data.current_level,
    createdAt: data.created_at,
  };
}

export function transformMissionData(data: MissionData): Mission {
  return {
    missionId: data.mission_id,
    projectId: data.project_id,
    createdAt: data.created_at,
    title: data.title,
    description: data.description,
    durationMin: data.duration_min,
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
  return data;
}

export function toMissionData(mission: Omit<Mission, 'missionId' | 'createdAt'>): Omit<MissionData, 'mission_id' | 'created_at'> {
  return {
    project_id: mission.projectId,
    title: mission.title,
    description: mission.description,
    duration_min: mission.durationMin,
  };
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
