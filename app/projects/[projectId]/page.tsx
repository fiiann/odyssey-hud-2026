'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProjects } from '@/hooks/use-projects';
import { useMissions } from '@/hooks/use-missions';
import { ProjectHeader } from '@/components/project/project-header';
import { ProjectStatsCards } from '@/components/project/project-stats-cards';
import { MissionTimeline } from '@/components/project/mission-timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sword, Loader2, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { projects, getProjectById, updateProject, deleteProject } = useProjects();
  const { missions, deleteMission } = useMissions();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const projectId = params.projectId as string;
  const project = getProjectById(projectId);
  const projectMissions = missions.filter(m => m.projectId === projectId);

  // Calculate stats
  const totalMissions = projectMissions.length;
  const totalDuration = projectMissions.reduce((sum, m) => sum + m.durationMin, 0);
  const avgDuration = totalMissions > 0 ? totalDuration / totalMissions : 0;

  const handleEditProject = () => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };

  const handleDeleteProject = async () => {
    if (confirm('Permanently archive this sector and all its missions?')) {
      await deleteProject(projectId);
      router.push('/projects');
    }
  };

  const handleUpdateProject = async (data: any) => {
    await updateProject(projectId, {
      ...data,
      progress: parseInt(data.progress) || 0,
    });
    setEditModalOpen(false);
  };

  const handleDeleteMission = async (missionId: string) => {
    if (confirm('Confirm operational rollback for this mission?')) {
      await deleteMission(missionId);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#09090b] text-foreground flex items-center justify-center">
        <Card className="max-w-md border-white/5 bg-[#121214]">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-bold mb-2">Sector Not Found</p>
            <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                <Sword className="h-5 w-5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight">Odyssey HUD</h1>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Sector Detail</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto space-y-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <ProjectHeader
          project={project}
          totalMissions={totalMissions}
          totalDuration={totalDuration}
          avgDuration={avgDuration}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="lg:col-span-3">
            <ProjectStatsCards
              totalMissions={totalMissions}
              totalDuration={totalDuration}
              avgDuration={avgDuration}
            />
          </div>

          {/* Mission Timeline */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              Mission Execution Log
            </h2>
            <MissionTimeline
              missions={projectMissions}
              onDeleteMission={handleDeleteMission}
            />
          </div>
        </div>
      </main>

      {/* Edit Project Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Update Sector Status</DialogTitle>
          </DialogHeader>
          {project && (
            <form onSubmit={handleSubmit(handleUpdateProject)} className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
                  <Input
                    defaultValue={project.title}
                    {...register('title')}
                    className="bg-white/5 border-white/10 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Completion Status ({project.progress}%)</Label>
                  <Input
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={project.progress}
                    {...register('progress')}
                    className="bg-white/5 border-white/10 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Sector Description</Label>
                  <Textarea
                    defaultValue={project.description}
                    {...register('description')}
                    className="bg-white/5 border-white/10 min-h-[80px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary font-black uppercase italic tracking-tighter">
                  Save Parameters
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
