import { ProfileData, QuestData, BossData, Profile, Quest, Boss } from './types';

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

export function transformQuestData(data: QuestData): Quest {
  return {
    questId: data.quest_id,
    createdAt: data.created_at,
    title: data.title,
    description: data.description,
    durationMin: data.duration_min,
    category: data.category,
  };
}

export function transformBossData(data: BossData): Boss {
  return {
    bossId: data.boss_id,
    title: data.title,
    quarter: data.quarter,
    status: data.status,
    progress: data.progress,
    repoUrl: data.repo_url,
    deployUrl: data.deploy_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

// Reverse transformations for sending to API
export function toQuestData(quest: Omit<Quest, 'questId' | 'createdAt'>): Omit<QuestData, 'quest_id' | 'created_at'> {
  return {
    title: quest.title,
    description: quest.description,
    duration_min: quest.durationMin,
    category: quest.category,
  };
}

export function toBossData(boss: Partial<Boss>): Partial<BossData> {
  const data: Partial<BossData> = {};

  if (boss.title !== undefined) data.title = boss.title;
  if (boss.quarter !== undefined) data.quarter = boss.quarter;
  if (boss.status !== undefined) data.status = boss.status;
  if (boss.progress !== undefined) data.progress = boss.progress;
  if (boss.repoUrl !== undefined) data.repo_url = boss.repoUrl;
  if (boss.deployUrl !== undefined) data.deploy_url = boss.deployUrl;

  return data;
}

export function toProfileData(profile: Partial<Profile>): Partial<ProfileData> {
  const data: Partial<ProfileData> = {};

  if (profile.username !== undefined) data.username = profile.username;
  if (profile.avatarUrl !== undefined) data.avatar_url = profile.avatarUrl;
  if (profile.totalXp !== undefined) data.total_xp = profile.totalXp;
  if (profile.currentLevel !== undefined) data.current_level = profile.currentLevel;

  return data;
}
