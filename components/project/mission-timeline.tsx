'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollText, Link2 } from 'lucide-react';
import { Mission, Task } from '@/lib/types';
import { getRelativeTime } from '@/lib/calculations';
import { TASK_STATUS } from '@/lib/constants';
import { useTerminology } from '@/lib/terminology';

interface MissionTimelineProps {
  missions: Mission[];
  onDeleteMission: (missionId: string) => void;
  tasks?: Task[]; // NEW: Pass tasks for linking
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

interface MissionCardProps {
  mission: Mission;
  onDeleteMission: (missionId: string) => void;
  linkedTask?: Task; // NEW: Show linked task
}

const MissionCard = memo(({ mission, onDeleteMission, linkedTask }: MissionCardProps) => {
  const timeOfDay = new Date(mission.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="group relative flex gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
      {/* Timeline dot */}
      <div className="absolute left-[7px] top-6 h-3 w-3 rounded-full bg-primary border-2 border-[#09090b] z-10" />

      {/* Mission Card */}
      <div className="flex-1 ml-6 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
        <button
          onClick={() => onDeleteMission(mission.missionId)}
          className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive/10 text-destructive border border-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-destructive hover:text-white"
        >
          ×
        </button>
        <div className="space-y-2">
          <h4 className="font-bold text-sm tracking-tight pr-6">{mission.title}</h4>

          {/* NEW: Linked Task Badge */}
          {linkedTask && (
            <div className="flex items-center gap-2">
              <Link2 className="h-3 w-3 text-primary" />
              <Badge variant="outline" className="text-[9px] font-bold border-primary/20 bg-primary/10 text-primary">
                {linkedTask.title}
              </Badge>
              <Badge variant="outline" className="text-[9px] font-bold border-white/10">
                {linkedTask.status}
              </Badge>
            </div>
          )}

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            <Badge variant="secondary" className="h-5 px-2 text-[9px] font-bold">
              {mission.durationMin}M
            </Badge>
            <span>{timeOfDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

MissionCard.displayName = 'MissionCard';

export function MissionTimeline({ missions, onDeleteMission, tasks = [], mode = 'PROFESSIONAL' }: MissionTimelineProps) {
  const t = useTerminology(mode);
  // Group missions by date
  const groupedMissions = missions.reduce((acc, mission) => {
    const date = new Date(mission.createdAt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(mission);
    return acc;
  }, {} as Record<string, Mission[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedMissions).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (missions.length === 0) {
    return (
      <Card className="border-dashed border-white/10 bg-transparent py-12">
        <CardContent className="flex flex-col items-center text-center">
          <ScrollText className="w-12 h-12 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground font-medium">No missions logged for this sector yet</p>
          <p className="text-sm text-muted-foreground/60 max-w-xs">Start executing to see your mission timeline here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date} className="relative">
          {/* Date Badge */}
          <div className="sticky top-0 z-20 mb-4">
            <Badge variant="outline" className="bg-[#09090b] border-white/10 text-xs font-bold uppercase tracking-wider">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </Badge>
          </div>

          {/* Timeline Line */}
          <div className="absolute left-1 top-8 bottom-0 w-0.5 bg-white/10" />

          {/* Missions for this date */}
          <div className="space-y-4 relative">
            {groupedMissions[date]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((mission) => {
                // NEW: Find linked task
                const linkedTask = mission.taskId ? tasks.find(t => t.taskId === mission.taskId) : undefined;
                return (
                  <MissionCard
                    key={mission.missionId}
                    mission={mission}
                    onDeleteMission={onDeleteMission}
                    linkedTask={linkedTask}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
