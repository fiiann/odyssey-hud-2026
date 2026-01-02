'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { useMissions } from '@/hooks/use-missions';
import { useTerminologyMode } from '@/hooks/use-terminology-mode';
import { useTerminology } from '@/lib/terminology';
import { TASK_STATUS, TASK_PRIORITY } from '@/lib/constants';
import { Task, TaskStatus, TaskPriority } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Clock,
    Calendar,
    TrendingUp,
    CheckCircle2,
    Trash2,
    Edit,
    Loader2,
    ChevronRight,
    Sword,
    AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { TaskModal } from '@/components/task/task-modal';
import { MissionModal } from '@/components/mission/mission-modal';

export default function TaskDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { getProjectById, isLoading: projectsLoading } = useProjects();
    const { tasks, updateTask, deleteTask, getTaskById, isLoading: tasksLoading } = useTasks(params.projectId as string);
    const { missions, deleteMission, createMission } = useMissions();
    const { mode: terminologyMode } = useTerminologyMode();
    const t = useTerminology(terminologyMode);

    const [deleteTaskConfirm, setDeleteTaskConfirm] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [missionModalOpen, setMissionModalOpen] = useState(false);
    const [deleteMissionId, setDeleteMissionId] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    const projectId = params.projectId as string;
    const taskId = params.taskId as string;
    const project = getProjectById(projectId);
    const task = getTaskById(taskId);

    const linkedMissions = useMemo(() => {
        return missions.filter(m => m.taskId === taskId);
    }, [missions, taskId]);

    const formatMinutes = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins}m`;
        if (mins === 0) return `${hours}h`;
        return `${hours}h ${mins}m`;
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMM d, yyyy • h:mm a');
    };

    const handleStatusChange = async (newStatus: TaskStatus) => {
        if (task) {
            await updateTask(taskId, { status: newStatus } as any);
        }
    };

    const handlePriorityChange = async (newPriority: TaskPriority) => {
        if (task) {
            await updateTask(taskId, { priority: newPriority } as any);
        }
    };

    const handleDeleteTask = async () => {
        await deleteTask(taskId);
        router.push(`/projects/${projectId}`);
    };

    const handleUpdateTask = async (data: any) => {
        await updateTask(taskId, {
            ...data,
            projectId: data.project_id,
            estimatedMin: data.estimated_min,
            dueDate: data.due_date,
        });
        setEditModalOpen(false);
    };

    const handleCreateMission = async (data: any) => {
        await createMission({
            ...data,
            projectId,
            taskId
        });
        setMissionModalOpen(false);
    };

    const confirmDeleteMission = async () => {
        if (deleteMissionId) {
            await deleteMission(deleteMissionId);
            setDeleteMissionId(null);
        }
    };

    if (authLoading || tasksLoading || projectsLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (!task || !project) {
        return (
            <div className="min-h-screen bg-[#09090b] text-foreground flex items-center justify-center">
                <Card className="max-w-md border-white/5 bg-[#121214]">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                        <p className="text-lg font-bold mb-2">{t.task} Not Found</p>
                        <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist or has been removed.</p>
                        <Button onClick={() => router.push(`/projects/${projectId}`)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to {t.project}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const statusStyle = TASK_STATUS[task.status];
    const priorityStyle = TASK_PRIORITY[task.priority];
    const hasTimeTracking = task.estimatedMin && task.actualMin !== undefined;
    const variance = hasTimeTracking
        ? ((task.actualMin! - task.estimatedMin!) / task.estimatedMin!) * 100
        : null;

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
                            <div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                                    <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push('/dashboard')}>War Room</span>
                                    <ChevronRight className="w-3 h-3" />
                                    <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push(`/projects/${projectId}`)}>{project.title}</span>
                                    <ChevronRight className="w-3 h-3" />
                                    <span className="text-foreground">Detail</span>
                                </div>
                                <h1 className="text-lg font-bold tracking-tight">{task.title}</h1>
                            </div>
                        </div>

                        <Button variant="ghost" size="sm" onClick={() => router.push(`/projects/${projectId}`)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to {terminologyMode === 'ODYSSEY' ? 'Sector' : 'Project'}
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-white/5 bg-[#121214] overflow-hidden">
                            <div className="p-6 space-y-6">
                                <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-white/5">
                                    <div className="space-y-1.5">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Current Status</p>
                                        <Select value={task.status} onValueChange={handleStatusChange}>
                                            <SelectTrigger className={cn(
                                                "w-[180px] font-bold uppercase tracking-tighter italic h-10 border-0",
                                                statusStyle.color === 'gray' && "bg-gray-500/10 text-gray-400",
                                                statusStyle.color === 'blue' && "bg-blue-500/10 text-blue-400",
                                                statusStyle.color === 'green' && "bg-green-500/10 text-green-400",
                                                statusStyle.color === 'red' && "bg-red-500/10 text-red-400"
                                            )}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0c0c0e] border-white/10">
                                                {Object.keys(TASK_STATUS).map((status) => (
                                                    <SelectItem key={status} value={status} className="font-bold uppercase tracking-tighter italic">
                                                        {t.status[status as TaskStatus]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Priority Level</p>
                                        <Select value={task.priority} onValueChange={handlePriorityChange}>
                                            <SelectTrigger className={cn(
                                                "w-[180px] font-bold uppercase tracking-tighter italic h-10 border-0",
                                                priorityStyle.color === 'red' && "bg-red-500/10 text-red-400",
                                                priorityStyle.color === 'orange' && "bg-orange-500/10 text-orange-400",
                                                priorityStyle.color === 'yellow' && "bg-yellow-500/10 text-yellow-400",
                                                priorityStyle.color === 'gray' && "bg-gray-500/10 text-gray-400"
                                            )}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0c0c0e] border-white/10">
                                                {Object.keys(TASK_PRIORITY).map((priority) => (
                                                    <SelectItem key={priority} value={priority} className="font-bold uppercase tracking-tighter italic">
                                                        {t.priority[priority as TaskPriority]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {task.category && (
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Field / Category</p>
                                            <div className="h-10 flex items-center px-4 rounded-md bg-white/5 border border-white/10 text-sm font-bold">
                                                {task.category}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-black uppercase tracking-widest opacity-50 italic">Description & Objectives</h2>
                                        <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(true)} className="h-8 hover:bg-white/5">
                                            <Edit className="w-3.5 h-3.5 mr-2" />
                                            Edit Details
                                        </Button>
                                    </div>
                                    <div className="text-lg leading-relaxed text-muted-foreground bg-white/[0.02] p-6 rounded-2xl border border-white/5 italic">
                                        {task.description || "No description provided for this mission."}
                                    </div>
                                </div>

                                {task.tags && task.tags.length > 0 && (
                                    <div className="space-y-2 pt-4">
                                        <h2 className="text-[10px] font-black uppercase tracking-widest opacity-50 italic">Operational Tags</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {task.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="bg-white/5 border-white/10 text-xs px-3 py-1 font-bold">
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Execution History */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight italic flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Mission Execution Log
                                </h2>
                                <Button size="sm" onClick={() => setMissionModalOpen(true)} className="shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                                    <Sword className="w-4 h-4 mr-2" />
                                    Record New Battle
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {linkedMissions.length > 0 ? (
                                    linkedMissions.map((mission) => (
                                        <Card key={mission.missionId} className="group border-white/5 bg-[#121214] hover:bg-[#18181b] transition-all duration-300">
                                            <CardContent className="p-4 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                                        <Clock className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm">{mission.title}</h4>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs font-black text-primary uppercase italic">{formatMinutes(mission.durationMin)}</span>
                                                            <span className="text-[10px] text-muted-foreground border-l border-white/10 pl-3">
                                                                {formatDate(mission.createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteMissionId(mission.missionId)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <Card className="border-dashed border-white/10 bg-transparent py-12">
                                        <CardContent className="flex flex-col items-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                                <Sword className="w-6 h-6 text-muted-foreground opacity-20" />
                                            </div>
                                            <p className="text-muted-foreground font-medium mb-1">No execution logs found</p>
                                            <p className="text-xs text-muted-foreground/60 italic">Record your first battle log to track progress.</p>
                                            <Button variant="link" size="sm" onClick={() => setMissionModalOpen(true)} className="mt-2">
                                                Start First Execution
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card className="border-white/5 bg-[#121214] p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 italic">Strategic Analysis</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="h-4 w-4 text-purple-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Intellect Estimate</span>
                                        </div>
                                        <p className="text-2xl font-black italic tracking-tighter">
                                            {task.estimatedMin ? formatMinutes(task.estimatedMin) : "Not Calculated"}
                                        </p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="h-4 w-4 text-orange-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Actual Execution</span>
                                        </div>
                                        <p className="text-2xl font-black italic tracking-tighter">
                                            {formatMinutes(task.actualMin || 0)}
                                        </p>
                                    </div>

                                    {hasTimeTracking && (
                                        <div className={cn(
                                            "p-4 rounded-xl border",
                                            Math.abs(variance!) <= 20 ? "bg-green-500/5 border-green-500/10" :
                                                Math.abs(variance!) <= 50 ? "bg-yellow-500/5 border-yellow-500/10" :
                                                    "bg-red-500/5 border-red-500/10"
                                        )}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle2 className={cn(
                                                    "h-4 w-4",
                                                    Math.abs(variance!) <= 20 ? "text-green-500" :
                                                        Math.abs(variance!) <= 50 ? "text-yellow-500" :
                                                            "text-red-500"
                                                )} />
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Operational Offset</span>
                                            </div>
                                            <p className={cn(
                                                "text-2xl font-black italic tracking-tighter",
                                                Math.abs(variance!) <= 20 ? "text-green-500" :
                                                    Math.abs(variance!) <= 50 ? "text-yellow-500" :
                                                        "text-red-500"
                                            )}>
                                                {variance! > 0 ? '+' : ''}{variance!.toFixed(1)}%
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 italic">Technical Meta</h3>
                                <div className="space-y-2 text-[11px] font-medium text-muted-foreground font-mono bg-black/20 p-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <span>SECTOR_ID:</span>
                                        <span className="text-foreground">{projectId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>QUEST_ID:</span>
                                        <span className="text-foreground">{taskId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>INITIATED:</span>
                                        <span className="text-foreground">{format(new Date(task.createdAt), 'yyyy.MM.dd')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>LAST_INTEL:</span>
                                        <span className="text-foreground">{format(new Date(task.updatedAt), 'HH:mm:ss')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    variant="outline"
                                    className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500 font-black uppercase italic tracking-tighter"
                                    onClick={() => setDeleteTaskConfirm(true)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Terminate Quest
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            <TaskModal
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
                onSubmit={handleUpdateTask}
                task={task}
                projects={[project as any]}
                defaultProjectId={projectId}
            />

            <MissionModal
                open={missionModalOpen}
                onOpenChange={setMissionModalOpen}
                onSubmit={handleCreateMission}
                projectId={projectId}
                projectName={project.title}
                tasks={[task]}
                defaultTaskId={taskId}
                mode={terminologyMode}
            />

            <ConfirmDialog
                open={deleteTaskConfirm}
                onOpenChange={setDeleteTaskConfirm}
                title="Terminate Operational Data?"
                description="This action will permanently remove the quest data. Linked execution logs will be archived but this quest index will be purged."
                confirmLabel="Continue Termination"
                cancelLabel="Abort"
                onConfirm={handleDeleteTask}
                variant="destructive"
            />

            <ConfirmDialog
                open={deleteMissionId !== null}
                onOpenChange={() => setDeleteMissionId(null)}
                title="Rollback Execution?"
                description="Confirm operational rollback for this mission? This cannot be undone."
                confirmLabel="Confirm Rollback"
                cancelLabel="Keep Record"
                onConfirm={confirmDeleteMission}
                variant="destructive"
            />
        </div>
    );
}
