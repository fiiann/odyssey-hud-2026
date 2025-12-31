import { ProfileData, QuestData, BossData } from './types';
import { STORAGE_KEYS } from './constants';

export const MOCK_PROFILE_DATA: ProfileData = {
  user_id: 'mock-user-1',
  username: 'SkillSeeker',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SkillSeeker',
  total_xp: 0,
  current_level: 1,
  created_at: new Date().toISOString(),
};

export const MOCK_QUESTS_DATA: QuestData[] = [
  {
    quest_id: 'quest_1',
    title: 'Built RESTful API with Express',
    description: 'Created CRUD endpoints for user management with JWT auth',
    duration_min: 120,
    category: 'BACKEND',
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    quest_id: 'quest_2',
    title: 'Designed landing page in Figma',
    description: 'Created high-fidelity mockups with component library',
    duration_min: 90,
    category: 'FRONTEND',
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    quest_id: 'quest_3',
    title: 'Implemented navigation in React Native',
    description: 'Set up React Navigation with tab and stack navigators',
    duration_min: 60,
    category: 'MOBILE',
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    quest_id: 'quest_4',
    title: 'Configured CI/CD pipeline',
    description: 'Set up GitHub Actions for automated testing and deployment',
    duration_min: 75,
    category: 'DEVOPS',
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    quest_id: 'quest_5',
    title: 'Optimized database queries',
    description: 'Added indexes and rewrote N+1 queries',
    duration_min: 45,
    category: 'BACKEND',
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
];

export const MOCK_BOSSES_DATA: BossData[] = [
  {
    boss_id: 'boss_1',
    title: 'E-Commerce Platform MVP',
    quarter: 1,
    status: 'ACTIVE',
    progress: 65,
    repo_url: 'https://github.com/username/ecommerce-mvp',
    deploy_url: 'https://ecommerce-demo.vercel.app',
    created_at: new Date('2025-01-01').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    boss_id: 'boss_2',
    title: 'Portfolio Website Redesign',
    quarter: 4,
    status: 'COMPLETED',
    progress: 100,
    repo_url: 'https://github.com/username/portfolio-v2',
    deploy_url: 'https://myportfolio.com',
    created_at: new Date('2024-10-01').toISOString(),
    updated_at: new Date('2024-12-20').toISOString(),
  },
];

// Function to seed mock data on first login
export function seedMockData() {
  const hasData = localStorage.getItem(STORAGE_KEYS.PROFILE);

  if (!hasData) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(MOCK_PROFILE_DATA));
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(MOCK_QUESTS_DATA));
    localStorage.setItem(STORAGE_KEYS.BOSSES, JSON.stringify(MOCK_BOSSES_DATA));
  }
}
