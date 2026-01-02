'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutGrid, Check, History } from 'lucide-react';
import { Project } from '@/lib/types';

interface QuickStatsCardProps {
  projects: Project[];
  missionsCount: number;
}

export const QuickStatsCard = memo(function QuickStatsCard({ projects, missionsCount }: QuickStatsCardProps) {
  return (
    <Card className="border-white/5 bg-card/30 backdrop-blur-sm flex flex-col justify-center" aria-label="Quick statistics">
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Projects</p>
            <p className="text-3xl font-black font-mono" aria-label={`Total projects: ${projects.length}`}>{projects.length}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20" aria-hidden="true">
            <LayoutGrid className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Completed</p>
            <p className="text-3xl font-black font-mono" aria-label={`Completed projects: ${projects.filter(p => p.status === 'COMPLETED').length}`}>
              {projects.filter(p => p.status === 'COMPLETED').length}
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20" aria-hidden="true">
            <Check className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Missions</p>
            <p className="text-3xl font-black font-mono" aria-label={`Active missions: ${missionsCount}`}>{missionsCount}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20" aria-hidden="true">
            <History className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
