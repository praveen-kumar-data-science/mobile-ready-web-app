import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Flame, Trophy, CheckCircle, TrendingUp } from 'lucide-react';
import { Habit, SelfSabotageEntry, BusinessMilestone, WeeklyCEOReview } from '../types/habit';
import { computeStats } from '../services/habitAPI';

interface StatsPageProps {
  habits: Habit[];
  triggerEntries: SelfSabotageEntry[];
  milestones: BusinessMilestone[];
  latestReview: WeeklyCEOReview | null;
}

const StatsPage: React.FC<StatsPageProps> = ({ habits, triggerEntries, milestones, latestReview }) => {
  const [selected, setSelected] = useState<Habit | null>(habits[0] || null);

  React.useEffect(() => {
    if (!selected && habits.length > 0) setSelected(habits[0]);
  }, [habits]);

  if (habits.length === 0) {
    return (
      <div>
        <div className="page-header"><h1>Statistics</h1><p>Track your progress</p></div>
        <div className="empty-state">
          <div className="icon">📊</div>
          <h3>No data yet</h3>
          <p>Complete some habits to see your statistics here.</p>
        </div>
      </div>
    );
  }

  const stats = selected ? computeStats(selected) : null;

  // Overall stats across all habits
  const today = new Date().toISOString().split('T')[0];
  const totalToday = habits.filter(h => h.completions.includes(today)).length;
  const allStreaks = habits.map(h => computeStats(h).currentStreak);
  const bestStreak = Math.max(...habits.map(h => computeStats(h).longestStreak), 0);

  // Bar chart: last 7 days completion count
  const barData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const date = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1);
    const count = habits.filter(h => h.completions.includes(date)).length;
    return { label, count, date };
  });

  const triggerByDay = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const date = d.toISOString().split('T')[0];
    const count = triggerEntries.filter(e => e.date === date).length;
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1),
      date,
      count,
    };
  });

  const patternMap = triggerEntries.reduce<Record<string, number>>((acc, entry) => {
    const key = entry.pattern.toLowerCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const topPatterns = Object.entries(patternMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const milestoneRate = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  const ceoAverage = latestReview
    ? Math.round((latestReview.salesExecution + latestReview.leadGeneration + latestReview.deepWork + latestReview.delivery + latestReview.mindset) / 5)
    : null;

  return (
    <div>
      <div className="page-header">
        <h1>Statistics</h1>
        <p>Track your progress</p>
      </div>

      {/* Overall chips */}
      <div className="stat-chips">
        <div className="stat-chip">
          <div className="stat-chip-value" style={{ color: 'var(--green)' }}>{totalToday}/{habits.length}</div>
          <div className="stat-chip-label">Done Today</div>
        </div>
        <div className="stat-chip">
          <div className="stat-chip-value" style={{ color: 'var(--orange)' }}>{Math.max(...allStreaks, 0)}</div>
          <div className="stat-chip-label">Best Streak</div>
        </div>
        <div className="stat-chip">
          <div className="stat-chip-value" style={{ color: 'var(--accent)' }}>{bestStreak}</div>
          <div className="stat-chip-label">Longest Ever</div>
        </div>
      </div>

      {/* 7-day bar chart */}
      <div className="section-title">LAST 7 DAYS</div>
      <div className="chart-wrap" style={{ height: 180, paddingBottom: 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text2)' }} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text3)' }} domain={[0, habits.length]} />
            <Tooltip
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }}
              formatter={(v: any) => [`${v} habits`, 'Completed']}
              labelStyle={{ color: 'var(--text2)' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {barData.map((entry, i) => (
                <Cell key={i} fill={entry.date === today ? 'var(--accent)' : '#a78bfa88'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="section-title">SELF-SABOTAGE TREND (14 DAYS)</div>
      <div className="chart-wrap" style={{ height: 160, paddingBottom: 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={triggerByDay} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text2)' }} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text3)' }} />
            <Tooltip
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }}
              formatter={(v: any) => [`${v} triggers`, 'Logged']}
              labelStyle={{ color: 'var(--text2)' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="section-title">FOUNDER EXECUTION</div>
      <div className="stat-chips">
        <div className="stat-chip">
          <div className="stat-chip-value" style={{ color: 'var(--accent)' }}>{milestones.length}</div>
          <div className="stat-chip-label">Milestones</div>
        </div>
        <div className="stat-chip">
          <div className="stat-chip-value" style={{ color: 'var(--green)' }}>{milestoneRate}%</div>
          <div className="stat-chip-label">Completed</div>
        </div>
        <div className="stat-chip">
          <div className="stat-chip-value" style={{ color: '#f97316' }}>{ceoAverage ?? '-'}</div>
          <div className="stat-chip-label">CEO Score</div>
        </div>
      </div>

      <div style={{ margin: '0 16px 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '16px', boxShadow: 'var(--shadow)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', marginBottom: 8 }}>TOP SELF-SABOTAGE PATTERNS</div>
        {topPatterns.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--text2)' }}>No trigger logs yet. Use Today tab to log your first pattern.</p>
        ) : (
          topPatterns.map(([pattern, count], index) => (
            <div key={pattern} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: index < topPatterns.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 14, color: 'var(--text)' }}>{pattern}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{count} logs</span>
            </div>
          ))
        )}
      </div>

      {/* Per-habit selector */}
      <div className="section-title">HABIT DETAILS</div>
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {habits.map(h => (
          <button
            key={h.id}
            onClick={() => setSelected(h)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 20,
              border: '2px solid',
              borderColor: selected?.id === h.id ? h.color : 'var(--border)',
              background: selected?.id === h.id ? h.color + '22' : 'var(--surface)',
              color: selected?.id === h.id ? h.color : 'var(--text2)',
              fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            <span>{h.emoji}</span> {h.name}
          </button>
        ))}
      </div>

      {stats && selected && (
        <>
          {/* Per-habit stats */}
          <div className="stat-chips">
            <div className="stat-chip">
              <div className="stat-chip-value" style={{ color: 'var(--orange)' }}>
                <span style={{ marginRight: 2 }}>🔥</span>{stats.currentStreak}
              </div>
              <div className="stat-chip-label">Current Streak</div>
            </div>
            <div className="stat-chip">
              <div className="stat-chip-value" style={{ color: 'var(--accent)' }}>
                <span style={{ marginRight: 2 }}>🏆</span>{stats.longestStreak}
              </div>
              <div className="stat-chip-label">Longest Streak</div>
            </div>
            <div className="stat-chip">
              <div className="stat-chip-value" style={{ color: 'var(--green)' }}>{stats.completionRate}%</div>
              <div className="stat-chip-label">Last 30 Days</div>
            </div>
          </div>

          {/* 30-day heatmap for selected habit */}
          <div className="section-title">30-DAY HEATMAP</div>
          <div className="heatmap-day-labels">
            {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="heatmap-day-label">{d}</div>)}
          </div>
          <div className="heatmap-grid">
            {(() => {
              const cells = [];
              const ref = new Date();
              ref.setDate(ref.getDate() - 29);
              // pad start
              const startDay = ref.getDay();
              for (let p = 0; p < startDay; p++) cells.push(<div key={`pad-${p}`} />);
              for (let i = 0; i < 30; i++) {
                const d = new Date(ref);
                d.setDate(d.getDate() + i);
                const date = d.toISOString().split('T')[0];
                const done = selected.completions.includes(date);
                const isT = date === new Date().toISOString().split('T')[0];
                cells.push(
                  <div
                    key={date}
                    className={`heatmap-cell ${done ? 'level-3' : ''} ${isT ? 'today' : ''}`}
                    style={done ? { background: selected.color } : {}}
                    title={date}
                  />
                );
              }
              return cells;
            })()}
          </div>

          {/* Total completions */}
          <div style={{ margin: '16px 16px 0', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '16px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle size={28} color={selected.color} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{stats.totalCompletions}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>Total completions ever</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;
