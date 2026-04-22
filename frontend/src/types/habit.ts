export interface Habit {
  id: number;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  color: string;
  createdAt: string;
  completions: string[]; // ISO date strings
}

export interface HabitStats {
  totalDays: number;
  completedDays: number;
  currentStreak: number;
}
