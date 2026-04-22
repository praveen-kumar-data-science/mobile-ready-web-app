import React, { useState } from 'react';
import { Flame, Check, Trash2 } from 'lucide-react';
import { Habit, buildHabitStatement } from '../types/habit';
import { computeStats } from '../services/habitAPI';

interface HabitRowProps {
  habit: Habit;
  today: string;
  onToggle: () => void;
  onDelete: () => void;
}

const HabitRow: React.FC<HabitRowProps> = ({ habit, today, onToggle, onDelete }) => {
  const done = habit.completions.includes(today);
  const stats = computeStats(habit);
  const [popping, setPopping] = useState(false);
  const habitStatement = habit.action && habit.cue && habit.identity
    ? buildHabitStatement(habit.action, habit.cue, habit.identity)
    : habit.description;

  const handleToggle = () => {
    if (!done) {
      setPopping(true);
      setTimeout(() => setPopping(false), 300);
    }
    onToggle();
  };

  return (
    <div className={`habit-row ${done ? 'completed' : ''}`} onClick={handleToggle}>
      <div className="habit-emoji" style={{ background: habit.color + '22' }}>
        {habit.emoji}
      </div>
      <div className="habit-info">
        <div className="habit-name">{habit.name}</div>
        <div className="habit-meta">{habitStatement}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          {stats.currentStreak > 0 && (
            <span className="streak-badge">
              <Flame size={11} /> {stats.currentStreak}d
            </span>
          )}
          <div className="week-dots">
            {stats.weeklyData.map((w, i) => (
              <div key={i} className={`week-dot ${w.completed ? 'done' : ''}`} />
            ))}
          </div>
        </div>
      </div>
      <div className={`habit-check ${popping ? 'pop' : ''}`}>
        {done && <Check size={16} color="white" strokeWidth={3} />}
      </div>
      <button
        onClick={e => { e.stopPropagation(); onDelete(); }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 4 }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default HabitRow;
