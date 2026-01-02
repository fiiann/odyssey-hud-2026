'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { useMissions } from '@/hooks/use-missions';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { Task, Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { MissionModal } from '@/components/mission/mission-modal';
import { useTerminologyMode } from '@/hooks/use-terminology-mode';
import { getProjectExecutionStats, getXpProgress } from '@/lib/calculations';
import { projectSchema, ProjectFormValues } from '@/lib/validations';
import { MissionFormValues as ModalMissionFormValues } from '@/components/mission/mission-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ProfileProgressCard } from '@/components/dashboard/profile-progress-card';
import { QuickStatsCard } from '@/components/dashboard/quick-stats-card';
import { ProjectsGrid } from '@/components/dashboard/projects-grid';
import { MissionsList } from '@/components/dashboard/missions-list';
import { CreateProjectModal } from '@/components/dashboard/create-project-modal';
import { EditProjectModal } from '@/components/dashboard/edit-project-modal';
import { RankPromotionModal } from '@/components/dashboard/rank-promotion-modal';
import { LayoutGrid, Flame, Check, Pause, Archive, Rocket, Plus, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading, levelUpModal } = useProfile();
  const { missions, isLoading: missionsLoading, createMission, deleteMission } = useMissions();
  const { projects, isLoading: projectsLoading, createProject, updateProject, deleteProject } = useProjects();
  const { tasks } = useTasks();
  const { mode: terminologyMode, setMode: setTerminologyMode } = useTerminologyMode();

  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [deleteProjectConfirm, setDeleteProjectConfirm] = useState(false);
  const [deleteMissionId, setDeleteMissionId] = useState<string | null>(null);

  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'ACTIVE',
    }
  });

  const {
    formState: { isSubmitting: projectSubmitting },
    reset: resetProject,
  } = projectForm;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleCreateMission = async (data: ModalMissionFormValues) => {
    await createMission({
      title: data.title,
      description: data.description || '',
      durationMin: data.durationMin,
      projectId: data.projectId || '',
      taskId: data.taskId,
      category: data.category,
    });
    setMissionModalOpen(false);
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
  const projectStats = getProjectExecutionStats(missions, projects, tasks);

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
      <DashboardHeader
        profile={profile}
        terminologyMode={terminologyMode}
        onTerminologyModeChange={setTerminologyMode}
        onLogout={handleLogout}
      />

      <main className="container mx-auto space-y-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Global Progress Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {xpProgress && <ProfileProgressCard profile={profile} xpProgress={xpProgress} />}
          <QuickStatsCard projects={projects} missionsCount={missions.length} />
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
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push('/projects')}
                  className="rounded-full px-4 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  See All
                </Button>
                <Button
                  size="sm"
                  onClick={() => setProjectModalOpen(true)}
                  className="rounded-full px-4 h-8 bg-white/5 text-xs border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Plus className="w-3 h-3 mr-2" />
                  Initiate Project
                </Button>
              </div>
            </div>

            <ProjectsGrid
              projects={projectStats}
              isLoading={projectsLoading}
              onInitiateProject={() => setProjectModalOpen(true)}
            />
          </div>

          {/* Missions Column */}
          <MissionsList
            missions={missions}
            projects={projects}
            isLoading={missionsLoading}
            terminologyMode={terminologyMode}
            onDeleteMission={handleDeleteMission}
            onLogMission={() => setMissionModalOpen(true)}
          />
        </div>
      </main>

      {/* Initialize Project Modal */}
      <CreateProjectModal
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
        onSubmit={handleCreateProject}
        formMethods={projectForm}
        isSubmitting={projectSubmitting}
      />

      {/* Log Time/Battle Modal */}
      <MissionModal
        open={missionModalOpen}
        onOpenChange={setMissionModalOpen}
        onSubmit={handleCreateMission}
        projects={projects}
        tasks={tasks}
        mode={terminologyMode}
      />

      {/* Edit Project Status Modal */}
      <EditProjectModal
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
        project={selectedProject}
        onUpdate={handleUpdateProject}
        onDelete={() => setDeleteProjectConfirm(true)}
      />

      {/* Rank Promotion Modal */}
      <RankPromotionModal open={levelUpModal} profile={profile} />

      <Toaster />

      {/* Delete Mission Confirmation */}
      <ConfirmDialog
        open={deleteMissionId !== null}
        onOpenChange={() => setDeleteMissionId(null)}
        title="Delete Mission?"
        description="Confirm operational rollback for this mission?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeleteMission}
        variant="destructive"
      />

      {/* Delete Project Confirmation */}
      <ConfirmDialog
        open={deleteProjectConfirm}
        onOpenChange={setDeleteProjectConfirm}
        title="Delete Project?"
        description="Permanently delete this project and its link?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeleteProject}
        variant="destructive"
      />
    </div>
  );

  async function handleDeleteMission(id: string) {
    setDeleteMissionId(id);
  }

  async function confirmDeleteMission() {
    if (deleteMissionId) {
      await deleteMission(deleteMissionId);
      setDeleteMissionId(null);
    }
  }

  async function confirmDeleteProject() {
    if (selectedProject) {
      await deleteProject(selectedProject.projectId);
      setSelectedProject(null);
      setDeleteProjectConfirm(false);
    }
  }
}
