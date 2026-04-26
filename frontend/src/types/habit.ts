export interface Habit {
  id: number;
  name: string;
  description: string;
  action: string;
  cue: string;
  identity: string;
  reminderTime?: string;
  reminderMessage?: string;
  frequency: 'daily' | 'weekly';
  weekDays?: number[]; // 0=Sun..6=Sat for weekly habits
  color: string;
  emoji: string;
  createdAt: string;
  completions: string[]; // ISO date strings YYYY-MM-DD
  archived: boolean;
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number; // 0-100
  weeklyData: { day: string; completed: boolean }[];
  monthlyData: { date: string; completed: boolean }[];
}

export type Theme = 'light' | 'dark';

export type TabId = 'today' | 'calendar' | 'stats' | 'settings';

export interface SelfSabotageEntry {
  id: number;
  date: string; // YYYY-MM-DD
  trigger: string;
  pattern: string;
  intensity: number; // 1-10
  resetAction: string;
}

export interface BusinessMilestone {
  id: number;
  title: string;
  targetDate: string; // YYYY-MM-DD
  linkedHabitId?: number;
  status: 'planned' | 'completed';
  createdAt: string;
  completedAt?: string;
}

export interface WeeklyCEOReview {
  weekStart: string; // YYYY-MM-DD (Monday)
  salesExecution: number;
  leadGeneration: number;
  deepWork: number;
  delivery: number;
  mindset: number;
  notes: string;
}

export function buildHabitStatement(action: string, cue: string, identity: string): string {
  return `I will ${action.trim()}, ${cue.trim()} so that I can become ${identity.trim()} I want to be.`;
}
