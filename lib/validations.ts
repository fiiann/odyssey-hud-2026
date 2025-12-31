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
});

export type MissionFormValues = z.infer<typeof missionSchema>;

export const projectSchema = z.object({
  title: z.string().min(1, 'Project title is required').max(100),
  description: z.string().max(1000).optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ON_HOLD', 'ARCHIVED']),
  progress: z.number().min(0).max(100),
  repo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  deploy_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
