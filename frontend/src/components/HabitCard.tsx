import React from 'react';
import { Habit } from '../types/habit';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, isCompleted, onToggle, onDelete }) => {
  const streak = calculateStreak(habit.completions);
  
  return (
    <div
      style={{
        border: `2px solid ${habit.color}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>
          {habit.name}
        </h3>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
          {habit.description}
        </p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#999' }}>
          <span>{habit.frequency === 'daily' ? 'Daily' : 'Weekly'}</span>
          <span>Streak: {streak} days</span>
        </div>
      </div>
      <button
        onClick={onDelete}
        style={{
          padding: '6px 12px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
};

function calculateStreak(completions: string[]): number {
  if (completions.length === 0) return 0;
  
  const sorted = [...completions].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  
  let streak = 0;
  let checkDate = today;
  
  for (const completion of sorted) {
    if (completion === checkDate) {
      streak++;
      const prevDate = new Date(checkDate);
      prevDate.setDate(prevDate.getDate() - 1);
      checkDate = prevDate.toISOString().split('T')[0];
    } else {
      break;
    }
  }
  
  return streak;
}

export default HabitCard;
