'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Sword } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminologyToggleProps {
  currentMode: 'PROFESSIONAL' | 'ODYSSEY';
  onModeChange: (mode: 'PROFESSIONAL' | 'ODYSSEY') => void;
}

export function TerminologyToggle({ currentMode, onModeChange }: TerminologyToggleProps) {
  const isProfessional = currentMode === 'PROFESSIONAL';

  return (
    <div className="flex items-center gap-2">
      {/* Professional Mode */}
      <Button
        variant={isProfessional ? 'default' : 'outline'}
        size="sm"
        onClick={() => onModeChange('PROFESSIONAL')}
        className={cn(
          "relative",
          !isProfessional && "border-white/10 bg-white/5 hover:bg-white/10"
        )}
      >
        <Briefcase className="w-4 h-4 mr-2" />
        Professional
        {isProfessional && (
          <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-[10px]">
            Active
          </Badge>
        )}
      </Button>

      {/* Odyssey Mode */}
      <Button
        variant={!isProfessional ? 'default' : 'outline'}
        size="sm"
        onClick={() => onModeChange('ODYSSEY')}
        className={cn(
          "relative",
          isProfessional && "border-white/10 bg-white/5 hover:bg-white/10"
        )}
      >
        <Sword className="w-4 h-4 mr-2" />
        Odyssey
        {!isProfessional && (
          <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-[10px]">
            Active
          </Badge>
        )}
      </Button>
    </div>
  );
}
