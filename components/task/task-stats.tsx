'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useTerminology } from '@/lib/terminology';
import { TASK_STATUS, TASK_PRIORITY } from '@/lib/constants';
import { Circle, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TaskStatsProps {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  estimatedTotal: number;
  actualTotal: number;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

export function TaskStats({
  total,
  todo,
  inProgress,
  completed,
  cancelled,
  estimatedTotal,
  actualTotal,
  mode = 'PROFESSIONAL'
}: TaskStatsProps) {
  const t = useTerminology(mode);

  // Calculate variance percentage
  const variance = estimatedTotal > 0 ? ((actualTotal - estimatedTotal) / estimatedTotal) * 100 : 0;
  const remaining = estimatedTotal - actualTotal;

  // Variance color
  const getVarianceColor = () => {
    const absVariance = Math.abs(variance);
    if (absVariance <= 20) return 'text-green-500';
    if (absVariance <= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Tasks */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.stats.totalTasks}
              </p>
              <p className="text-2xl font-bold mt-1">{total}</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Circle className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* To Do / Pending */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.stats.todo}
              </p>
              <p className="text-2xl font-bold mt-1">{todo}</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gray-500/20 flex items-center justify-center">
              <Circle className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In Progress / Active */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.stats.inProgress}
              </p>
              <p className="text-2xl font-bold mt-1">{inProgress}</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completed */}
      <Card className="border-white/5 bg-[#121214]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {t.stats.completed}
              </p>
              <p className="text-2xl font-bold mt-1">{completed}</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Stats - Full Width */}
      <div className="md:col-span-2 lg:col-span-4 grid gap-4 md:grid-cols-3">
        {/* Estimated Total */}
        <Card className="border-white/5 bg-[#121214]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  {t.stats.estimatedTotal}
                </p>
                <p className="text-xl font-bold mt-1">{formatMinutes(estimatedTotal)}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actual Total */}
        <Card className="border-white/5 bg-[#121214]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  {t.stats.actualTotal}
                </p>
                <p className="text-xl font-bold mt-1">{formatMinutes(actualTotal)}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variance */}
        <Card className="border-white/5 bg-[#121214]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  {t.stats.variance}
                </p>
                <p className={`text-xl font-bold mt-1 ${getVarianceColor()}`}>
                  {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {remaining > 0 ? `${formatMinutes(Math.abs(remaining))} left` : 'Done'}
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gray-500/20 flex items-center justify-center ml-2">
                {Math.abs(variance) <= 20 ? (
                  <Minus className="h-5 w-5 text-green-500" />
                ) : variance > 0 ? (
                  <TrendingUp className="h-5 w-5 text-yellow-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
