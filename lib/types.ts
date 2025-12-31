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

export interface MissionData {
  mission_id: string;
  project_id: string; // Link to project
  created_at: string;
  title: string;
  description?: string;
  duration_min: number;
}

export interface ProjectData {
  project_id: string;
  title: string;
  description?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
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

export interface Mission {
  missionId: string;
  projectId: string;
  createdAt: string;
  title: string;
  description?: string;
  durationMin: number;
}

export interface Project {
  projectId: string;
  title: string;
  description?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  progress: number;
  repoUrl?: string;
  deployUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  profile: Profile | null;
  missions: Mission[];
  projects: Project[];
  isAuthenticated: boolean;
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
