import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const missionSchema = z.object({
  title: z.string().min(1, 'Task description is required').max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  duration_min: z.number().min(1, 'Must be at least 1 minute').max(1440, 'Cannot exceed 24 hours'),
  project_id: z.string().min(1, 'Project is required'),
  task_id: z.string().optional(), // NEW: Optional link to task
  category: z.string().optional(), // NEW: Mission category
});

export type MissionFormValues = z.infer<typeof missionSchema>;

// NEW: Task validation schema
export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional().or(z.literal('')),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  category: z.enum(['Backend', 'Frontend', 'Mobile', 'DevOps', 'Design', 'Testing', 'Documentation', 'Other']).optional(),
  estimated_min: z.number().min(1, 'Estimate must be at least 1 minute').max(10080, 'Cannot exceed 7 days').optional(),
  due_date: z.string().optional(), // ISO date string
  tags: z.array(z.string()).optional(), // Array of tag strings
  project_id: z.string().min(1, 'Project is required'),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export const projectSchema = z.object({
  title: z.string().min(1, 'Project title is required').max(100),
  description: z.string().max(1000).optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ON_HOLD', 'ARCHIVED']),
  repo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  deploy_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
