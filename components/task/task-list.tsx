'use client';

import { Task, TaskStatus } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { TaskCard } from './task-card';
import { TASK_STATUS as STATUS_CONSTANTS } from '@/lib/constants';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

const STATUS_ORDER: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export function TaskList({ tasks, onTaskClick, mode = 'PROFESSIONAL' }: TaskListProps) {
  const t = useTerminology(mode);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Group tasks by status
  const groupedTasks = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const toggleSection = (status: TaskStatus) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return newSet;
    });
  };

  const getEmptyStateForStatus = (status: TaskStatus) => {
    const statusConst = STATUS_CONSTANTS[status];
    switch (status) {
      case 'TODO':
        return mode === 'ODYSSEY'
          ? 'No pending missions, Architect'
          : t.emptyStates.noTasks;
      case 'IN_PROGRESS':
        return mode === 'ODYSSEY'
          ? 'No active missions'
          : 'No tasks in progress';
      case 'COMPLETED':
        return mode === 'ODYSSEY'
          ? 'No accomplished missions'
          : 'No completed tasks';
      case 'CANCELLED':
        return 'No cancelled tasks';
      default:
        return t.emptyStates.noTasks;
    }
  };

  return (
    <div className="space-y-6">
      {STATUS_ORDER.map((status) => {
        const statusTasks = groupedTasks[status];
        const isCollapsed = collapsedSections.has(status);
        const statusConst = STATUS_CONSTANTS[status];
        const hasTasks = statusTasks.length > 0;

        return (
          <div key={status} className="space-y-3">
            {/* Section Header */}
            <div
              className={cn(
                "flex items-center justify-between cursor-pointer group select-none",
                !hasTasks && "opacity-50"
              )}
              onClick={() => toggleSection(status)}
            >
              <div className="flex items-center gap-2">
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  {t.status[status]}
                  <span className="text-muted-foreground">
                    ({statusTasks.length})
                  </span>
                </h3>
              </div>
            </div>

            {/* Tasks */}
            {!isCollapsed && (
              <div className="space-y-2">
                {hasTasks ? (
                  statusTasks.map((task) => (
                    <TaskCard
                      key={task.taskId}
                      task={task}
                      onClick={() => onTaskClick?.(task)}
                      mode={mode}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 px-4 border border-dashed border-white/10 rounded-lg bg-[#0a0a0c]">
                    <p className="text-sm text-muted-foreground">
                      {getEmptyStateForStatus(status)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* All Tasks Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-16 px-4 border border-dashed border-white/10 rounded-lg bg-[#0a0a0c]">
          <p className="text-lg font-bold mb-2">
            {mode === 'ODYSSEY' ? 'No missions found' : 'No tasks found'}
          </p>
          <p className="text-sm text-muted-foreground">
            {mode === 'ODYSSEY'
              ? 'Create your first mission to get started, Architect'
              : 'Create your first task to get started'}
          </p>
        </div>
      )}
    </div>
  );
}
