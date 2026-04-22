import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Habit } from '../types/habit';

interface CalendarPageProps {
  habits: Habit[];
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarPage: React.FC<CalendarPageProps> = ({ habits }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(habits[0] || null);

  React.useEffect(() => {
    if (!selectedHabit && habits.length > 0) setSelectedHabit(habits[0]);
  }, [habits]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Build calendar cells
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const completions = selectedHabit?.completions ?? [];

  const isCompleted = (day: number) => {
    const d = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return completions.includes(d);
  };

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  // Calculate completion rate for this month
  let doneDays = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    if (isCompleted(d)) doneDays++;
  }
  const rate = Math.round((doneDays / daysInMonth) * 100);

  return (
    <div>
      <div className="page-header">
        <h1>Calendar</h1>
        <p>View your habit history</p>
      </div>

      {/* Habit selector */}
      {habits.length > 0 && (
        <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
          {habits.map(h => (
            <button
              key={h.id}
              onClick={() => setSelectedHabit(h)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px',
                borderRadius: 20,
                border: '2px solid',
                borderColor: selectedHabit?.id === h.id ? h.color : 'var(--border)',
                background: selectedHabit?.id === h.id ? h.color + '22' : 'var(--surface)',
                color: selectedHabit?.id === h.id ? h.color : 'var(--text2)',
                fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span>{h.emoji}</span> {h.name}
            </button>
          ))}
        </div>
      )}

      {habits.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📅</div>
          <h3>No habits yet</h3>
          <p>Add habits from the Today tab to see your history here.</p>
        </div>
      ) : (
        <>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 16px' }}>
            <button onClick={prevMonth} style={{ background: 'var(--surface)', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', color: 'var(--text2)' }}>
              <ChevronLeft size={18} />
            </button>
            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>{monthName}</span>
            <button onClick={nextMonth} style={{ background: 'var(--surface)', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', color: 'var(--text2)' }}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Month stat */}
          <div style={{ margin: '0 16px 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '14px 16px', boxShadow: 'var(--shadow)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>This month</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>{doneDays}/{daysInMonth} days</div>
            </div>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: `conic-gradient(${selectedHabit?.color ?? 'var(--accent)'} ${rate * 3.6}deg, var(--surface2) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                {rate}%
              </div>
            </div>
          </div>

          {/* Day labels */}
          <div className="heatmap-day-labels">
            {DAYS.map(d => <div key={d} className="heatmap-day-label">{d}</div>)}
          </div>

          {/* Calendar grid */}
          <div className="month-grid">
            {cells.map((day, i) => (
              <div
                key={i}
                className={`month-cell ${day === null ? 'empty' : ''} ${day && isCompleted(day) ? 'done' : ''} ${day && isToday(day) ? 'today' : ''}`}
                style={day && isCompleted(day) ? { background: selectedHabit?.color } : {}}
              >
                {day ?? ''}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 16px 0', fontSize: 12, color: 'var(--text2)' }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: selectedHabit?.color }} />
            <span>Completed</span>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--surface2)', marginLeft: 8 }} />
            <span>Not done</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarPage;
