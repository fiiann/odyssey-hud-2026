'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { TerminologyToggle } from '@/components/terminology/terminology-toggle';
import { LogOut } from 'lucide-react';
import { Profile } from '@/lib/types';

interface DashboardHeaderProps {
  profile: Profile;
  terminologyMode: 'PROFESSIONAL' | 'ODYSSEY';
  onTerminologyModeChange: (mode: 'PROFESSIONAL' | 'ODYSSEY') => void;
  onLogout: () => void;
}

export const DashboardHeader = memo(function DashboardHeader({
  profile,
  terminologyMode,
  onTerminologyModeChange,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <nav aria-label="Main navigation" className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20" aria-hidden="true">
              <span className="text-xl font-black">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">HUD Command</h1>
              <p className="text-[10px] font-mono uppercase text-muted-foreground/60">Execution Dashboard 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <TerminologyToggle
              currentMode={terminologyMode}
              onModeChange={onTerminologyModeChange}
            />
            <div className="text-right hidden xs:block">
              <p className="text-sm font-bold">{profile.username}</p>
              <p className="text-[10px] font-mono uppercase text-primary">Rank {profile.currentLevel} Senior Architect</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="hover:bg-destructive/10 hover:text-destructive transition-all"
              aria-label="Logout from dashboard"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
});
