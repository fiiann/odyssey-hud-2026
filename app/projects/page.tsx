'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { useMissions } from '@/hooks/use-missions';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, Column } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { Progress } from '@/components/ui/progress';
import { PROJECT_STATUS } from '@/lib/constants';
import { formatDuration, getProjectExecutionStats } from '@/lib/calculations';
import { cn } from '@/lib/utils';
import {
    Sword,
    LayoutGrid,
    ChevronLeft,
    ExternalLink,
    Pencil,
    Trash2,
    Flame,
    Check,
    Pause,
    Archive,
    Rocket,
    Search,
    Filter,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { profile } = useProfile();
    const { missions } = useMissions();
    const { projects, isLoading: projectsLoading, deleteProject } = useProjects();
    const { tasks } = useTasks();

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
        key: 'status',
        direction: 'asc',
    });

    const projectStats = useMemo(() => getProjectExecutionStats(missions, projects, tasks), [missions, projects, tasks]);

    const filteredProjects = useMemo(() => {
        return projectStats
            .filter((project) => {
                const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.description?.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                const aValue = a[sortConfig.key as keyof typeof a];
                const bValue = b[sortConfig.key as keyof typeof b];

                if (aValue === bValue) return 0;

                const comparison = (aValue ?? '') > (bValue ?? '') ? 1 : -1;
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            });
    }, [projectStats, searchQuery, statusFilter, sortConfig]);

    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProjects.slice(start, start + itemsPerPage);
    }, [filteredProjects, currentPage]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACTIVE': return Flame;
            case 'COMPLETED': return Check;
            case 'ON_HOLD': return Pause;
            case 'ARCHIVED': return Archive;
            default: return Rocket;
        }
    };

    const columns: Column<any>[] = [
        {
            key: 'title',
            header: 'Project Sector',
            sortable: true,
            renderCell: (project) => (
                <div className="flex flex-col gap-1 max-w-md">
                    <span className="font-bold text-base tracking-tight">{project.title}</span>
                    {project.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1">{project.description}</span>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            renderCell: (project) => {
                const StatusIcon = getStatusIcon(project.status);
                const statusInfo = PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS];
                return (
                    <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-tighter bg-${statusInfo.color}-500/10 text-${statusInfo.color}-500 border-${statusInfo.color}-500/20`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                    </Badge>
                );
            },
        },
        {
            key: 'progress',
            header: 'Execution Progress',
            sortable: true,
            renderCell: (project) => (
                <div className="flex flex-col gap-2 min-w-[120px]">
                    <div className="flex justify-between text-[10px] font-bold">
                        <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                </div>
            ),
        },
        {
            key: 'totalMinutes',
            header: 'Time Logged',
            sortable: true,
            renderCell: (project) => (
                <span className="font-mono text-xs font-bold text-primary">
                    {formatDuration(project.totalMinutes)}
                </span>
            ),
        },
        {
            key: 'links',
            header: 'Links',
            renderCell: (project) => (
                <div className="flex gap-2">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                    {project.deployUrl && (
                        <a
                            href={project.deployUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Rocket className="h-4 w-4" />
                        </a>
                    )}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            renderCell: (project) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                            if (confirm('Permanently decommission this project?')) {
                                deleteProject(project.projectId);
                            }
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const handleSort = (key: string) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    if (authLoading) return null;

    return (
        <div className="min-h-screen bg-[#09090b] text-foreground">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                                <Sword className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight">Odyssey HUD</h1>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Architect Command</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard')}>
                            <ChevronLeft className="h-4 w-4" />
                            Back to Command Center
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <LayoutGrid className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">All Sectors</h2>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="font-mono text-[10px]">{filteredProjects.length} Systems Identified</Badge>
                                {statusFilter !== 'ALL' && (
                                    <Badge variant="outline" className="text-[10px] uppercase">{statusFilter}</Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search sectors..."
                                className="pl-9 bg-white/5 border-white/10 w-full sm:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                            <Filter className="h-4 w-4 mx-2 text-muted-foreground" />
                            {['ALL', 'ACTIVE', 'COMPLETED', 'ON_HOLD', 'ARCHIVED'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={cn(
                                        "px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                                        statusFilter === status
                                            ? "bg-primary text-white shadow-lg"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Card className="border-white/5 bg-[#121214]/50 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                        <Table
                            columns={columns}
                            data={paginatedProjects}
                            isLoading={projectsLoading}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                            emptyState={
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                    <LayoutGrid className="w-16 h-16 mb-4" />
                                    <p className="text-lg font-bold uppercase tracking-widest">No Sectors Found</p>
                                    <p className="text-sm">Initiate your first project to begin tracking.</p>
                                </div>
                            }
                        />
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                        Showing <span className="text-foreground font-bold">{Math.min(filteredProjects.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredProjects.length, currentPage * itemsPerPage)}</span> of <span className="text-foreground font-bold">{filteredProjects.length}</span> Results
                    </p>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>
        </div>
    );
}


