import { ApiResponse, AuthResponse, ProfileData, QuestData, BossData } from '@/lib/types';
import { generateMockToken } from '@/lib/utils';
import { STORAGE_KEYS, MOCK_CREDENTIALS } from '@/lib/constants';

// Utility: Simulate network delay (random 500-1500ms)
const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

// Utility: Random error simulation (10% chance)
const shouldSimulateError = () => Math.random() < 0.1;

// Rate limiting store
let rateLimitStore: Record<string, number[]> = {};

export const checkRateLimit = (key: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = [];
  }

  // Clean old requests outside window
  rateLimitStore[key] = rateLimitStore[key].filter(time => now - time < windowMs);

  if (rateLimitStore[key].length >= maxRequests) {
    return false; // Rate limited
  }

  rateLimitStore[key].push(now);
  return true;
};

// Wrap API calls with rate limiting
export const withRateLimit = async <T>(
  key: string,
  apiCall: () => Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> => {
  if (!checkRateLimit(key)) {
    return {
      success: false,
      error: 'Too many requests. Please wait a moment and try again.',
    };
  }

  return apiCall();
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    await simulateDelay();

    // if (shouldSimulateError()) {
    //   return { success: false, error: 'Network timeout. Please try again.' };
    // }

    if (email === MOCK_CREDENTIALS.EMAIL && password === MOCK_CREDENTIALS.PASSWORD) {
      const token = generateMockToken(email);
      return {
        success: true,
        data: {
          token,
          user: {
            user_id: 'mock-user-1',
            email,
            username: 'SkillSeeker',
          },
        },
      };
    }

    return {
      success: false,
      error: 'Invalid email or password',
    };
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await simulateDelay();
    return { success: true, data: null };
  },

  validateToken: async (token: string): Promise<ApiResponse<{ valid: boolean }>> => {
    await simulateDelay();

    try {
      const payload = JSON.parse(atob(token));
      const isExpired = Date.now() > payload.exp;

      if (isExpired) {
        return {
          success: false,
          error: 'Token expired. Please login again.',
        };
      }

      return { success: true, data: { valid: true } };
    } catch {
      return {
        success: false,
        error: 'Invalid token',
      };
    }
  },
};

// Profile API
export const profileApi = {
  getProfile: async (): Promise<ApiResponse<ProfileData>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to fetch profile' };
    }

    // Return mock profile from localStorage or default
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const profile = stored ? JSON.parse(stored) : {
      user_id: 'mock-user-1',
      username: 'SkillSeeker',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SkillSeeker',
      total_xp: 0,
      current_level: 1,
      created_at: new Date().toISOString(),
    };

    return { success: true, data: profile };
  },

  updateProfile: async (updates: Partial<ProfileData>): Promise<ApiResponse<ProfileData>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to update profile' };
    }

    // Validate username
    if (updates.username && updates.username.length < 1) {
      return {
        success: false,
        error: 'Validation failed',
        validation_errors: { username: 'Username is required' },
      };
    }

    // Update mock profile
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const current = stored ? JSON.parse(stored) : {};
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));

    return { success: true, data: updated };
  },
};

// Quest API
export const questApi = {
  getQuests: async (): Promise<ApiResponse<QuestData[]>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to fetch quests' };
    }

    const stored = localStorage.getItem(STORAGE_KEYS.QUESTS);
    const quests = stored ? JSON.parse(stored) : [];

    return { success: true, data: quests };
  },

  createQuest: async (questData: Omit<QuestData, 'quest_id' | 'created_at'>): Promise<ApiResponse<QuestData>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to create quest' };
    }

    // Validation
    if (!questData.title || questData.title.length < 1) {
      return {
        success: false,
        error: 'Validation failed',
        validation_errors: { title: 'Title is required' },
      };
    }

    if (questData.duration_min < 1) {
      return {
        success: false,
        error: 'Validation failed',
        validation_errors: { duration_min: 'Duration must be at least 1 minute' },
      };
    }

    const newQuest: QuestData = {
      quest_id: `quest_${Date.now()}`,
      created_at: new Date().toISOString(),
      ...questData,
    };

    // Store quest
    const stored = localStorage.getItem(STORAGE_KEYS.QUESTS);
    const quests = stored ? JSON.parse(stored) : [];
    quests.unshift(newQuest);
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));

    // Update profile XP
    const profileStored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (profileStored) {
      const profile = JSON.parse(profileStored);
      profile.total_xp += questData.duration_min;
      profile.current_level = Math.floor(Math.sqrt(profile.total_xp / 60));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }

    return { success: true, data: newQuest };
  },

  deleteQuest: async (questId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to delete quest' };
    }

    const stored = localStorage.getItem(STORAGE_KEYS.QUESTS);
    const quests: QuestData[] = stored ? JSON.parse(stored) : [];

    const questToDelete = quests.find(q => q.quest_id === questId);
    if (!questToDelete) {
      return { success: false, error: 'Quest not found' };
    }

    const filtered = quests.filter(q => q.quest_id !== questId);
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(filtered));

    // Update profile XP (subtract)
    const profileStored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (profileStored) {
      const profile = JSON.parse(profileStored);
      profile.total_xp = Math.max(0, profile.total_xp - questToDelete.duration_min);
      profile.current_level = Math.floor(Math.sqrt(profile.total_xp / 60));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }

    return { success: true, data: { deleted: true } };
  },
};

// Boss API
export const bossApi = {
  getBosses: async (): Promise<ApiResponse<BossData[]>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to fetch bosses' };
    }

    const stored = localStorage.getItem(STORAGE_KEYS.BOSSES);
    const bosses = stored ? JSON.parse(stored) : [];

    return { success: true, data: bosses };
  },

  createBoss: async (bossData: Omit<BossData, 'boss_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<BossData>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to create boss' };
    }

    // Validation
    if (!bossData.title || bossData.title.length < 1) {
      return {
        success: false,
        error: 'Validation failed',
        validation_errors: { title: 'Title is required' },
      };
    }

    const newBoss: BossData = {
      boss_id: `boss_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...bossData,
    };

    const stored = localStorage.getItem(STORAGE_KEYS.BOSSES);
    const bosses = stored ? JSON.parse(stored) : [];
    bosses.push(newBoss);
    localStorage.setItem(STORAGE_KEYS.BOSSES, JSON.stringify(bosses));

    return { success: true, data: newBoss };
  },

  updateBoss: async (bossId: string, updates: Partial<BossData>): Promise<ApiResponse<BossData>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to update boss' };
    }

    const stored = localStorage.getItem(STORAGE_KEYS.BOSSES);
    const bosses: BossData[] = stored ? JSON.parse(stored) : [];

    const index = bosses.findIndex(b => b.boss_id === bossId);
    if (index === -1) {
      return { success: false, error: 'Boss not found' };
    }

    bosses[index] = {
      ...bosses[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.BOSSES, JSON.stringify(bosses));

    return { success: true, data: bosses[index] };
  },

  deleteBoss: async (bossId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to delete boss' };
    }

    const stored = localStorage.getItem(STORAGE_KEYS.BOSSES);
    const bosses: BossData[] = stored ? JSON.parse(stored) : [];

    const filtered = bosses.filter(b => b.boss_id !== bossId);
    localStorage.setItem(STORAGE_KEYS.BOSSES, JSON.stringify(filtered));

    return { success: true, data: { deleted: true } };
  },
};
