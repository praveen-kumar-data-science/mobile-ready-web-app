export interface Habit {
  id: number;
  name: string;
  description: string;
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
