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

export function buildHabitStatement(action: string, cue: string, identity: string): string {
  return `I will ${action.trim()}, ${cue.trim()} so that I can become ${identity.trim()} I want to be.`;
}
