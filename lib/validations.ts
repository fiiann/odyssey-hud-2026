import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50),
  avatar_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const questSchema = z.object({
  title: z.string().min(1, 'Task description is required').max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  duration_min: z.number().min(1, 'Must be at least 1 minute').max(1440, 'Cannot exceed 24 hours'),
  category: z.enum(['BACKEND', 'FRONTEND', 'MOBILE', 'DEVOPS']),
});

export type QuestFormValues = z.infer<typeof questSchema>;

export const bossSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  quarter: z.number().min(1).max(4),
  progress: z.number().min(0).max(100),
  status: z.enum(['LOCKED', 'ACTIVE', 'COMPLETED', 'FAILED']),
  repo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  deploy_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type BossFormValues = z.infer<typeof bossSchema>;
