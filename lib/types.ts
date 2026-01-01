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
  terminology_mode?: 'PROFESSIONAL' | 'ODYSSEY'; // NEW: User's terminology preference
}

export interface MissionData {
  mission_id: string;
  project_id: string; // Link to project
  task_id?: string; // NEW: Optional link to task
  created_at: string;
  title: string;
  description?: string;
  duration_min: number;
  category?: string; // NEW: Mission category (inherited from task or manual)
}

// NEW: Task Data (API format - snake_case)
export interface TaskData {
  task_id: string;
  project_id: string; // Link to project
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category?: string; // Backend, Frontend, DevOps, etc.
  estimated_min?: number; // Estimated time in minutes
  actual_min?: number; // Actual time spent (sum of missions)
  assigned_to?: string; // User ID (future: team feature)
  parent_task_id?: string; // For subtasks
  milestone_id?: string; // Link to milestone (future)
  tags?: string[]; // Custom tags
  position: number; // For ordering
  due_date?: string; // ISO date string
  created_at: string;
  updated_at: string;
  completed_at?: string;
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
  terminologyMode?: 'PROFESSIONAL' | 'ODYSSEY'; // NEW: User's terminology preference
}

export interface Mission {
  missionId: string;
  projectId: string;
  taskId?: string; // NEW: Optional link to task
  createdAt: string;
  title: string;
  description?: string;
  durationMin: number;
  category?: string; // NEW: Mission category
}

// NEW: Task (client format - camelCase)
export interface Task {
  taskId: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category?: TaskCategory;
  estimatedMin?: number;
  actualMin?: number;
  assignedTo?: string;
  parentTaskId?: string;
  milestoneId?: string;
  tags: string[];
  position: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
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
  tasks: Task[]; // NEW: Tasks in state
  isAuthenticated: boolean;
}

// Type Definitions
export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskCategory = 'Backend' | 'Frontend' | 'Mobile' | 'DevOps' | 'Design' | 'Testing' | 'Documentation' | 'Other';
export type TerminologyMode = 'PROFESSIONAL' | 'ODYSSEY';
