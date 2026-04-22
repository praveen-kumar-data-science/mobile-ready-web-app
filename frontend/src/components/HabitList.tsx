import React from 'react';
import { Habit } from '../types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggleCompletion: (habitId: number) => void;
  onDeleteHabit: (habitId: number) => void;
  selectedDate: string;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleCompletion,
  onDeleteHabit,
  selectedDate
}) => {
  if (habits.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: '#999'
        }}
      >
        <p>No habits yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isCompleted={habit.completions.includes(selectedDate)}
          onToggle={() => onToggleCompletion(habit.id)}
          onDelete={() => onDeleteHabit(habit.id)}
        />
      ))}
    </div>
  );
};

export default HabitList;
