'use client';

import { useId } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Rocket } from 'lucide-react';
import { ProjectFormValues } from '@/lib/validations';
import { UseFormReturn } from 'react-hook-form';

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProjectFormValues) => void;
  formMethods: UseFormReturn<ProjectFormValues>;
  isSubmitting: boolean;
}

export function CreateProjectModal({ open, onOpenChange, onSubmit, formMethods, isSubmitting }: CreateProjectModalProps) {
  const { register, handleSubmit, formState: { errors } } = formMethods;
  const titleId = useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} ariaLabelledby={titleId}>
      <DialogContent className="bg-[#0c0c0e] border-white/10 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle id={titleId} className="text-2xl font-black italic uppercase tracking-tighter">
            Initiate New Project
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">Define a new sector to track execution impact.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-title" className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
              <Input
                id="project-title"
                className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 font-bold"
                placeholder="e.g. Project Odyssey"
                {...register('title')}
              />
              {errors.title && <p className="text-[10px] font-bold text-destructive uppercase mt-1">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description" className="text-[10px] font-black uppercase tracking-widest opacity-50">Objective Details</Label>
              <Textarea
                id="project-description"
                className="bg-white/5 border-white/10 focus-visible:ring-primary min-h-[100px]"
                placeholder="Describe the end-game for this project..."
                {...register('description')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repo-url" className="text-[10px] font-black uppercase tracking-widest opacity-50">Repo URL</Label>
                <Input id="repo-url" className="bg-white/5 border-white/10" placeholder="https://github.com/..." {...register('repo_url')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deploy-url" className="text-[10px] font-black uppercase tracking-widest opacity-50">Deploy Link</Label>
                <Input id="deploy-url" className="bg-white/5 border-white/10" placeholder="https://..." {...register('deploy_url')} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest"
              aria-label={isSubmitting ? 'Creating project...' : 'Confirm sector initialization'}
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Rocket className="w-4 h-4 mr-2" aria-hidden="true" />}
              Confirm Sector Initialization
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
