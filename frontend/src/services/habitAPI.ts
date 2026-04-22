import { Habit, HabitStats } from '../types/habit';

const API_BASE = '/api';
const STORAGE_KEY = 'leader-habits';

function hasBrowserStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readLocalHabits(): Habit[] {
  if (!hasBrowserStorage()) return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Habit[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalHabits(habits: Habit[]): void {
  if (!hasBrowserStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function nextLocalHabitId(habits: Habit[]): number {
  return habits.reduce((maxId, habit) => Math.max(maxId, habit.id), 0) + 1;
}

function withLocalFallback<T>(remote: () => Promise<T>, local: () => T | Promise<T>): Promise<T> {
  return remote().catch(() => Promise.resolve(local()));
}

export const habitAPI = {
  async getAllHabits(): Promise<Habit[]> {
    return withLocalFallback(
      async () => {
        const res = await fetch(`${API_BASE}/habits`);
        if (!res.ok) throw new Error('Failed to fetch habits');
        return res.json();
      },
      () => readLocalHabits().filter(habit => !habit.archived)
    );
  },
  async createHabit(data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>): Promise<Habit> {
    return withLocalFallback(
      async () => {
        const res = await fetch(`${API_BASE}/habits`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create habit');
        return res.json();
      },
      () => {
        const habits = readLocalHabits();
        const habit: Habit = {
          ...data,
          id: nextLocalHabitId(habits),
          createdAt: new Date().toISOString(),
          completions: [],
          archived: false,
        };
        writeLocalHabits([...habits, habit]);
        return habit;
      }
    );
  },
  async updateHabit(id: number, data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>): Promise<Habit> {
    return withLocalFallback(
      async () => {
        const res = await fetch(`${API_BASE}/habits/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update habit');
        return res.json();
      },
      () => {
        const habits = readLocalHabits();
        const existing = habits.find(habit => habit.id === id);
        if (!existing) throw new Error('Failed to update habit');
        const updated: Habit = {
          ...existing,
          ...data,
          id,
          createdAt: existing.createdAt,
          completions: existing.completions,
          archived: existing.archived,
        };
        writeLocalHabits(habits.map(habit => habit.id === id ? updated : habit));
        return updated;
      }
    );
  },
  async deleteHabit(id: number): Promise<void> {
    return withLocalFallback(
      async () => {
        const res = await fetch(`${API_BASE}/habits/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete habit');
      },
      () => {
        writeLocalHabits(readLocalHabits().filter(habit => habit.id !== id));
      }
    );
  },
  async logCompletion(id: number, date: string): Promise<Habit> {
    return withLocalFallback(
      async () => {
        const res = await fetch(`${API_BASE}/habits/${id}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date }),
        });
        if (!res.ok) throw new Error('Failed to log completion');
        return res.json();
      },
      () => {
        const habits = readLocalHabits();
        const existing = habits.find(habit => habit.id === id);
        if (!existing) throw new Error('Failed to log completion');
        const updated: Habit = {
          ...existing,
          completions: existing.completions.includes(date) ? existing.completions : [...existing.completions, date],
        };
        writeLocalHabits(habits.map(habit => habit.id === id ? updated : habit));
        return updated;
      }
    );
  },
  async removeCompletion(id: number, date: string): Promise<Habit> {
    return withLocalFallback(
      async () => {
        const res = await fetch(`${API_BASE}/habits/${id}/complete`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date }),
        });
        if (!res.ok) throw new Error('Failed to remove completion');
        return res.json();
      },
      () => {
        const habits = readLocalHabits();
        const existing = habits.find(habit => habit.id === id);
        if (!existing) throw new Error('Failed to remove completion');
        const updated: Habit = {
          ...existing,
          completions: existing.completions.filter(completion => completion !== date),
        };
        writeLocalHabits(habits.map(habit => habit.id === id ? updated : habit));
        return updated;
      }
    );
  },
};

export function computeStats(habit: Habit): HabitStats {
  const completions = [...habit.completions].sort();
  const today = new Date();

  let currentStreak = 0;
  const check = new Date(today);
  while (true) {
    const d = check.toISOString().split('T')[0];
    if (completions.includes(d)) {
      currentStreak++;
      check.setDate(check.getDate() - 1);
    } else break;
  }

  let longestStreak = 0;
  let running = 0;
  for (let i = 0; i < completions.length; i++) {
    if (i === 0) { running = 1; }
    else {
      const prev = new Date(completions[i - 1]);
      const curr = new Date(completions[i]);
      const diff = (curr.getTime() - prev.getTime()) / 86400000;
      running = diff === 1 ? running + 1 : 1;
    }
    if (running > longestStreak) longestStreak = running;
  }

  let completed30 = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (completions.includes(d.toISOString().split('T')[0])) completed30++;
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return { day: dayLabels[d.getDay()], completed: completions.includes(d.toISOString().split('T')[0]) };
  });

  const monthlyData = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    const date = d.toISOString().split('T')[0];
    return { date, completed: completions.includes(date) };
  });

  return {
    currentStreak,
    longestStreak,
    totalCompletions: completions.length,
    completionRate: Math.round((completed30 / 30) * 100),
    weeklyData,
    monthlyData,
  };
}
