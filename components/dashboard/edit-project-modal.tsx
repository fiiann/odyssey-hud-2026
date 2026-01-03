'use client';

import { useState, useId } from 'react';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PROJECT_STATUS } from '@/lib/constants';
import { Project } from '@/lib/types';

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onUpdate: (projectId: string, data: any) => Promise<any>;
  onDelete: () => void;
}

export function EditProjectModal({ open, onOpenChange, project, onUpdate, onDelete }: EditProjectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      await onUpdate(project.projectId, {
        status: formData.get('status') as any,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      });
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !isSubmitting && onOpenChange(open)} ariaLabelledby={titleId}>
      <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle id={titleId} className="text-2xl font-black italic uppercase tracking-tighter">Update Sector Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-project-title" className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
              <Input id="edit-project-title" name="title" defaultValue={project.title} className="bg-white/5 border-white/10 font-bold" disabled={isSubmitting} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-project-status" className="text-[10px] font-black uppercase tracking-widest opacity-50">Operational Lifecycle</Label>
              <select
                id="edit-project-status"
                name="status"
                className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 pr-10 text-sm text-foreground focus-visible:ring-primary font-bold appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.3)%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-center disabled:opacity-50"
                defaultValue={project.status}
                disabled={isSubmitting}
              >
                {Object.entries(PROJECT_STATUS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-project-description" className="text-[10px] font-black uppercase tracking-widest opacity-50">Sector Description</Label>
              <Textarea id="edit-project-description" name="description" defaultValue={project.description} className="bg-white/5 border-white/10 min-h-[80px]" disabled={isSubmitting} />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 sm:justify-between">
            <Button type="button" variant="destructive" size="sm" onClick={onDelete} disabled={isSubmitting} aria-label="Archive project">
              Archived (Delete)
            </Button>
            <Button type="submit" className="bg-primary font-black uppercase italic tracking-tighter" disabled={isSubmitting} aria-label="Save project changes">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Parameters'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
