// In-memory habit storage
let habits: any[] = [];
let nextId = 1;

export interface Habit {
  id: number;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  color: string;
  createdAt: string;
  completions: string[]; // ISO date strings
}

export function getAllHabits(): Habit[] {
  return habits;
}

export function getHabit(id: number): Habit | undefined {
  return habits.find(h => h.id === id);
}

export function createHabit(data: Omit<Habit, 'id' | 'createdAt' | 'completions'>): Habit {
  const habit: Habit = {
    ...data,
    id: nextId++,
    createdAt: new Date().toISOString(),
    completions: []
  };
  habits.push(habit);
  return habit;
}

export function updateHabit(id: number, data: Partial<Habit>): Habit | undefined {
  const habit = getHabit(id);
  if (habit) {
    Object.assign(habit, data, { id, createdAt: habit.createdAt });
  }
  return habit;
}

export function deleteHabit(id: number): boolean {
  const index = habits.findIndex(h => h.id === id);
  if (index >= 0) {
    habits.splice(index, 1);
    return true;
  }
  return false;
}

export function logHabitCompletion(id: number, date: string): Habit | undefined {
  const habit = getHabit(id);
  if (habit && !habit.completions.includes(date)) {
    habit.completions.push(date);
  }
  return habit;
}

export function removeHabitCompletion(id: number, date: string): Habit | undefined {
  const habit = getHabit(id);
  if (habit) {
    const index = habit.completions.indexOf(date);
    if (index >= 0) {
      habit.completions.splice(index, 1);
    }
  }
  return habit;
}
