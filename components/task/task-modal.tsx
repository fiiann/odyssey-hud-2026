'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Task, TaskStatus, TaskPriority, TaskCategory, Project } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { taskSchema, type TaskFormValues } from '@/lib/validations';
import { TASK_CATEGORY } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormValues) => Promise<void>;
  task?: Task;
  projects: Project[];
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
  defaultProjectId?: string;
}

export function TaskModal({
  open,
  onOpenChange,
  onSubmit,
  task,
  projects,
  mode = 'PROFESSIONAL',
  defaultProjectId,
}: TaskModalProps) {
  const t = useTerminology(mode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(task?.tags || []);

  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'TODO',
      priority: task?.priority || 'MEDIUM',
      category: task?.category,
      estimated_min: task?.estimatedMin,
      due_date: task?.dueDate || '',
      project_id: task?.projectId || defaultProjectId || '',
      tags: task?.tags || [],
    },
  });

  // Update tags when task changes
  useEffect(() => {
    if (task?.tags) {
      setTags(task.tags);
    }
  }, [task]);

  const handleFormSubmit = async (data: TaskFormValues) => {
    setIsSubmitting(true);
    try {
      // Include tags in the submission
      const dataWithTags = { ...data, tags };
      await onSubmit(dataWithTags);
      reset();
      setTags([]);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setValue('tags', newTags);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
            {isEditing ? t.editTask : t.createTask}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEditing
              ? mode === 'ODYSSEY'
                ? 'Modify mission parameters'
                : 'Update task details'
              : mode === 'ODYSSEY'
                ? 'Accept new mission, Architect'
                : 'Create a new task'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 pt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              {t.forms.taskTitle} *
            </Label>
            <Input
              {...register('title')}
              placeholder={mode === 'ODYSSEY' ? 'Mission objective...' : 'Task title...'}
              className="bg-white/5 border-white/10 font-bold"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              {t.forms.description}
            </Label>
            <Textarea
              {...register('description')}
              placeholder={mode === 'ODYSSEY' ? 'Mission brief...' : 'Description...'}
              className="bg-white/5 border-white/10 min-h-[80px]"
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.status}
              </Label>
              <select
                {...register('status')}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="TODO">{t.status.TODO}</option>
                <option value="IN_PROGRESS">{t.status.IN_PROGRESS}</option>
                <option value="COMPLETED">{t.status.COMPLETED}</option>
                <option value="CANCELLED">{t.status.CANCELLED}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.priority}
              </Label>
              <select
                {...register('priority')}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="LOW">{t.priority.LOW}</option>
                <option value="MEDIUM">{t.priority.MEDIUM}</option>
                <option value="HIGH">{t.priority.HIGH}</option>
                <option value="URGENT">{t.priority.URGENT}</option>
              </select>
            </div>
          </div>

          {/* Category & Project */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.category}
              </Label>
              <select
                {...register('category')}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">None</option>
                {TASK_CATEGORY.map((cat) => (
                  <option key={cat} value={cat}>
                    {t.category[cat as keyof typeof t.category]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.project}
              </Label>
              <select
                {...register('project_id')}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!!task}
              >
                {projects.map((project) => (
                  <option key={project.projectId} value={project.projectId}>
                    {project.title}
                  </option>
                ))}
              </select>
              {errors.project_id && (
                <p className="text-xs text-red-500">{errors.project_id.message}</p>
              )}
            </div>
          </div>

          {/* Estimated Time & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.estimatedTime}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  {...register('estimated_min', { valueAsNumber: true })}
                  placeholder="60"
                  className="bg-white/5 border-white/10 font-mono"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
              {errors.estimated_min && (
                <p className="text-xs text-red-500">{errors.estimated_min.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.dueDate}
              </Label>
              <Input
                type="date"
                {...register('due_date')}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              {t.forms.tags}
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2 py-1 text-xs"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag and press Enter"
                className="bg-white/5 border-white/10 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    handleAddTag(target.value);
                    target.value = '';
                  }
                }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground">
              Press Enter to add tags
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary font-black uppercase italic tracking-tighter"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                isEditing ? t.save : t.createTask
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
