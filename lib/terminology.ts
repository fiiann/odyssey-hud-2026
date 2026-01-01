/**
 * Odyssey HUD - Dual Terminology System
 *
 * This file provides two distinct terminology modes:
 * - PROFESSIONAL: Clean, Jira/Asana-style terminology for workplace environments
 * - ODYSSEY: Immersive RPG-style terminology for gamified experience
 *
 * Usage:
 *   const t = useTerminology(mode);
 *   <Button>{t.createTask}</Button> // "Create Task" or "Accept Mission"
 */

export type TerminologyMode = 'PROFESSIONAL' | 'ODYSSEY';

/**
 * Complete terminology mappings for both modes
 */
export const TERMINOLOGY = {
  PROFESSIONAL: {
    // Core Entities
    project: 'Project',
    projects: 'Projects',
    task: 'Task',
    tasks: 'Tasks',
    timeEntry: 'Time Entry',
    timeEntries: 'Time Entries',
    mission: 'Time Entry', // Alias for timeEntry
    missions: 'Time Entries',
    user: 'User',
    level: 'Level',
    xp: 'Experience Points',
    architect: 'User',

    // Status Labels
    status: {
      TODO: 'To Do',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
    },

    // Priority Labels
    priority: {
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
      URGENT: 'Critical',
    },

    // Categories
    category: {
      Backend: 'Backend',
      Frontend: 'Frontend',
      Mobile: 'Mobile',
      DevOps: 'DevOps',
      Design: 'Design',
      Testing: 'QA',
      Documentation: 'Docs',
      Other: 'Other',
    },

    // UI Labels - Actions
    createTask: 'Create Task',
    editTask: 'Edit Task',
    deleteTask: 'Delete Task',
    startTask: 'Start Task',
    completeTask: 'Complete Task',
    logTime: 'Log Time',
    recordExecution: 'Log Time',
    viewStats: 'View Statistics',
    save: 'Save',
    cancel: 'Cancel',
    apply: 'Apply',
    close: 'Close',

    // UI Labels - Navigation
    dashboard: 'Dashboard',
    settings: 'Settings',
    search: 'Search',
    filter: 'Filter',

    // UI Labels - Views
    listView: 'List View',
    boardView: 'Board View',
    detailView: 'Detail View',

    // Messages & Feedback
    messages: {
      taskCreated: 'Task created successfully',
      taskUpdated: 'Task updated',
      taskDeleted: 'Task deleted',
      taskCompleted: 'Task completed',
      timeLogged: 'Time entry saved',
      levelUp: 'Level up!',
      achievementUnlocked: 'Achievement unlocked',
      errorOccurred: 'An error occurred',
    },

    // Empty States
    emptyStates: {
      noTasks: 'No tasks yet',
      allDone: 'All tasks completed',
      noProjects: 'No projects yet',
      noMissions: 'No time entries yet',
    },

    // Time Periods
    timePeriods: {
      today: 'Today',
      thisWeek: 'This week',
      thisMonth: 'This month',
      allTime: 'All time',
    },

    // Form Labels
    forms: {
      taskTitle: 'Task Title',
      description: 'Description',
      status: 'Status',
      priority: 'Priority',
      category: 'Category',
      estimatedTime: 'Estimated Time',
      actualTime: 'Actual Time',
      dueDate: 'Due Date',
      tags: 'Tags',
      project: 'Project',
      linkToTask: 'Link to Task (optional)',
    },

    // Stats Labels
    stats: {
      totalTasks: 'Total Tasks',
      completed: 'Completed',
      inProgress: 'In Progress',
      todo: 'To Do',
      estimatedTotal: 'Estimated Total',
      actualTotal: 'Actual Total',
      remaining: 'Remaining',
      variance: 'Variance',
      completionRate: 'Completion Rate',
    },
  },

  ODYSSEY: {
    // Core Entities
    project: 'Sector',
    projects: 'Sectors',
    task: 'Mission',
    tasks: 'Missions',
    timeEntry: 'Execution Log',
    timeEntries: 'Execution Logs',
    mission: 'Execution Log', // Alias for timeEntry
    missions: 'Execution Logs',
    user: 'Architect',
    level: 'Rank',
    xp: 'Execution Credits',
    architect: 'Architect',

    // Status Labels
    status: {
      TODO: 'Pending',
      IN_PROGRESS: 'Active',
      COMPLETED: 'Complete',
      CANCELLED: 'Aborted',
    },

    // Priority Labels (Rarity-themed)
    priority: {
      LOW: 'Common',
      MEDIUM: 'Rare',
      HIGH: 'Epic',
      URGENT: 'Legendary',
    },

    // Categories
    category: {
      Backend: 'Backend Engineering',
      Frontend: 'Frontend Engineering',
      Mobile: 'Mobile Development',
      DevOps: 'Infrastructure',
      Design: 'Visual Design',
      Testing: 'Quality Assurance',
      Documentation: 'Knowledge Base',
      Other: 'Other Operations',
    },

    // UI Labels - Actions
    createTask: 'Accept Mission',
    editTask: 'Modify Mission',
    deleteTask: 'Abort Mission',
    startTask: 'Deploy to Sector',
    completeTask: 'Mission Accomplished',
    logTime: 'Record Execution',
    recordExecution: 'Record Execution',
    viewStats: 'Access Intel',
    save: 'Save Parameters',
    cancel: 'Abort',
    apply: 'Execute',
    close: 'Close Channel',

    // UI Labels - Navigation
    dashboard: 'War Room',
    settings: 'Command Center',
    search: 'Scan Database',
    filter: 'Filter Intel',

    // UI Labels - Views
    listView: 'Tactical View',
    boardView: 'Strategic View',
    detailView: 'Mission Intel',

    // Messages & Feedback
    messages: {
      taskCreated: 'Mission accepted, Architect',
      taskUpdated: 'Mission parameters updated',
      taskDeleted: 'Mission terminated',
      taskCompleted: 'Mission accomplished! Sector secured!',
      timeLogged: 'Execution recorded in archives',
      levelUp: 'Rank increased! Promotion earned!',
      achievementUnlocked: 'Badge acquired!',
      errorOccurred: 'System error detected',
    },

    // Empty States
    emptyStates: {
      noTasks: 'No active missions, Architect',
      allDone: 'All missions accomplished! Sector secured!',
      noProjects: 'No sectors established',
      noMissions: 'No executions recorded',
    },

    // Time Periods
    timePeriods: {
      today: 'Current cycle',
      thisWeek: 'Current phase',
      thisMonth: 'Current quarter',
      allTime: 'Total tours of duty',
    },

    // Form Labels
    forms: {
      taskTitle: 'Mission Objective',
      description: 'Mission Brief',
      status: 'Status',
      priority: 'Priority Class',
      category: 'Division',
      estimatedTime: 'Estimated Duration',
      actualTime: 'Actual Duration',
      dueDate: 'Deadline',
      tags: 'Tags',
      project: 'Sector',
      linkToTask: 'Link to Mission (optional)',
    },

    // Stats Labels
    stats: {
      totalTasks: 'Total Missions',
      completed: 'Accomplished',
      inProgress: 'Active',
      todo: 'Pending',
      estimatedTotal: 'Estimated Total',
      actualTotal: 'Actual Total',
      remaining: 'Remaining',
      variance: 'Variance',
      completionRate: 'Success Rate',
    },
  },
} as const;

/**
 * Hook to access terminology based on mode
 *
 * @param mode - The terminology mode to use
 * @returns Terminology object for the specified mode
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [mode, setMode] = useState<TerminologyMode>('PROFESSIONAL');
 *   const t = useTerminology(mode);
 *
 *   return <Button>{t.createTask}</Button>;
 * }
 * ```
 */
export function useTerminology(mode: TerminologyMode = 'PROFESSIONAL') {
  return TERMINOLOGY[mode];
}

/**
 * Get terminology for a specific mode (utility function)
 *
 * @param mode - The terminology mode
 * @returns Terminology object
 */
export function getTerminology(mode: TerminologyMode) {
  return TERMINOLOGY[mode];
}

/**
 * Type-safe terminology keys
 */
export type TerminologyKey = keyof typeof TERMINOLOGY.PROFESSIONAL;
export type StatusKey = keyof typeof TERMINOLOGY.PROFESSIONAL.status;
export type PriorityKey = keyof typeof TERMINOLOGY.PROFESSIONAL.priority;
export type CategoryKey = keyof typeof TERMINOLOGY.PROFESSIONAL.category;
