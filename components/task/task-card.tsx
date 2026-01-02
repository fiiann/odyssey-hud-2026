'use client';

import { Task, TaskStatus, TaskPriority } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { TASK_STATUS, TASK_PRIORITY } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

export function TaskCard({ task, onClick, mode = 'PROFESSIONAL' }: TaskCardProps) {
  const t = useTerminology(mode);
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick(task);
    } else {
      router.push(`/projects/${task.projectId}/tasks/${task.taskId}`);
    }
  };

  // Get status styling
  const getStatusStyle = (status: TaskStatus) => {
    const style = TASK_STATUS[status];
    return {
      label: t.status[status],
      color: style.color,
      bgColor: `bg-${style.color}/20`,
    };
  };

  // Get priority styling
  const getPriorityStyle = (priority: TaskPriority) => {
    const style = TASK_PRIORITY[priority];
    return {
      label: t.priority[priority],
      color: style.color,
      value: style.value,
    };
  };

  const statusStyle = getStatusStyle(task.status);
  const priorityStyle = getPriorityStyle(task.priority);

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
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  return (
    <Card
      onClick={handleCardClick}
      className={cn(
        "border-white/5 bg-[#121214] hover:bg-[#18181b] hover:border-primary/30 transition-all cursor-pointer group",
        task.status === 'COMPLETED' && 'opacity-60'
      )}
    >
      <div className="p-4 space-y-3">
        {/* Header: Priority + Status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
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
              {priorityStyle.label}
            </Badge>

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
              {statusStyle.label}
            </Badge>

            {/* Category Badge */}
            {task.category && (
              <Badge
                variant="outline"
                className="text-[10px] font-medium border-white/10 text-muted-foreground"
              >
                {task.category}
              </Badge>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-bold text-sm leading-tight group-hover:text-primary transition-colors",
          task.status === 'COMPLETED' && "line-through text-muted-foreground"
        )}>
          {task.title}
        </h3>

        {/* Description (if exists) */}
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer: Time + Due Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-white/5">
          {/* Time Tracking */}
          {hasTimeTracking && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                {formatMinutes(task.actualMin!)}
                {task.estimatedMin && ` / ${formatMinutes(task.estimatedMin)}`}
              </span>
              {variance !== null && (
                <span
                  className={cn(
                    "ml-1",
                    Math.abs(variance) <= 20 ? "text-green-500" :
                      Math.abs(variance) <= 50 ? "text-yellow-500" :
                        "text-red-500"
                  )}
                >
                  ({variance > 0 ? '+' : ''}{variance.toFixed(0)}%)
                </span>
              )}
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1",
              isOverdue && "text-red-500 font-medium"
            )}>
              <Calendar className="h-3 w-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}

          {/* Tags (if exist) */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1">
              {task.tags.slice(0, 2).map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] border-white/10 px-1.5 py-0"
                >
                  #{tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <span className="text-[10px] text-muted-foreground">
                  +{task.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
