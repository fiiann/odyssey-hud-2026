'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sword } from 'lucide-react';
import { Profile } from '@/lib/types';

interface ProfileProgressCardProps {
  profile: Profile;
  xpProgress: {
    currentLevelXp: number;
    nextLevelXp: number;
    xpToNextLevel: number;
    progressPercent: number;
  };
}

export function ProfileProgressCard({ profile, xpProgress }: ProfileProgressCardProps) {
  return (
    <Card className="lg:col-span-2 border-white/5 bg-gradient-to-br from-[#121214] to-[#09090b] shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sword className="w-32 h-32 rotate-12" />
      </div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-mono">
            ARCHITECT LEVEL {profile.currentLevel}
          </Badge>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Total Execution Units</span>
            <span className="text-2xl font-black text-primary font-mono">
              {profile.totalXp} <span className="text-xs opacity-50 uppercase">Credits</span>
            </span>
          </div>
        </div>
        <CardTitle className="text-4xl font-black tracking-tighter mb-2">Overall Project Impact</CardTitle>
        <CardDescription className="text-muted-foreground/80 max-w-md">
          Your rank reflects the cumulative architectural decisions and shipped code across all active sectors.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>Current Promotion: {xpProgress?.progressPercent.toFixed(1)}%</span>
            <span>{xpProgress?.xpToNextLevel} to Rank {profile.currentLevel + 1}</span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
            <div
              className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${xpProgress?.progressPercent}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
