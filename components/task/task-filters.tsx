'use client';

import { useState } from 'react';
import { TaskStatus, TaskPriority } from '@/lib/types';
import { useTerminology } from '@/lib/terminology';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TaskFilters {
  status: TaskStatus[];
  priority: TaskPriority[];
  category: string[];
  search: string;
}

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  mode?: 'PROFESSIONAL' | 'ODYSSEY';
}

export function TaskFilters({ filters, onFiltersChange, mode = 'PROFESSIONAL' }: TaskFiltersProps) {
  const t = useTerminology(mode);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate active filter count
  const activeFilterCount =
    filters.status.length +
    filters.priority.length +
    filters.category.length +
    (filters.search.length > 0 ? 1 : 0);

  const allStatuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  const allPriorities: TaskPriority[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  const toggleStatus = (status: TaskStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const togglePriority = (priority: TaskPriority) => {
    const newPriority = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    onFiltersChange({ ...filters, priority: newPriority });
  };

  const toggleCategory = (category: string) => {
    const newCategory = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    onFiltersChange({ ...filters, category: newCategory });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      priority: [],
      category: [],
      search: ''
    });
  };

  const hasFilters = activeFilterCount > 0;

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "border-white/10 bg-white/5 hover:bg-white/10",
            hasFilters && "border-primary/50 bg-primary/10"
          )}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasFilters && (
            <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary text-xs">
              {activeFilterCount}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </Button>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Expandable Filter Panel */}
      {isExpanded && (
        <Card className="border-white/10 bg-[#121214]">
          <CardContent className="pt-6 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search by ${t.task.toLowerCase()} title...`}
                  value={filters.search}
                  onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {allStatuses.map((status) => (
                  <Button
                    key={status}
                    variant={filters.status.includes(status) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleStatus(status)}
                    className={cn(
                      "text-xs",
                      !filters.status.includes(status) && "border-white/10 bg-white/5"
                    )}
                  >
                    {t.status[status]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Priority Filters */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {allPriorities.map((priority) => (
                  <Button
                    key={priority}
                    variant={filters.priority.includes(priority) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => togglePriority(priority)}
                    className={cn(
                      "text-xs",
                      !filters.priority.includes(priority) && "border-white/10 bg-white/5"
                    )}
                  >
                    {t.priority[priority]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filters (if we had predefined categories) */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Category
              </label>
              <Input
                placeholder="Filter by category..."
                value={filters.category[0] || ''}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  onFiltersChange({
                    ...filters,
                    category: value ? [value] : []
                  });
                }}
                className="bg-white/5 border-white/10"
              />
              <p className="text-[10px] text-muted-foreground">
                Enter category name to filter
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
