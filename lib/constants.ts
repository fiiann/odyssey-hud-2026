export const PROJECT_STATUS = {
  ACTIVE: { label: 'Active', color: 'blue', icon: 'Flame' },
  COMPLETED: { label: 'Completed', color: 'green', icon: 'Check' },
  ON_HOLD: { label: 'On Hold', color: 'amber', icon: 'Pause' },
  ARCHIVED: { label: 'Archived', color: 'gray', icon: 'Archive' },
} as const;

// NEW: Task Status Constants
export const TASK_STATUS = {
  TODO: { label: 'To Do', color: 'gray', icon: 'Circle' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue', icon: 'Clock' },
  COMPLETED: { label: 'Completed', color: 'green', icon: 'CheckCircle' },
  CANCELLED: { label: 'Cancelled', color: 'red', icon: 'XCircle' },
} as const;

// NEW: Task Priority Constants
export const TASK_PRIORITY = {
  LOW: { label: 'Low', color: 'gray', value: 1 },
  MEDIUM: { label: 'Medium', color: 'yellow', value: 2 },
  HIGH: { label: 'High', color: 'orange', value: 3 },
  URGENT: { label: 'Critical', color: 'red', value: 4 },
} as const;

// NEW: Task Category Constants
export const TASK_CATEGORY = [
  'Backend',
  'Frontend',
  'Mobile',
  'DevOps',
  'Design',
  'Testing',
  'Documentation',
  'Other',
] as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'odyssey_auth_token',
  PROFILE: 'odyssey_profile_data',
  MISSIONS: 'odyssey_missions_data',
  PROJECTS: 'odyssey_projects_data',
  TASKS: 'odyssey_tasks_data', // NEW
} as const;

export const MOCK_CREDENTIALS = {
  EMAIL: 'superadmin@gmail.com',
  PASSWORD: '123456',
} as const;
