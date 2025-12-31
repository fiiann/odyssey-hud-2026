export const CATEGORIES = {
  BACKEND: {
    label: 'Backend',
    icon: 'Shield',
    color: 'blue',
    description: 'APIs, Services, Databases'
  },
  FRONTEND: {
    label: 'Frontend',
    icon: 'Layout',
    color: 'purple',
    description: 'UI Components, Logic, CSS'
  },
  MOBILE: {
    label: 'Mobile',
    icon: 'Smartphone',
    color: 'pink',
    description: 'Apps, Native Code, Mobile UI'
  },
  DEVOPS: {
    label: 'DevOps',
    icon: 'Server',
    color: 'amber',
    description: 'CI/CD, Infrastructure, Cloud'
  },
} as const;

export const QUARTERS = [
  { value: 1, label: 'Q1', months: 'Jan - Mar' },
  { value: 2, label: 'Q2', months: 'Apr - Jun' },
  { value: 3, label: 'Q3', months: 'Jul - Sep' },
  { value: 4, label: 'Q4', months: 'Oct - Dec' },
] as const;

export const STATUS_CONFIG = {
  LOCKED: { label: 'Locked', color: 'gray', icon: 'Lock' },
  ACTIVE: { label: 'Active', color: 'blue', icon: 'Flame' },
  COMPLETED: { label: 'Completed', color: 'green', icon: 'Check' },
  FAILED: { label: 'Failed', color: 'red', icon: 'X' },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'odyssey_auth_token',
  PROFILE: 'odyssey_profile_data',
  QUESTS: 'odyssey_quests_data',
  BOSSES: 'odyssey_bosses_data',
} as const;

export const MOCK_CREDENTIALS = {
  EMAIL: 'superadmin@gmail.com',
  PASSWORD: '123456',
} as const;

export const CATEGORY_COLORS = {
  BACKEND: 'text-blue-500',
  FRONTEND: 'text-purple-500',
  MOBILE: 'text-pink-500',
  DEVOPS: 'text-amber-500',
} as const;

export const CATEGORY_BG_COLORS = {
  BACKEND: 'bg-blue-500/10',
  FRONTEND: 'bg-purple-500/10',
  MOBILE: 'bg-pink-500/10',
  DEVOPS: 'bg-amber-500/10',
} as const;

export const CATEGORY_BORDER_COLORS = {
  BACKEND: 'border-blue-500/20',
  FRONTEND: 'border-purple-500/20',
  MOBILE: 'border-pink-500/20',
  DEVOPS: 'border-amber-500/20',
} as const;
