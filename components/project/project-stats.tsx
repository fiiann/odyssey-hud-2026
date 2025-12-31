'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ExternalLink, Rocket, Pencil, Trash2 } from 'lucide-react';
import { Project } from '@/lib/types';
import { formatDuration } from '@/lib/calculations';
import { PROJECT_STATUS } from '@/lib/constants';

interface ProjectHeaderProps {
  project: Project;
  totalMissions: number;
  totalDuration: number;
  avgDuration: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectHeader({ project, totalMissions, totalDuration, avgDuration, onEdit, onDelete }: ProjectHeaderProps) {
  const statusInfo = PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS];

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</a>
        <span>/</span>
        <a href="/projects" className="hover:text-foreground transition-colors">Sectors</a>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px]">{project.title}</span>
      </div>

      {/* Title and Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl font-black tracking-tighter">{project.title}</h1>
            <Badge variant="outline" className={`bg-${statusInfo.color}-500/10 text-${statusInfo.color}-500 border-${statusInfo.color}-500/20`}>
              {statusInfo.label}
            </Badge>
          </div>
          {project.description && (
            <p className="text-muted-foreground max-w-2xl">{project.description}</p>
          )}
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Initiated on {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Sector Progress
            </span>
            <span className="text-2xl font-black text-primary font-mono">{project.progress}%</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
            <div
              className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Links Section */}
      {(project.repoUrl || project.deployUrl) && (
        <div className="flex items-center gap-3">
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Repository
              </a>
            </Button>
          )}
          {project.deployUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Rocket className="w-4 h-4" />
                Live Deployment
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
