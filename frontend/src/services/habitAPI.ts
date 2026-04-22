import { Habit } from '../types/habit';

const API_BASE = '/api';

export const habitAPI = {
  async getAllHabits(): Promise<Habit[]> {
    const res = await fetch(`${API_BASE}/habits`);
    if (!res.ok) throw new Error('Failed to fetch habits');
    return res.json();
  },

  async getHabit(id: number): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits/${id}`);
    if (!res.ok) throw new Error('Failed to fetch habit');
    return res.json();
  },

  async createHabit(data: Omit<Habit, 'id' | 'createdAt' | 'completions'>): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create habit');
    return res.json();
  },

  async updateHabit(id: number, data: Partial<Habit>): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
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
      body: JSON.stringify({ date })
    });
    if (!res.ok) throw new Error('Failed to log completion');
    return res.json();
  },

  async removeCompletion(id: number, date: string): Promise<Habit> {
    const res = await fetch(`${API_BASE}/habits/${id}/complete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    });
    if (!res.ok) throw new Error('Failed to remove completion');
    return res.json();
  }
};
