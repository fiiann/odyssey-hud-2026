'use client';

import { Button } from '@/components/ui/button';
import { Profile } from '@/lib/types';

interface RankPromotionModalProps {
  open: boolean;
  profile: Profile;
}

export function RankPromotionModal({ open, profile }: RankPromotionModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="text-center animate-in zoom-in-50 duration-500">
        <div className="text-10xl font-black text-primary mb-4 tracking-tighter italic animate-bounce h-24">RANK UP!</div>
        <div className="text-5xl font-black mb-8 uppercase tracking-widest">Architect Rank {profile.currentLevel}</div>
        <div className="text-xl text-muted-foreground/60 max-w-sm mx-auto">
          Your architectural influence is expanding. Continue shipping to reach Rank {profile.currentLevel + 1}.
        </div>
        <Button
          onClick={() => window.location.reload()}
          className="mt-12 bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.3em] px-12 h-14 rounded-none"
        >
          Acknowledge Command
        </Button>
      </div>
    </div>
  );
}
