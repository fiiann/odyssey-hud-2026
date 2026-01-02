'use client';

import { useId } from 'react';
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
  onUpdate: (projectId: string, data: any) => void;
  onDelete: () => void;
}

export function EditProjectModal({ open, onOpenChange, project, onUpdate, onDelete }: EditProjectModalProps) {
  if (!project) return null;

  const titleId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    onUpdate(project.projectId, {
      status: formData.get('status') as any,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} ariaLabelledby={titleId}>
      <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle id={titleId} className="text-2xl font-black italic uppercase tracking-tighter">Update Sector Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-project-title" className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
              <Input id="edit-project-title" name="title" defaultValue={project.title} className="bg-white/5 border-white/10 font-bold" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-project-status" className="text-[10px] font-black uppercase tracking-widest opacity-50">Operational Lifecycle</Label>
              <select
                id="edit-project-status"
                name="status"
                className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus-visible:ring-primary font-bold"
                defaultValue={project.status}
              >
                {Object.entries(PROJECT_STATUS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-project-description" className="text-[10px] font-black uppercase tracking-widest opacity-50">Sector Description</Label>
              <Textarea id="edit-project-description" name="description" defaultValue={project.description} className="bg-white/5 border-white/10 min-h-[80px]" />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 sm:justify-between">
            <Button type="button" variant="destructive" size="sm" onClick={onDelete} aria-label="Archive project">
              Archived (Delete)
            </Button>
            <Button type="submit" className="bg-primary font-black uppercase italic tracking-tighter" aria-label="Save project changes">Save Parameters</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
