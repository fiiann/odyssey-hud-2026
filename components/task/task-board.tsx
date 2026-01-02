'use client';

import { Task, TaskStatus } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useDroppable
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
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

  // Configure sensors for better drag vs click detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requires 8px movement to start drag, allowing clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

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

    if (over) {
      const activeTaskId = active.id as string;
      let newStatus: TaskStatus | null = null;

      // If dropped over a column (id is one of STATUS_ORDER)
      if (STATUS_ORDER.includes(over.id as TaskStatus)) {
        newStatus = over.id as TaskStatus;
      } else {
        // If dropped over another task, find which status it belongs to
        const overTask = tasks.find(t => t.taskId === over.id);
        if (overTask) {
          newStatus = overTask.status;
        }
      }

      if (newStatus && (activeTask?.status !== newStatus || activeTask?.taskId !== over.id)) {
        onTaskDrop(activeTaskId, newStatus);
      }
    }
  };

  const activeTask = activeId ? tasks.find(t => t.taskId === activeId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_ORDER.map((status) => {
          return (
            <KanbanColumn
              key={status}
              status={status}
              tasks={groupedTasks[status]}
              onTaskClick={onTaskClick}
              mode={mode}
            />
          );
        })}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask && (
          <TaskKanbanCard
            task={activeTask}
            onClick={() => { }}
            mode={mode}
            isOverlay
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumn({ status, tasks, onTaskClick, mode }: { status: TaskStatus; tasks: Task[]; onTaskClick: (task: Task) => void; mode: 'PROFESSIONAL' | 'ODYSSEY' }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  const t = useTerminology(mode);
  const statusStyle = TASK_STATUS[status];

  return (
    <div ref={setNodeRef} className="flex flex-col gap-3">
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
          {tasks.length}
        </Badge>
      </div>

      {/* Tasks in Column */}
      <SortableContext
        id={status}
        items={tasks.map(t => t.taskId)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="flex flex-col gap-2 min-h-[200px] p-2 rounded-xl border-2 border-dashed transition-colors"
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
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
}
