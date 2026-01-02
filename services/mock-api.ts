import {
  ApiResponse, AuthResponse, ProfileData,
  MissionData, ProjectData, TaskData
} from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 400));

const shouldSimulateError = () => Math.random() < 0.05;

const generateMockToken = (email: string): string => {
  const payload = {
    user_id: 'mock-user-1',
    email,
    exp: Date.now() + 3600000,
    iat: Date.now(),
  };
  return btoa(JSON.stringify(payload));
};

export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    await simulateDelay();
    if (email === 'superadmin@gmail.com' && password === '123456') {
      const token = generateMockToken(email);
      return {
        success: true,
        data: {
          token,
          user: { user_id: 'mock-user-1', email, username: 'ArchitectPrime' },
        },
      };
    }
    return { success: false, error: 'Invalid email or password' };
  },
  logout: async (): Promise<ApiResponse<null>> => {
    await simulateDelay();
    return { success: true, data: null };
  },
  validateToken: async (token: string): Promise<ApiResponse<{ valid: boolean }>> => {
    await simulateDelay();
    try {
      const payload = JSON.parse(atob(token));
      return { success: true, data: { valid: Date.now() < payload.exp } };
    } catch {
      return { success: false, error: 'Invalid token' };
    }
  },
};

export const profileApi = {
  getProfile: async (): Promise<ApiResponse<ProfileData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const profile = stored ? JSON.parse(stored) : {
      user_id: 'mock-user-1',
      username: 'ArchitectPrime',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArchitectPrime',
      total_xp: 0,
      current_level: 0,
      created_at: new Date().toISOString(),
    };
    return { success: true, data: profile };
  },
  updateProfile: async (updates: Partial<ProfileData>): Promise<ApiResponse<ProfileData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const current = stored ? JSON.parse(stored) : {};
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return { success: true, data: updated };
  },
};

export const missionApi = {
  getMissions: async (): Promise<ApiResponse<MissionData[]>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    return { success: true, data: stored ? JSON.parse(stored) : [] };
  },
  createMission: async (data: Omit<MissionData, 'mission_id' | 'created_at'>): Promise<ApiResponse<MissionData>> => {
    await simulateDelay();
    if (shouldSimulateError()) return { success: false, error: 'Network failure' };

    const newMission: MissionData = {
      mission_id: `mission_${Date.now()}`,
      created_at: new Date().toISOString(),
      ...data,
    };

    const stored = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    const missions = stored ? JSON.parse(stored) : [];
    missions.unshift(newMission);
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));

    // Update profile XP
    const profileStored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (profileStored) {
      const profile = JSON.parse(profileStored);
      profile.total_xp += data.duration_min;
      profile.current_level = Math.floor(Math.sqrt(profile.total_xp / 60));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }

    // NEW: If mission is linked to a task, update task's actual_min
    if (data.task_id) {
      const tasksStored = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (tasksStored) {
        const tasks: TaskData[] = JSON.parse(tasksStored);
        const taskIndex = tasks.findIndex(t => t.task_id === data.task_id);
        if (taskIndex !== -1) {
          tasks[taskIndex].actual_min = (tasks[taskIndex].actual_min || 0) + data.duration_min;
          tasks[taskIndex].updated_at = new Date().toISOString();
          localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
        }
      }
    }

    return { success: true, data: newMission };
  },
  deleteMission: async (missionId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    const missions: MissionData[] = stored ? JSON.parse(stored) : [];
    const mission = missions.find(m => m.mission_id === missionId);

    if (mission) {
      const filtered = missions.filter(m => m.mission_id !== missionId);
      localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(filtered));

      const profileStored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (profileStored) {
        const profile = JSON.parse(profileStored);
        profile.total_xp = Math.max(0, profile.total_xp - mission.duration_min);
        profile.current_level = Math.floor(Math.sqrt(profile.total_xp / 60));
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      }

      // NEW: If mission was linked to a task, decrement task's actual_min
      if (mission.task_id) {
        const tasksStored = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (tasksStored) {
          const tasks: TaskData[] = JSON.parse(tasksStored);
          const taskIndex = tasks.findIndex(t => t.task_id === mission.task_id);
          if (taskIndex !== -1) {
            tasks[taskIndex].actual_min = Math.max(0, (tasks[taskIndex].actual_min || 0) - mission.duration_min);
            tasks[taskIndex].updated_at = new Date().toISOString();
            localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
          }
        }
      }
    }
    return { success: true, data: { deleted: true } };
  },
};

export const projectApi = {
  getProjects: async (): Promise<ApiResponse<ProjectData[]>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return { success: true, data: stored ? JSON.parse(stored) : [] };
  },
  createProject: async (data: Omit<ProjectData, 'project_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<ProjectData>> => {
    await simulateDelay();
    const newProject: ProjectData = {
      project_id: `project_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data,
    };
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const projects = stored ? JSON.parse(stored) : [];
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return { success: true, data: newProject };
  },
  updateProject: async (projectId: string, updates: Partial<ProjectData>): Promise<ApiResponse<ProjectData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const projects: ProjectData[] = stored ? JSON.parse(stored) : [];
    const index = projects.findIndex(p => p.project_id === projectId);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      return { success: true, data: projects[index] };
    }
    return { success: false, error: 'Project not found' };
  },
  deleteProject: async (projectId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const projects: ProjectData[] = stored ? JSON.parse(stored) : [];
    const filtered = projects.filter(p => p.project_id !== projectId);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
    return { success: true, data: { deleted: true } };
  },
};

// NEW: Task API
export const taskApi = {
  getTasks: async (projectId?: string): Promise<ApiResponse<TaskData[]>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    let tasks = stored ? JSON.parse(stored) : [];

    if (projectId) {
      tasks = tasks.filter((t: TaskData) => t.project_id === projectId);
    }

    return { success: true, data: tasks };
  },

  getTaskById: async (taskId: string): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const task = tasks.find(t => t.task_id === taskId);

    if (task) {
      return { success: true, data: task };
    }
    return { success: false, error: 'Task not found' };
  },

  createTask: async (data: Omit<TaskData, 'task_id' | 'created_at' | 'updated_at' | 'actual_min' | 'position'>): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    if (shouldSimulateError()) return { success: false, error: 'Network failure' };

    const newTask: TaskData = {
      task_id: `task_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      actual_min: 0,
      tags: data.tags || [],
      position: Date.now(),
      ...data,
    };

    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks = stored ? JSON.parse(stored) : [];
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    return { success: true, data: newTask };
  },

  updateTask: async (taskId: string, updates: Partial<TaskData>): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const index = tasks.findIndex(t => t.task_id === taskId);

    if (index !== -1) {
      // If marking as completed, set completed_at
      if (updates.status === 'COMPLETED' && !tasks[index].completed_at) {
        updates.completed_at = new Date().toISOString();
      }

      tasks[index] = { ...tasks[index], ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return { success: true, data: tasks[index] };
    }
    return { success: false, error: 'Task not found' };
  },

  deleteTask: async (taskId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const filtered = tasks.filter(t => t.task_id !== taskId);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filtered));
    return { success: true, data: { deleted: true } };
  },

  // Update actual_min when mission is linked to task
  updateTaskTime: async (taskId: string, durationMin: number): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const index = tasks.findIndex(t => t.task_id === taskId);

    if (index !== -1) {
      tasks[index].actual_min = (tasks[index].actual_min || 0) + durationMin;
      tasks[index].updated_at = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return { success: true, data: tasks[index] };
    }
    return { success: false, error: 'Task not found' };
  },
};
