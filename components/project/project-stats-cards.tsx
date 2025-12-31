'use client';

import { Card, CardContent } from '@/components/ui/card';
import { History, Clock, Activity } from 'lucide-react';

interface ProjectStatsCardsProps {
  totalMissions: number;
  totalDuration: number;
  avgDuration: number;
}

export function ProjectStatsCards({ totalMissions, totalDuration, avgDuration }: ProjectStatsCardsProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total Missions */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Total Missions
              </p>
              <p className="text-3xl font-black font-mono">{totalMissions}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Execution Time */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Execution Time
              </p>
              <p className="text-3xl font-black font-mono">{formatDuration(totalDuration)}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avg per Mission */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Avg / Mission
              </p>
              <p className="text-3xl font-black font-mono">{formatDuration(Math.round(avgDuration))}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <History className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
