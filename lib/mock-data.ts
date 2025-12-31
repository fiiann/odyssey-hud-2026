import { ProfileData, MissionData, ProjectData } from './types';
import { STORAGE_KEYS } from './constants';

export const MOCK_PROFILE_DATA: ProfileData = {
  user_id: 'mock-user-1',
  username: 'ArchitectPrime',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArchitectPrime',
  total_xp: 0,
  current_level: 0,
  created_at: new Date().toISOString(),
};

export const MOCK_PROJECTS_DATA: ProjectData[] = [
  {
    project_id: 'project_1',
    title: 'Odyssey HUD 2026',
    description: 'The ultimate architect command center dashboard',
    status: 'ACTIVE',
    progress: 45,
    repo_url: 'https://github.com/prime/odyssey-hud',
    deploy_url: 'https://odyssey.vercel.app',
    created_at: new Date('2025-12-01').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    project_id: 'project_2',
    title: 'Nexus Auth System',
    description: 'High-performance distributed auth service',
    status: 'COMPLETED',
    progress: 100,
    repo_url: 'https://github.com/prime/nexus-auth',
    created_at: new Date('2025-11-01').toISOString(),
    updated_at: new Date('2025-11-20').toISOString(),
  },
];

export const MOCK_MISSIONS_DATA: MissionData[] = [
  {
    mission_id: 'mission_1',
    project_id: 'project_1',
    title: 'Implement Dark Mode tokens',
    description: 'Transitioned all components to Tailwind v4 CSS variables',
    duration_min: 45,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    mission_id: 'mission_2',
    project_id: 'project_1',
    title: 'Refactor Auth Hook',
    description: 'Cleaned up token validation logic and cookie handling',
    duration_min: 30,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function seedMockData() {
  const hasData = localStorage.getItem(STORAGE_KEYS.PROFILE);

  if (!hasData) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(MOCK_PROFILE_DATA));
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(MOCK_MISSIONS_DATA));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(MOCK_PROJECTS_DATA));

    // Calculate initial XP
    let totalXp = 0;
    MOCK_MISSIONS_DATA.forEach(m => totalXp += m.duration_min);
    const profile = { ...MOCK_PROFILE_DATA, total_xp: totalXp, current_level: Math.floor(Math.sqrt(totalXp / 60)) };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }
}
