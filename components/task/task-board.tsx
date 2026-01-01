'use client';

import { Task, TaskStatus } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskKanbanCard } from './task-kanban-card';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TASK_STATUS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDrop: (taskId: string, newStatus: TaskStatus) => void;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

const STATUS_ORDER: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export function TaskBoard({ tasks, onTaskClick, onTaskDrop, mode = 'PROFESSIONAL' }: TaskBoardProps) {
  const t = useTerminology(mode);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Group tasks by status
  const groupedTasks = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as TaskStatus;
      onTaskDrop(taskId, newStatus);
    }
  };

  const activeTask = activeId ? tasks.find(t => t.taskId === activeId) : null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_ORDER.map((status) => {
          const statusTasks = groupedTasks[status];
          const statusStyle = TASK_STATUS[status];

          return (
            <div key={status} className="flex flex-col gap-3">
              {/* Column Header */}
              <div className={cn(
                "flex items-center justify-between p-3 rounded-xl border-2 transition-all",
                "bg-[#121214] border-white/5"
              )}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    statusStyle.color === 'gray' && "bg-gray-500",
                    statusStyle.color === 'blue' && "bg-blue-500",
                    statusStyle.color === 'green' && "bg-green-500",
                    statusStyle.color === 'red' && "bg-red-500"
                  )} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    {t.status[status]}
                  </h3>
                </div>
                <Badge variant="outline" className="text-[10px] font-black border-white/10 bg-white/5">
                  {statusTasks.length}
                </Badge>
              </div>

              {/* Tasks in Column */}
              <SortableContext
                id={status}
                items={statusTasks.map(t => t.taskId)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  id={status}
                  className="flex flex-col gap-2 min-h-[200px] p-2 rounded-xl border-2 border-dashed transition-colors"
                >
                  {statusTasks.length > 0 ? (
                    statusTasks.map((task) => (
                      <TaskKanbanCard
                        key={task.taskId}
                        task={task}
                        onClick={() => onTaskClick(task)}
                        mode={mode}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-20 text-xs text-muted-foreground opacity-50">
                      No {t.status[status].toLowerCase()} {t.task}s
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask && (
          <TaskKanbanCard
            task={activeTask}
            onClick={() => {}}
            mode={mode}
            isDragging
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
