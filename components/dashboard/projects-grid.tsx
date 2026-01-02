'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LayoutGrid, ExternalLink, Plus, Rocket, Check, Pause, Archive } from 'lucide-react';
import { Project } from '@/lib/types';
import { PROJECT_STATUS } from '@/lib/constants';
import { formatDuration } from '@/lib/calculations';

interface ProjectsGridProps {
  projects: (Project & { totalMinutes: number })[];
  isLoading: boolean;
  onInitiateProject: () => void;
}

export function ProjectsGrid({ projects, isLoading, onInitiateProject }: ProjectsGridProps) {
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    const icons = {
      ACTIVE: Rocket,
      COMPLETED: Check,
      ON_HOLD: Pause,
      ARCHIVED: Archive,
    };
    return icons[status as keyof typeof icons] || Rocket;
  };

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {[1, 2].map(i => <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/5" />)}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="border-dashed border-white/10 bg-transparent py-12">
        <CardContent className="flex flex-col items-center text-center">
          <LayoutGrid className="w-12 h-12 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground font-medium">No projects initiated</p>
          <p className="text-sm text-muted-foreground/60 max-w-xs mb-6">
            You need at least one project to start logging missions.
          </p>
          <Button variant="outline" size="sm" onClick={onInitiateProject}>
            Initialize First Sector
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {projects.map((project) => {
        const StatusIcon = getStatusIcon(project.status);
        const statusInfo = PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS];
        return (
          <Card
            key={project.projectId}
            className="border-white/5 bg-[#121214] hover:bg-[#18181b] hover:border-primary/30 transition-all group cursor-pointer"
            onClick={() => router.push(`/projects/${project.projectId}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-1">
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase font-bold tracking-tighter bg-${statusInfo.color}-500/10 text-${statusInfo.color}-500 border-${statusInfo.color}-500/20`}
                >
                  <StatusIcon className="w-2.5 h-2.5 mr-1" />
                  {statusInfo.label}
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  {formatDuration(project.totalMinutes)} log
                </span>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              {project.description && <CardDescription className="line-clamp-1">{project.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase text-muted-foreground">
                  <span>Status: {project.progress}% Complete</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
                <div className="flex items-center gap-2 pt-2">
                  {project.repoUrl && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-[9px]">
                      <ExternalLink className="w-2 h-2 mr-1" /> REPO
                    </Badge>
                  )}
                  {project.deployUrl && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-[9px]">
                      <ExternalLink className="w-2 h-2 mr-1" /> LIVE
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
