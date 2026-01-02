'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTerminology } from '@/lib/terminology';
import { TASK_CATEGORY } from '@/lib/constants';
import { Clock } from 'lucide-react';

const missionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  durationMin: z.number().min(1, 'Duration must be at least 1 minute'),
  category: z.string().optional(),
  taskId: z.string().optional(),
  projectId: z.string().optional(),
});

export type MissionFormValues = z.infer<typeof missionSchema>;

interface MissionModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: MissionFormValues) => Promise<void>;
  projectId?: string; // Pre-assigned project ID
  projectName?: string; // For display
  projects?: Array<{ projectId: string; title: string }>;
  tasks?: Array<{ taskId: string; title: string; status: string }>;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

export function MissionModal({
  open = false,
  onOpenChange,
  onSubmit,
  projectId,
  projectName,
  projects = [],
  tasks = [],
  mode = 'PROFESSIONAL',
}: MissionModalProps) {
  const t = useTerminology(mode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<MissionFormValues>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: '',
      description: '',
      durationMin: 30,
      category: '',
      taskId: '',
      projectId: '',
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const handleFormSubmit = async (data: MissionFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onOpenChange?.(false);
    } catch (error) {
      console.error('Failed to submit mission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#121214] border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {t.logTime}
            {projectName && (
              <span className="text-sm font-normal text-muted-foreground">
                (auto-assigned to: {projectName})
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === 'ODYSSEY'
              ? 'Record your battle execution. Link to a quest to update time tracking.'
              : 'Log your work session. Link to a task to update time tracking.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              {mode === 'ODYSSEY' ? 'Battle Title' : 'What did you work on?'} *
            </Label>
            <Input
              id="title"
              placeholder={mode === 'ODYSSEY'
                ? 'e.g., Implemented authentication system'
                : 'e.g., Fixed bug in login flow'}
              className="bg-white/5 border-white/10"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Description (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {t.forms.description} ({mode === 'ODYSSEY' ? 'Optional' : 'optional'})
            </Label>
            <Textarea
              id="description"
              placeholder={mode === 'ODYSSEY'
                ? 'Battle details, strategies used...'
                : 'Notes about what you accomplished...'}
              className="bg-white/5 border-white/10 min-h-[80px]"
              {...register('description')}
            />
          </div>

          {/* Project Selection (Visible only if no projectId prop is provided) */}
          {!projectId && projects.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="projectId">
                {mode === 'ODYSSEY' ? 'Target Sector' : 'Project'} *
              </Label>
              <Select
                onValueChange={(value) => setValue('projectId', value)}
                value={watch('projectId')}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder={mode === 'ODYSSEY' ? 'Select a sector...' : 'Select a project...'} />
                </SelectTrigger>
                <SelectContent className="bg-[#121214] border-white/10">
                  {projects.map((p) => (
                    <SelectItem key={p.projectId} value={p.projectId}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectId && (
                <p className="text-sm text-destructive">{errors.projectId.message}</p>
              )}
            </div>
          )}

          {/* Link to Task (Optional) */}
          {tasks.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="taskId">
                {mode === 'ODYSSEY' ? 'Link to Quest (optional)' : 'Link to Task (optional)'}
              </Label>
              <Select
                onValueChange={(value) => setValue('taskId', value)}
                value={watch('taskId')}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder={mode === 'ODYSSEY' ? 'Select a quest...' : 'Select a task...'} />
                </SelectTrigger>
                <SelectContent className="bg-[#121214] border-white/10">
                  {tasks.map((task) => (
                    <SelectItem key={task.taskId} value={task.taskId}>
                      {task.title} ({task.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">
                💡 {mode === 'ODYSSEY'
                  ? 'Linking to quest updates time tracking'
                  : 'Linking to task updates time tracking'}
              </p>
            </div>
          )}

          {/* Duration and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durationMin">
                {mode === 'ODYSSEY' ? 'Duration (minutes)' : 'Duration (minutes)'} *
              </Label>
              <Input
                id="durationMin"
                type="number"
                min="1"
                className="bg-white/5 border-white/10"
                {...register('durationMin', { valueAsNumber: true })}
              />
              {errors.durationMin && (
                <p className="text-sm text-destructive">{errors.durationMin.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t.forms.category}</Label>
              <Select
                onValueChange={(value) => setValue('category', value)}
                value={watch('category')}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-[#121214] border-white/10">
                  {TASK_CATEGORY.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {t.category[cat as keyof typeof t.category] || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              className="border-white/10"
            >
              {t.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : t.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
