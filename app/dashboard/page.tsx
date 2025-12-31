'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { useQuests } from '@/hooks/use-quests';
import { useBosses } from '@/hooks/use-bosses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { CATEGORIES, QUARTERS, STATUS_CONFIG, MOCK_CREDENTIALS } from '@/lib/constants';
import { getCategoryStats, formatDuration, getRelativeTime, getXpProgress } from '@/lib/calculations';
import { questSchema, QuestFormValues } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Shield,
  Layout,
  Smartphone,
  Server,
  LogOut,
  Sword,
  ScrollText,
  Skull,
  Plus,
  Trash2,
  ExternalLink,
  Pencil,
  Loader2,
  Flame,
  Lock,
  Check,
  X,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading, levelUpModal } = useProfile();
  const { quests, isLoading: questsLoading, createQuest, deleteQuest } = useQuests();
  const { bosses, isLoading: bossesLoading, getActiveBoss, updateBoss } = useBosses();

  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [bossModalOpen, setBossModalOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState<any>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const {
    register: registerQuest,
    handleSubmit: handleSubmitQuest,
    formState: { errors: questErrors, isSubmitting: questSubmitting },
    reset: resetQuest,
  } = useForm<QuestFormValues>({
    resolver: zodResolver(questSchema),
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

  const handleCreateQuest = async (data: QuestFormValues) => {
    const result = await createQuest({
      title: data.title,
      description: data.description,
      durationMin: data.duration_min,
      category: data.category,
    });
    if (result.success) {
      setQuestModalOpen(false);
      resetQuest();
    }
  };

  const handleDeleteQuest = async (questId: string) => {
    if (confirm('Are you sure you want to delete this quest?')) {
      await deleteQuest(questId);
    }
  };

  const handleUpdateBoss = async (bossId: string, updates: any) => {
    await updateBoss(bossId, updates);
    setBossModalOpen(false);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      BACKEND: Shield,
      FRONTEND: Layout,
      MOBILE: Smartphone,
      DEVOPS: Server,
    };
    return icons[category] || Shield;
  };

  const getCategoryColorClass = (category: string) => {
    const colors: Record<string, string> = {
      BACKEND: 'text-blue-500',
      FRONTEND: 'text-purple-500',
      MOBILE: 'text-pink-500',
      DEVOPS: 'text-amber-500',
    };
    return colors[category] || 'text-gray-500';
  };

  const getCategoryBgClass = (category: string) => {
    const colors: Record<string, string> = {
      BACKEND: 'bg-blue-500/10 border-blue-500/20',
      FRONTEND: 'bg-purple-500/10 border-purple-500/20',
      MOBILE: 'bg-pink-500/10 border-pink-500/20',
      DEVOPS: 'bg-amber-500/10 border-amber-500/20',
    };
    return colors[category] || 'bg-gray-500/10';
  };

  const activeBoss = getActiveBoss();
  const categoryStats = getCategoryStats(quests);
  const xpProgress = profile ? getXpProgress(profile.totalXp) : null;

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Sword className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Odyssey HUD 2026</h1>
                <p className="text-xs text-muted-foreground">Architect's Command Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{profile.username}</p>
                <p className="text-xs text-muted-foreground">Rank {profile.currentLevel}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto space-y-8 p-4 md:p-8">
        {/* Profile Header */}
        <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20">
                  <img src={profile.avatarUrl} alt={profile.username} className="h-full w-full object-cover" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{profile.username}</CardTitle>
                  <CardDescription>Rank {profile.currentLevel} Architect</CardDescription>
                </div>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                Rank {profile.currentLevel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Execution Credits (XP)</span>
                <span className="font-mono font-bold">{profile.totalXp} mins shipped</span>
              </div>
              <Progress value={xpProgress?.progressPercent || 0} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress to Rank {profile.currentLevel + 1}</span>
                <span className="font-mono text-muted-foreground">
                  {xpProgress?.xpToNextLevel} mins to next rank
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stat Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categoryStats.map((stat) => {
            const Icon = getCategoryIcon(stat.category);
            const categoryData = CATEGORIES[stat.category as keyof typeof CATEGORIES];
            return (
              <Card key={stat.category} className="border-l-4" style={{ borderLeftColor: stat.color === 'blue' ? '#3b82f6' : stat.color === 'purple' ? '#a855f7' : stat.color === 'pink' ? '#ec4899' : '#f59e0b' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${getCategoryBgClass(stat.category)}`}>
                      <Icon className={`h-5 w-5 ${getCategoryColorClass(stat.category)}`} />
                    </div>
                    <span className="text-2xl font-bold font-mono">{stat.totalMinutes}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">{categoryData.label}</CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stat.percentage.toFixed(1)}%</span>
                    <Progress value={stat.percentage} className="h-2 w-20" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Quest Log */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ScrollText className="h-5 w-5" />
                    Mission Log
                  </CardTitle>
                  <CardDescription>Track your daily building adventures</CardDescription>
                </div>
                <Button size="sm" onClick={() => setQuestModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Log Action
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {questsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
                  ))}
                </div>
              ) : quests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ScrollText className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No missions logged yet</p>
                  <p className="text-sm text-muted-foreground">Start your streak by logging your first build action!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quests.slice(0, 10).map((quest) => {
                    const Icon = getCategoryIcon(quest.category);
                    return (
                      <div
                        key={quest.questId}
                        className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${getCategoryBgClass(quest.category)}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={`h-4 w-4 ${getCategoryColorClass(quest.category)}`} />
                              <h4 className="font-semibold">{quest.title}</h4>
                            </div>
                            {quest.description && (
                              <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                            )}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {quest.category}
                              </Badge>
                              <span>{formatDuration(quest.durationMin)}</span>
                              <span>{getRelativeTime(quest.createdAt)}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteQuest(quest.questId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Boss Tracker */}
          <div className="space-y-6">
            {/* Active Boss */}
            {activeBoss ? (
              <Card className="border-primary/50 bg-gradient-to-br from-card to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skull className="h-6 w-6 text-primary" />
                      <CardTitle>Active Boss</CardTitle>
                    </div>
                    <Badge variant="default" className="gap-1">
                      <Flame className="h-3 w-3" />
                      {STATUS_CONFIG[activeBoss.status].label}
                    </Badge>
                  </div>
                  <CardDescription>
                    Q{activeBoss.quarter} 2026 Main Quest
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{activeBoss.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quarter {activeBoss.quarter} • {QUARTERS[activeBoss.quarter - 1].months}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Boss Health</span>
                        <span className="text-2xl font-bold font-mono">{activeBoss.progress}%</span>
                      </div>
                      <Progress value={activeBoss.progress} className="h-4" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => {
                        setSelectedBoss(activeBoss);
                        setBossModalOpen(true);
                      }}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {activeBoss.repoUrl && (
                        <Button variant="outline">
                          <a href={activeBoss.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {activeBoss.deployUrl && (
                        <Button variant="outline">
                          <a href={activeBoss.deployUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Skull className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No active boss</p>
                  <p className="text-sm text-muted-foreground">Create a quarterly boss to track!</p>
                </CardContent>
              </Card>
            )}

            {/* Boss History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Skull className="h-5 w-5" />
                  Boss History
                </CardTitle>
                <CardDescription>Your conquered bosses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  <Button
                    size="sm"
                    variant={selectedQuarter === null ? "default" : "outline"}
                    onClick={() => setSelectedQuarter(null)}
                  >
                    All
                  </Button>
                  {QUARTERS.map((q) => (
                    <Button
                      key={q.value}
                      size="sm"
                      variant={selectedQuarter === q.value ? "default" : "outline"}
                      onClick={() => setSelectedQuarter(q.value)}
                    >
                      {q.label}
                    </Button>
                  ))}
                </div>
                {bossesLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bosses
                      .filter((b) => selectedQuarter === null || b.quarter === selectedQuarter)
                      .filter((b) => b.bossId !== activeBoss?.bossId)
                      .slice(0, 5)
                      .map((boss) => {
                        const StatusIcon = STATUS_CONFIG[boss.status].icon === 'Check' ? Check :
                          STATUS_CONFIG[boss.status].icon === 'X' ? X :
                            STATUS_CONFIG[boss.status].icon === 'Lock' ? Lock : Flame;
                        return (
                          <div
                            key={boss.bossId}
                            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{boss.title}</h4>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  Q{boss.quarter}
                                </Badge>
                                <span>{boss.progress}%</span>
                              </div>
                            </div>
                            <Badge
                              variant={boss.status === 'COMPLETED' ? 'success' :
                                boss.status === 'FAILED' ? 'destructive' : 'secondary'}
                              className="gap-1"
                            >
                              <StatusIcon className="h-3 w-3" />
                              {STATUS_CONFIG[boss.status].label}
                            </Badge>
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

      {/* Quest Modal */}
      <Dialog open={questModalOpen} onOpenChange={setQuestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log New Mission</DialogTitle>
            <DialogDescription>Record your building progress</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitQuest(handleCreateQuest)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task *</Label>
                <Input id="title" placeholder="What did you build or fix?" {...registerQuest('title')} />
                {questErrors.title && (
                  <p className="text-sm text-destructive">{questErrors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add more details..."
                  {...registerQuest('description')}
                />
                {questErrors.description && (
                  <p className="text-sm text-destructive">{questErrors.description.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration_min">Duration (minutes) *</Label>
                  <Input
                    id="duration_min"
                    type="number"
                    placeholder="60"
                    {...registerQuest('duration_min', { valueAsNumber: true })}
                  />
                  {questErrors.duration_min && (
                    <p className="text-sm text-destructive">{questErrors.duration_min.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    {...registerQuest('category')}
                  >
                    <option value="">Select...</option>
                    <option value="BACKEND">Backend</option>
                    <option value="FRONTEND">Frontend</option>
                    <option value="MOBILE">Mobile</option>
                    <option value="DEVOPS">DevOps</option>
                  </select>
                  {questErrors.category && (
                    <p className="text-sm text-destructive">{questErrors.category.message}</p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setQuestModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={questSubmitting}>
                {questSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                Deploy Record
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Boss Edit Modal */}
      <Dialog open={bossModalOpen} onOpenChange={setBossModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Boss</DialogTitle>
            <DialogDescription>Update boss progress and status</DialogDescription>
          </DialogHeader>
          {selectedBoss && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateBoss(selectedBoss.bossId, {
                progress: parseInt(formData.get('progress') as string) || 0,
                status: formData.get('status') as any,
              });
            }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress ({selectedBoss.progress}%)</Label>
                  <Input
                    id="progress"
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={selectedBoss.progress}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    defaultValue={selectedBoss.status}
                  >
                    <option value="LOCKED">Locked</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setBossModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Boss</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Level Up Modal */}
      {levelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center animate-in zoom-in-95 duration-300">
            <div className="text-6xl font-bold text-primary mb-4 tracking-tighter">RANK PROMOTED!</div>
            <div className="text-4xl font-bold mb-8">Rank {profile.currentLevel}</div>
            <div className="text-xl text-muted-foreground">Outstanding architectural delivery, {profile.username}!</div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}
