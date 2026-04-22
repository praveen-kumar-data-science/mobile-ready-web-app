// In-memory habit storage
let habits: any[] = [];
let nextId = 1;

export interface Habit {
  id: number;
  name: string;
  description: string;
  action: string;
  cue: string;
  identity: string;
  frequency: 'daily' | 'weekly';
  color: string;
  emoji: string;
  archived: boolean;
  createdAt: string;
  completions: string[];
}

export function getAllHabits(): Habit[] {
  return habits.filter(h => !h.archived);
}

export function getHabit(id: number): Habit | undefined {
  return habits.find(h => h.id === id);
}

export function createHabit(data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>): Habit {
  const habit: Habit = {
    ...data,
    emoji: data.emoji ?? '🎯',
    id: nextId++,
    createdAt: new Date().toISOString(),
    completions: [],
    archived: false,
  };
  habits.push(habit);
  return habit;
}

export function updateHabit(id: number, data: Partial<Habit>): Habit | undefined {
  const habit = getHabit(id);
  if (habit) Object.assign(habit, data, { id, createdAt: habit.createdAt });
  return habit;
}

export function deleteHabit(id: number): boolean {
  const index = habits.findIndex(h => h.id === id);
  if (index >= 0) { habits.splice(index, 1); return true; }
  return false;
}

export function logHabitCompletion(id: number, date: string): Habit | undefined {
  const habit = getHabit(id);
  if (habit && !habit.completions.includes(date)) habit.completions.push(date);
  return habit;
}

export function removeHabitCompletion(id: number, date: string): Habit | undefined {
  const habit = getHabit(id);
  if (habit) {
    const idx = habit.completions.indexOf(date);
    if (idx >= 0) habit.completions.splice(idx, 1);
  }
  return habit;
}
