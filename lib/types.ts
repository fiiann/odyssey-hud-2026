// API Response Types (snake_case)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  validation_errors?: Record<string, string>;
}

export interface AuthResponse {
  token: string;
  user: {
    user_id: string;
    email: string;
    username: string;
  };
}

export interface ProfileData {
  user_id: string;
  username: string;
  avatar_url: string;
  total_xp: number;
  current_level: number;
  created_at: string;
}

export interface QuestData {
  quest_id: string;
  created_at: string;
  title: string;
  description?: string;
  duration_min: number;
  category: 'BACKEND' | 'FRONTEND' | 'MOBILE' | 'DEVOPS';
}

export interface BossData {
  boss_id: string;
  title: string;
  quarter: 1 | 2 | 3 | 4;
  status: 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
  progress: number;
  repo_url?: string;
  deploy_url?: string;
  created_at: string;
  updated_at: string;
}

// Client-side State Types (camelCase for internal use)
export interface Profile {
  userId: string;
  username: string;
  avatarUrl: string;
  totalXp: number;
  currentLevel: number;
  createdAt: string;
}

export interface Quest {
  questId: string;
  createdAt: string;
  title: string;
  description?: string;
  durationMin: number;
  category: 'BACKEND' | 'FRONTEND' | 'MOBILE' | 'DEVOPS';
}

export interface Boss {
  bossId: string;
  title: string;
  quarter: 1 | 2 | 3 | 4;
  status: 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
  progress: number;
  repoUrl?: string;
  deployUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  profile: Profile | null;
  quests: Quest[];
  bosses: Boss[];
  isAuthenticated: boolean;
}

export type Category = 'BACKEND' | 'FRONTEND' | 'MOBILE' | 'DEVOPS';
export type BossStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
export type Quarter = 1 | 2 | 3 | 4;
