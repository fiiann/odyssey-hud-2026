'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollText, Plus, History, X } from 'lucide-react';
import { Mission, Project } from '@/lib/types';
import { getRelativeTime } from '@/lib/calculations';

interface MissionsListProps {
  missions: Mission[];
  projects: Project[];
  isLoading: boolean;
  terminologyMode: 'PROFESSIONAL' | 'ODYSSEY';
  onDeleteMission: (id: string) => void;
  onLogMission: () => void;
}

export function MissionsList({
  missions,
  projects,
  isLoading,
  terminologyMode,
  onDeleteMission,
  onLogMission,
}: MissionsListProps) {
  return (
    <div className="space-y-6 text-foreground">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">
            {terminologyMode === 'ODYSSEY' ? 'Battle Archives' : 'Mission History'}
          </h2>
        </div>
        <Button
          size="sm"
          onClick={onLogMission}
          className="rounded-full px-4 h-8 bg-primary hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
        >
          <Plus className="w-3 h-3 mr-2" />
          {terminologyMode === 'ODYSSEY' ? 'Record Battle' : 'Log Time'}
        </Button>
      </div>

      <Card className="border-white/5 bg-[#121214]/50 backdrop-blur-sm min-h-[400px]">
        <CardContent className="pt-6 px-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-white/5" />
              ))}
            </div>
          ) : missions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <ScrollText className="w-12 h-12 mb-4" />
              <p className="text-sm font-medium">No missions logged yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {missions.slice(0, 15).map((mission) => {
                const project = projects.find(p => p.projectId === mission.projectId);
                return (
                  <div
                    key={mission.missionId}
                    className="group relative flex flex-col gap-1 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all animate-in fade-in zoom-in-95 duration-300"
                  >
                    <button
                      onClick={() => onDeleteMission(mission.missionId)}
                      className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive/10 text-destructive border border-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-destructive hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm tracking-tight truncate">{mission.title}</h4>
                      <span className="text-[10px] font-mono text-primary font-bold">{mission.durationMin}M</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                      <span className="truncate max-w-[120px] text-blue-400">{project?.title || 'Unknown Project'}</span>
                      <span>{getRelativeTime(mission.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
