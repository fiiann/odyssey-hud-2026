'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { useMissions } from '@/hooks/use-missions';
import { useProjects } from '@/hooks/use-projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { PROJECT_STATUS } from '@/lib/constants';
import { getProjectExecutionStats, formatDuration, getRelativeTime, getXpProgress } from '@/lib/calculations';
import { missionSchema, MissionFormValues, projectSchema, ProjectFormValues } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LogOut,
  Sword,
  ScrollText,
  Plus,
  Trash2,
  ExternalLink,
  Pencil,
  Loader2,
  Flame,
  Check,
  Pause,
  Archive,
  Rocket,
  LayoutGrid,
  History,
  X,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading, levelUpModal } = useProfile();
  const { missions, isLoading: missionsLoading, createMission, deleteMission } = useMissions();
  const { projects, isLoading: projectsLoading, createProject, updateProject, deleteProject } = useProjects();

  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const {
    register: registerMission,
    handleSubmit: handleSubmitMission,
    formState: { errors: missionErrors, isSubmitting: missionSubmitting },
    reset: resetMission,
  } = useForm<MissionFormValues>({
    resolver: zodResolver(missionSchema),
  });

  const {
    register: registerProject,
    handleSubmit: handleSubmitProject,
    formState: { errors: projectErrors, isSubmitting: projectSubmitting },
    reset: resetProject,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'ACTIVE',
      progress: 0,
    }
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleCreateMission = async (data: MissionFormValues) => {
    const result = await createMission({
      title: data.title,
      description: data.description,
      durationMin: data.duration_min,
      projectId: data.project_id,
    });
    if (result.success) {
      setMissionModalOpen(false);
      resetMission();
    }
  };

  const handleCreateProject = async (data: ProjectFormValues) => {
    const result = await createProject(data as any);
    if (result.success) {
      setProjectModalOpen(false);
      resetProject();
    }
  };

  const handleUpdateProject = async (projectId: string, updates: any) => {
    await updateProject(projectId, updates);
    setSelectedProject(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return Flame;
      case 'COMPLETED': return Check;
      case 'ON_HOLD': return Pause;
      case 'ARCHIVED': return Archive;
      default: return Rocket;
    }
  };

  const xpProgress = profile ? getXpProgress(profile.totalXp) : null;
  const projectStats = getProjectExecutionStats(missions, projects);

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !profile) return null;

  return (
    <div className="min-h-screen bg-[#09090b] text-foreground selection:bg-primary/30">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                <Sword className="h-5 w-5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight">Odyssey HUD</h1>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Architect Command</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden xs:block">
                <p className="text-sm font-bold">{profile.username}</p>
                <p className="text-[10px] font-mono uppercase text-primary">Rank {profile.currentLevel} Senior Architect</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive transition-all">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto space-y-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Global Progress Header */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-white/5 bg-gradient-to-br from-[#121214] to-[#09090b] shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sword className="w-32 h-32 rotate-12" />
            </div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-mono">ARCHITECT LEVEL {profile.currentLevel}</Badge>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Total Execution Units</span>
                  <span className="text-2xl font-black text-primary font-mono">{profile.totalXp} <span className="text-xs opacity-50 uppercase">Credits</span></span>
                </div>
              </div>
              <CardTitle className="text-4xl font-black tracking-tighter mb-2">Overall Project Impact</CardTitle>
              <CardDescription className="text-muted-foreground/80 max-w-md">Your rank reflects the cumulative architectural decisions and shipped code across all active sectors.</CardDescription>
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

          <Card className="border-white/5 bg-card/30 backdrop-blur-sm flex flex-col justify-center">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Projects</p>
                  <p className="text-3xl font-black font-mono">{projects.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <LayoutGrid className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Completed</p>
                  <p className="text-3xl font-black font-mono">{projects.filter(p => p.status === 'COMPLETED').length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Missions</p>
                  <p className="text-3xl font-black font-mono">{missions.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <History className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Projects Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">Project Sectors</h2>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => router.push('/projects')} className="rounded-full px-4 h-8 text-xs text-muted-foreground hover:text-foreground">
                  See All
                </Button>
                <Button size="sm" onClick={() => setProjectModalOpen(true)} className="rounded-full px-4 h-8 bg-white/5 text-xs border border-white/10 hover:bg-white/10 transition-all">
                  <Plus className="w-3 h-3 mr-2" />
                  Initiate Project
                </Button>
              </div>
            </div>

            {projectsLoading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map(i => <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/5" />)}
              </div>
            ) : projects.length === 0 ? (
              <Card className="border-dashed border-white/10 bg-transparent py-12">
                <CardContent className="flex flex-col items-center text-center">
                  <LayoutGrid className="w-12 h-12 text-muted-foreground/20 mb-4" />
                  <p className="text-muted-foreground font-medium">No projects initiated</p>
                  <p className="text-sm text-muted-foreground/60 max-w-xs mb-6">You need at least one project to start logging missions.</p>
                  <Button variant="outline" size="sm" onClick={() => setProjectModalOpen(true)}>Initialize First Sector</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {projectStats.map((project) => {
                  const StatusIcon = getStatusIcon(project.status);
                  const statusInfo = PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS];
                  return (
                    <Card key={project.projectId} className="border-white/5 bg-[#121214] hover:bg-[#18181b] transition-all group cursor-pointer" onClick={() => setSelectedProject(project)}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-tighter bg-${statusInfo.color}-500/10 text-${statusInfo.color}-500 border-${statusInfo.color}-500/20`}>
                            <StatusIcon className="w-2.5 h-2.5 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{formatDuration(project.totalMinutes)} log</span>
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{project.title}</CardTitle>
                        {project.description && <CardDescription className="line-clamp-1">{project.description}</CardDescription>}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-muted-foreground">
                            <span>Status: {project.progress}% Complete</span>
                          </div>
                          <Progress value={project.progress} className="h-1.5" />
                          <div className="flex items-center gap-2 pt-2">
                            {project.repoUrl && <Badge variant="secondary" className="h-5 px-1.5 text-[9px]"><ExternalLink className="w-2 h-2 mr-1" /> REPO</Badge>}
                            {project.deployUrl && <Badge variant="secondary" className="h-5 px-1.5 text-[9px]"><ExternalLink className="w-2 h-2 mr-1" /> LIVE</Badge>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Missions Column */}
          <div className="space-y-6 text-foreground">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">Mission History</h2>
              </div>
              <Button size="sm" onClick={() => setMissionModalOpen(true)} className="rounded-full px-4 h-8 bg-primary hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                <Plus className="w-3 h-3 mr-2" />
                Log Mission
              </Button>
            </div>

            <Card className="border-white/5 bg-[#121214]/50 backdrop-blur-sm min-h-[400px]">
              <CardContent className="pt-6 px-4">
                {missionsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-16 animate-pulse rounded-xl bg-white/5" />)}
                  </div>
                ) : missions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                    <ScrollText className="w-12 h-12 mb-4" />
                    <p className="text-sm font-medium">No missions logged yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {missions.slice(0, 15).map((mission) => {
                      const project = projects.find(p => p.projectId === mission.projectId);
                      return (
                        <div key={mission.missionId} className="group relative flex flex-col gap-1 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all animate-in fade-in zoom-in-95 duration-300">
                          <button
                            onClick={() => handleDeleteMission(mission.missionId)}
                            className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive/10 text-destructive border border-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-destructive hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-sm tracking-tight truncate">{mission.title}</h4>
                            <span className="text-[10px] font-mono text-primary font-bold">{mission.durationMin}M</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                            <span className="truncate max-w-[120px] text-blue-400">{project?.title || 'Unknown Project'}</span>
                            <span>{getRelativeTime(mission.createdAt)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Initialize Project Modal */}
      <Dialog open={projectModalOpen} onOpenChange={setProjectModalOpen}>
        <DialogContent className="bg-[#0c0c0e] border-white/10 sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Initiate New Project</DialogTitle>
            <DialogDescription className="text-muted-foreground">Define a new sector to track execution impact.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitProject(handleCreateProject)} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
                <Input
                  className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 font-bold"
                  placeholder="e.g. Project Odyssey"
                  {...registerProject('title')}
                />
                {projectErrors.title && <p className="text-[10px] font-bold text-destructive uppercase mt-1">{projectErrors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Objective Details</Label>
                <Textarea
                  className="bg-white/5 border-white/10 focus-visible:ring-primary min-h-[100px]"
                  placeholder="Describe the end-game for this project..."
                  {...registerProject('description')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Repo URL</Label>
                  <Input className="bg-white/5 border-white/10" placeholder="https://github.com/..." {...registerProject('repo_url')} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Deploy Link</Label>
                  <Input className="bg-white/5 border-white/10" placeholder="https://..." {...registerProject('deploy_url')} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={projectSubmitting} className="w-full h-12 bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest">
                {projectSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Rocket className="w-4 h-4 mr-2" />}
                Confirm Sector Initialization
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Log Mission Modal */}
      <Dialog open={missionModalOpen} onOpenChange={setMissionModalOpen}>
        <DialogContent className="bg-[#0c0c0e] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Log Building Action</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">Convert your time into execution credits.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitMission(handleCreateMission)} className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Target Project</Label>
              <select
                className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus-visible:ring-primary font-bold"
                {...registerMission('project_id')}
              >
                <option value="" disabled>Select a sector...</option>
                {projects.map(p => (
                  <option key={p.projectId} value={p.projectId}>{p.title}</option>
                ))}
              </select>
              {missionErrors.project_id && <p className="text-[10px] font-bold text-destructive uppercase mt-1">{missionErrors.project_id.message}</p>}
              {projects.length === 0 && <p className="text-[10px] font-bold text-amber-500 uppercase mt-1">Please create a project first</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Mission Task</Label>
              <Input
                className="bg-white/5 border-white/10 h-10 font-medium"
                placeholder="What exactly did you ship?"
                {...registerMission('title')}
              />
              {missionErrors.title && <p className="text-[10px] font-bold text-destructive uppercase mt-1">{missionErrors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Duration (Minutes)</Label>
              <Input
                type="number"
                className="bg-white/5 border-white/10 h-10 font-mono"
                placeholder="60"
                {...registerMission('duration_min', { valueAsNumber: true })}
              />
              {missionErrors.duration_min && <p className="text-[10px] font-bold text-destructive uppercase mt-1">{missionErrors.duration_min.message}</p>}
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit" disabled={missionSubmitting || projects.length === 0} className="w-full bg-primary font-black uppercase italic tracking-tighter h-12 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                {missionSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Flame className="w-4 h-4 mr-2" />}
                Log Execution To Log
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Project Status Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-[#0c0c0e] border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Update Sector Status</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateProject(selectedProject.projectId, {
                progress: parseInt(formData.get('progress') as string) || 0,
                status: formData.get('status') as any,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
              });
            }} className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Project Title</Label>
                  <Input name="title" defaultValue={selectedProject.title} className="bg-white/5 border-white/10 font-bold" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Completion Status ({selectedProject.progress}%)</Label>
                  <Input name="progress" type="number" min="0" max="100" defaultValue={selectedProject.progress} className="bg-white/5 border-white/10 font-mono" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Operational Lifecycle</Label>
                  <select
                    name="status"
                    className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus-visible:ring-primary font-bold"
                    defaultValue={selectedProject.status}
                  >
                    {Object.entries(PROJECT_STATUS).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Sector Description</Label>
                  <Textarea name="description" defaultValue={selectedProject.description} className="bg-white/5 border-white/10 min-h-[80px]" />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0 sm:justify-between">
                <Button type="button" variant="destructive" size="sm" onClick={() => {
                  if (confirm('Permanently delete this project and its link?')) {
                    deleteProject(selectedProject.projectId);
                    setSelectedProject(null);
                  }
                }}>Archived (Delete)</Button>
                <Button type="submit" className="bg-primary font-black uppercase italic tracking-tighter">Save Parameters</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Rank Promotion Modal */}
      {levelUpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center animate-in zoom-in-50 duration-500">
            <div className="text-10xl font-black text-primary mb-4 tracking-tighter italic animate-bounce h-24">RANK UP!</div>
            <div className="text-5xl font-black mb-8 uppercase tracking-widest">Architect Rank {profile.currentLevel}</div>
            <div className="text-xl text-muted-foreground/60 max-w-sm mx-auto">Your architectural influence is expanding. Continue shipping to reach Rank {profile.currentLevel + 1}.</div>
            <Button onClick={() => window.location.reload()} className="mt-12 bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.3em] px-12 h-14 rounded-none">Acknowledge Command</Button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );

  async function handleDeleteMission(id: string) {
    if (confirm('Confirm operational rollback for this mission?')) {
      await deleteMission(id);
    }
  }
}
