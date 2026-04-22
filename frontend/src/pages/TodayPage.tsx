import React from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Habit } from '../types/habit';
import HabitRow from '../components/HabitRow';

interface TodayPageProps {
  habits: Habit[];
  onToggle: (id: number) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

const TodayPage: React.FC<TodayPageProps> = ({ habits, onToggle, onEdit, onDelete, onAdd }) => {
  const [dateOffset, setDateOffset] = React.useState(0);

  const selectedDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + dateOffset);
    return d.toISOString().split('T')[0];
  }, [dateOffset]);

  const formatDate = (d: string) => {
    const date = new Date(d + 'T12:00:00');
    if (dateOffset === 0) return 'Today';
    if (dateOffset === -1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const completed = habits.filter(h => h.completions.includes(selectedDate)).length;
  const total = habits.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning 🌅';
    if (h < 17) return 'Good afternoon ☀️';
    return 'Good evening 🌙';
  };

  return (
    <div>
      <div className="page-header">
        <h1>{greeting()}</h1>
        <p style={{ color: 'var(--text2)', marginTop: 2, fontSize: 15 }}>
          {completed}/{total} habits done
        </p>
      </div>

      {/* Date nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 12px' }}>
        <button
          onClick={() => setDateOffset(o => o - 1)}
          style={{ background: 'var(--surface)', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', color: 'var(--text2)' }}
        >
          <ChevronLeft size={18} />
        </button>
        <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{formatDate(selectedDate)}</span>
        <button
          onClick={() => setDateOffset(o => Math.min(o + 1, 0))}
          disabled={dateOffset === 0}
          style={{ background: 'var(--surface)', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: dateOffset === 0 ? 'default' : 'pointer', color: dateOffset === 0 ? 'var(--border)' : 'var(--text2)' }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Progress */}
      {total > 0 && (
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Progress</span>
            <span style={{ fontWeight: 600, color: pct === 100 ? 'var(--green)' : 'var(--accent)' }}>{pct}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* Completion banner */}
      {total > 0 && pct === 100 && (
        <div className="banner">
          <h2>All done! 🎉</h2>
          <p>You've completed all your habits today. Amazing work!</p>
        </div>
      )}

      {/* Habits */}
      {habits.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🌱</div>
          <h3>No habits yet</h3>
          <p>Tap the + button to add your first habit and start building a better routine.</p>
        </div>
      ) : (
        <>
          <div className="section-title">MY HABITS</div>
          {habits.map(h => (
            <HabitRow
              key={h.id}
              habit={h}
              today={selectedDate}
              onToggle={() => onToggle(h.id)}
              onEdit={() => onEdit(h)}
              onDelete={() => onDelete(h.id)}
            />
          ))}
        </>
      )}

      <button className="fab" onClick={onAdd}>
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default TodayPage;
