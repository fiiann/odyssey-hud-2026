'use client';

import { Task } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { TASK_STATUS, TASK_PRIORITY } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskKanbanCardProps {
  task: Task;
  onClick?: () => void;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
  isDragging?: boolean;
}

export function TaskKanbanCard({ task, onClick, mode = 'PROFESSIONAL', isDragging = false }: TaskKanbanCardProps) {
  const t = useTerminology(mode);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusStyle = TASK_STATUS[task.status];
  const priorityStyle = TASK_PRIORITY[task.priority];

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
    if (diffDays < -1) return `${Math.abs(diffDays)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        onClick={onClick}
        className={cn(
          "border-white/5 bg-[#121214] hover:bg-[#18181b] hover:border-primary/30 transition-all cursor-pointer select-none",
          "p-3 space-y-2",
          task.status === 'COMPLETED' && "opacity-60",
          isDragging && "opacity-50 rotate-2 scale-105 shadow-2xl"
        )}
        {...attributes}
        {...listeners}
      >
        {/* Header: Priority + Status */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Priority Badge */}
          <Badge
            variant="outline"
            className={cn(
              "text-[9px] font-black uppercase tracking-wider border-0 px-1.5 py-0",
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
            <Badge variant="outline" className="text-[9px] border-white/10 text-muted-foreground px-1.5 py-0">
              {task.category}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-bold text-xs leading-tight line-clamp-2",
          task.status === 'COMPLETED' && "line-through text-muted-foreground"
        )}>
          {task.title}
        </h3>

        {/* Footer: Time + Due Date */}
        <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1.5 border-t border-white/5">
          {/* Time Tracking */}
          {hasTimeTracking && (
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              <span>
                {formatMinutes(task.actualMin!)}
                {task.estimatedMin && ` / ${formatMinutes(task.estimatedMin)}`}
              </span>
              {variance !== null && (
                <span
                  className={cn(
                    "ml-0.5",
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
              <Calendar className="h-2.5 w-2.5" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Tags (if exist) */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {task.tags.slice(0, 2).map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[8px] border-white/10 px-1 py-0"
              >
                #{tag}
              </Badge>
            ))}
            {task.tags.length > 2 && (
              <span className="text-[8px] text-muted-foreground">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
