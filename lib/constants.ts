export const PROJECT_STATUS = {
  ACTIVE: { label: 'Active', color: 'blue', icon: 'Flame' },
  COMPLETED: { label: 'Completed', color: 'green', icon: 'Check' },
  ON_HOLD: { label: 'On Hold', color: 'amber', icon: 'Pause' },
  ARCHIVED: { label: 'Archived', color: 'gray', icon: 'Archive' },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'odyssey_auth_token',
  PROFILE: 'odyssey_profile_data',
  MISSIONS: 'odyssey_missions_data',
  PROJECTS: 'odyssey_projects_data',
} as const;

export const MOCK_CREDENTIALS = {
  EMAIL: 'superadmin@gmail.com',
  PASSWORD: '123456',
} as const;
