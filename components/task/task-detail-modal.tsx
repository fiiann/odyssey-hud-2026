'use client';

import { useId } from 'react';
import { Task, Mission } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { TASK_STATUS, TASK_PRIORITY } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock, Calendar, TrendingUp, Trash2, Edit, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface TaskDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | undefined;
  missions?: Mission[];
  onEdit?: () => void;
  onDelete?: () => void;
  onDeleteMission?: (missionId: string) => void;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

export function TaskDetailModal({
  open,
  onOpenChange,
  task,
  missions = [],
  onEdit,
  onDelete,
  onDeleteMission,
  mode = 'PROFESSIONAL',
}: TaskDetailModalProps) {
  const t = useTerminology(mode);
  const titleId = useId();

  if (!task) return null;

  const statusStyle = TASK_STATUS[task.status];
  const priorityStyle = TASK_PRIORITY[task.priority];

  // Filter missions linked to this task
  const linkedMissions = missions.filter(m => m.taskId === task.taskId);

  // Calculate variance
  const hasTimeTracking = task.estimatedMin && task.actualMin !== undefined;
  const variance = hasTimeTracking
    ? ((task.actualMin! - task.estimatedMin!) / task.estimatedMin!) * 100
    : null;

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy • h:mm a');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} ariaLabelledby={titleId}>
      <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle id={titleId} className="text-2xl font-bold pr-8">
                {task.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-2">
                {/* Status Badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-black uppercase tracking-wider border-0",
                    statusStyle.color === 'gray' && "bg-gray-500/20 text-gray-500",
                    statusStyle.color === 'blue' && "bg-blue-500/20 text-blue-500",
                    statusStyle.color === 'green' && "bg-green-500/20 text-green-500",
                    statusStyle.color === 'red' && "bg-red-500/20 text-red-500"
                  )}
                >
                  {t.status[task.status]}
                </Badge>

                {/* Priority Badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-black uppercase tracking-wider border-0",
                    priorityStyle.color === 'red' && "bg-red-500/20 text-red-500",
                    priorityStyle.color === 'orange' && "bg-orange-500/20 text-orange-500",
                    priorityStyle.color === 'yellow' && "bg-yellow-500/20 text-yellow-500",
                    priorityStyle.color === 'gray' && "bg-gray-500/20 text-gray-500"
                  )}
                >
                  {t.priority[task.priority]}
                </Badge>

                {/* Category Badge */}
                {task.category && (
                  <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                    {task.category}
                  </Badge>
                )}
              </DialogDescription>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onEdit}
                  className="border-white/10"
                  aria-label={`Edit task: ${task.title}`}
                >
                  <Edit className="h-4 w-4 mr-1" aria-hidden="true" />
                  Edit
                </Button>
              )}
              {task.status !== 'COMPLETED' && onDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onDelete}
                  className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                  aria-label={`Delete task: ${task.title}`}
                >
                  <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Description */}
          {task.description && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.forms.description}
              </h4>
              <p className="text-sm leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                {task.description}
              </p>
            </div>
          )}

          {/* Time Tracking */}
          <div className="grid grid-cols-3 gap-4">
            {/* Estimated */}
            <Card className="border-white/5 bg-[#121214]">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    {t.forms.estimatedTime}
                  </p>
                </div>
                <p className="text-xl font-bold" aria-label={`Estimated time: ${task.estimatedMin ? formatMinutes(task.estimatedMin) : 'Not set'}`}>
                  {task.estimatedMin ? formatMinutes(task.estimatedMin) : '—'}
                </p>
              </div>
            </Card>

            {/* Actual */}
            <Card className="border-white/5 bg-[#121214]">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-500" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    {t.forms.actualTime}
                  </p>
                </div>
                <p className="text-xl font-bold" aria-label={`Actual time spent: ${task.actualMin !== undefined ? formatMinutes(task.actualMin) : '0 minutes'}`}>
                  {task.actualMin !== undefined ? formatMinutes(task.actualMin) : '0m'}
                </p>
              </div>
            </Card>

            {/* Variance */}
            {hasTimeTracking && (
              <Card className="border-white/5 bg-[#121214]">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className={cn(
                      "h-4 w-4",
                      Math.abs(variance!) <= 20 ? "text-green-500" :
                      Math.abs(variance!) <= 50 ? "text-yellow-500" :
                      "text-red-500"
                    )} aria-hidden="true" />
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      {t.stats.variance}
                    </p>
                  </div>
                  <p className={cn(
                    "text-xl font-bold",
                    Math.abs(variance!) <= 20 ? "text-green-500" :
                    Math.abs(variance!) <= 50 ? "text-yellow-500" :
                    "text-red-500"
                  )} aria-label={`Time variance: ${variance! > 0 ? '+' : ''}${variance!.toFixed(1)}%`}>
                    {variance! > 0 ? '+' : ''}{variance!.toFixed(1)}%
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Due Date & Tags */}
          <div className="grid grid-cols-2 gap-4">
            {/* Due Date */}
            {task.dueDate && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {t.forms.dueDate}
                </h4>
                <p className="text-sm">
                  {formatDate(task.dueDate)}
                </p>
              </div>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  {t.forms.tags}
                </h4>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Task tags">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs" role="listitem">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Linked Missions */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {t.missions} ({linkedMissions.length})
            </h4>

            {linkedMissions.length > 0 ? (
              <div className="space-y-2" role="list" aria-label="Linked missions">
                {linkedMissions.map((mission) => (
                  <Card
                    key={mission.missionId}
                    className="border-white/5 bg-[#121214] hover:bg-[#18181b] transition-colors"
                    role="listitem"
                  >
                    <div className="p-3 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {mission.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{formatMinutes(mission.durationMin)}</span>
                          <span>•</span>
                          <span>{formatDate(mission.createdAt)}</span>
                        </div>
                      </div>
                      {onDeleteMission && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteMission(mission.missionId)}
                          className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-500"
                          aria-label={`Delete mission: ${mission.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4 border border-dashed border-white/10 rounded-lg bg-[#0a0a0c]" role="status" aria-live="polite">
                <p className="text-sm text-muted-foreground">
                  {mode === 'ODYSSEY'
                    ? 'No executions recorded for this mission'
                    : 'No time logged for this task'}
                </p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-white/5">
            <p>
              {t.forms.project} ID: <span className="font-mono">{task.projectId}</span>
            </p>
            <p>
              Created: <span className="font-mono">{formatDate(task.createdAt)}</span>
            </p>
            {task.updatedAt !== task.createdAt && (
              <p>
                Updated: <span className="font-mono">{formatDate(task.updatedAt)}</span>
              </p>
            )}
            {task.completedAt && (
              <p>
                Completed: <span className="font-mono">{formatDate(task.completedAt)}</span>
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            aria-label={t.close}
          >
            {t.close}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
