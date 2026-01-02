'use client';

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Update Sector Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
              <Input name="title" defaultValue={project.title} className="bg-white/5 border-white/10 font-bold" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Operational Lifecycle</Label>
              <select
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
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Sector Description</Label>
              <Textarea name="description" defaultValue={project.description} className="bg-white/5 border-white/10 min-h-[80px]" />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 sm:justify-between">
            <Button type="button" variant="destructive" size="sm" onClick={onDelete}>
              Archived (Delete)
            </Button>
            <Button type="submit" className="bg-primary font-black uppercase italic tracking-tighter">Save Parameters</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
