import { Habit, HabitStats } from '../types/habit';

const API_BASE = '/api';

export const habitAPI = {
  async getAllHabits(): Promise<Habit[]> {
    const res = await fetch(`${API_BASE}/habits`);
    if (!res.ok) throw new Error('Failed to fetch habits');
    return res.json();
  },
  async createHabit(data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create habit');
    return res.json();
  },
  async updateHabit(id: number, data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update habit');
    return res.json();
  },
  async deleteHabit(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/habits/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete habit');
  },
  async logCompletion(id: number, date: string): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits/${id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date }),
    });
    if (!res.ok) throw new Error('Failed to log completion');
    return res.json();
  },
  async removeCompletion(id: number, date: string): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits/${id}/complete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date }),
    });
    if (!res.ok) throw new Error('Failed to remove completion');
    return res.json();
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
