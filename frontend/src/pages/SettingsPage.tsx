import React from 'react';
import { Moon, Sun, Bell, Info, ChevronRight, Star, Share2 } from 'lucide-react';
import { Theme, Habit, BusinessMilestone, WeeklyCEOReview } from '../types/habit';
import { getBusinessBuilderPlaybook } from '../data/growthStrategies';

interface SettingsPageProps {
  theme: Theme;
  onToggleTheme: () => void;
  habitsCount: number;
  notificationPermission: string;
  onRequestNotifications: () => void;
  onShareApp: () => void;
  habits: Habit[];
  milestones: BusinessMilestone[];
  onAddMilestone: (title: string, targetDate: string, linkedHabitId?: number) => void;
  onToggleMilestone: (id: number) => void;
  onSaveWeeklyReview: (review: Omit<WeeklyCEOReview, 'weekStart'>) => void;
  latestReview: WeeklyCEOReview | null;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  theme,
  onToggleTheme,
  habitsCount,
  notificationPermission,
  onRequestNotifications,
  onShareApp,
  habits,
  milestones,
  onAddMilestone,
  onToggleMilestone,
  onSaveWeeklyReview,
  latestReview,
}) => {
  const businessPlaybook = React.useMemo(() => getBusinessBuilderPlaybook().slice(0, 8), []);
  const [milestoneTitle, setMilestoneTitle] = React.useState('');
  const [milestoneDate, setMilestoneDate] = React.useState('');
  const [linkedHabitId, setLinkedHabitId] = React.useState<number | undefined>(undefined);

  const [salesExecution, setSalesExecution] = React.useState(latestReview?.salesExecution ?? 6);
  const [leadGeneration, setLeadGeneration] = React.useState(latestReview?.leadGeneration ?? 6);
  const [deepWork, setDeepWork] = React.useState(latestReview?.deepWork ?? 6);
  const [delivery, setDelivery] = React.useState(latestReview?.delivery ?? 6);
  const [mindset, setMindset] = React.useState(latestReview?.mindset ?? 6);
  const [reviewNotes, setReviewNotes] = React.useState(latestReview?.notes ?? '');

  const submitMilestone = () => {
    if (!milestoneTitle.trim() || !milestoneDate) return;
    onAddMilestone(milestoneTitle, milestoneDate, linkedHabitId);
    setMilestoneTitle('');
    setMilestoneDate('');
    setLinkedHabitId(undefined);
  };

  const saveReview = () => {
    onSaveWeeklyReview({
      salesExecution,
      leadGeneration,
      deepWork,
      delivery,
      mindset,
      notes: reviewNotes.trim(),
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Customize your experience</p>
      </div>

      {/* Appearance */}
      <div className="section-title">APPEARANCE</div>
      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-row-label">
            <div className="settings-row-icon" style={{ background: '#2c2c2e' }}>
              {theme === 'dark' ? <Moon size={16} color="#a78bfa" /> : <Sun size={16} color="#fdcb6e" />}
            </div>
            Dark Mode
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={theme === 'dark'} onChange={onToggleTheme} />
            <span className="toggle-slider" />
          </label>
        </div>
        <button className="settings-row settings-button" onClick={onRequestNotifications}>
          <div className="settings-row-label">
            <div className="settings-row-icon" style={{ background: '#eef6ff' }}>
              <Bell size={16} color="#3C8DFF" />
            </div>
            Habit Reminders
          </div>
          <span style={{ color: 'var(--text3)', fontSize: 14, textTransform: 'capitalize' }}>{notificationPermission}</span>
        </button>
      </div>

      {/* About */}
      <div className="section-title">ABOUT</div>
      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-row-label">
            <div className="settings-row-icon" style={{ background: '#e8f4fd' }}>
              <Info size={16} color="#0984e3" />
            </div>
            Version
          </div>
          <span style={{ color: 'var(--text3)', fontSize: 14 }}>1.0.0</span>
        </div>
        <div className="settings-row">
          <div className="settings-row-label">
            <div className="settings-row-icon" style={{ background: '#ffeaa7' }}>
              <Star size={16} color="#fdcb6e" />
            </div>
            Total Habits
          </div>
          <span style={{ color: 'var(--text3)', fontSize: 14 }}>{habitsCount}</span>
        </div>
        <button className="settings-row settings-button" onClick={onShareApp}>
          <div className="settings-row-label">
            <div className="settings-row-icon" style={{ background: '#dfe6e9' }}>
              <Share2 size={16} color="#636e72" />
            </div>
            Share App
          </div>
          <ChevronRight size={16} color="var(--text3)" />
        </button>
      </div>

      {/* Tips */}
      <div className="section-title">TIPS</div>
      <div style={{ margin: '0 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '16px', boxShadow: 'var(--shadow)' }}>
        {[
          { icon: '🔥', tip: 'Build streaks by completing habits consistently every day.' },
          { icon: '📅', tip: 'Use the Calendar view to see your month at a glance.' },
          { icon: '📊', tip: 'Check Stats to understand your completion patterns.' },
          { icon: '🎯', tip: 'Start with 2–3 small habits and grow from there.' },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.5 }}>{t.tip}</span>
          </div>
        ))}
      </div>

      <div className="section-title">BUSINESS BUILDER PLAYBOOK</div>
      <div style={{ margin: '0 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '16px', boxShadow: 'var(--shadow)' }}>
        {businessPlaybook.map((item, i) => (
          <div key={item.title} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < businessPlaybook.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: 20 }}>💼</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4, lineHeight: 1.4 }}>{item.action}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">BUSINESS MILESTONE TRACKER</div>
      <div style={{ margin: '0 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '16px', boxShadow: 'var(--shadow)' }}>
        <input
          className="form-input"
          placeholder="Milestone title (ex: close first 5 paying clients)"
          value={milestoneTitle}
          onChange={e => setMilestoneTitle(e.target.value)}
        />
        <div style={{ height: 8 }} />
        <input className="form-input" type="date" value={milestoneDate} onChange={e => setMilestoneDate(e.target.value)} />
        <div style={{ height: 8 }} />
        <select className="form-input" value={linkedHabitId ?? ''} onChange={e => setLinkedHabitId(e.target.value ? Number(e.target.value) : undefined)}>
          <option value="">Link to habit (optional)</option>
          {habits.map(h => (
            <option key={h.id} value={h.id}>{h.emoji} {h.name}</option>
          ))}
        </select>
        <button className="btn-primary" onClick={submitMilestone}>Add Milestone</button>

        <div style={{ marginTop: 12 }}>
          {milestones.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>No milestones yet. Add your first business target.</p>
          ) : (
            milestones.slice(0, 8).map((m, i) => (
              <button
                key={m.id}
                onClick={() => onToggleMilestone(m.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  border: '1px solid var(--border)',
                  background: m.status === 'completed' ? 'var(--green-light)' : 'var(--surface2)',
                  borderRadius: 10,
                  padding: '10px 12px',
                  marginTop: i === 0 ? 0 : 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{m.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>
                  Target: {m.targetDate} · Status: {m.status === 'completed' ? 'Completed' : 'Planned'}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="section-title">WEEKLY CEO REVIEW</div>
      <div style={{ margin: '0 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '16px', boxShadow: 'var(--shadow)' }}>
        {[
          { label: 'Sales Execution', value: salesExecution, set: setSalesExecution },
          { label: 'Lead Generation', value: leadGeneration, set: setLeadGeneration },
          { label: 'Deep Work Focus', value: deepWork, set: setDeepWork },
          { label: 'Delivery Quality', value: delivery, set: setDelivery },
          { label: 'Mindset & Discipline', value: mindset, set: setMindset },
        ].map(item => (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{item.label}</span>
              <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{item.value}/10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={item.value}
              onChange={e => item.set(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        ))}
        <textarea
          className="form-input"
          style={{ minHeight: 80, resize: 'vertical' }}
          placeholder="Weekly reflection: wins, bottlenecks, next strategic move"
          value={reviewNotes}
          onChange={e => setReviewNotes(e.target.value)}
        />
        <button className="btn-primary" onClick={saveReview}>Save Weekly Review</button>
      </div>

      <div style={{ textAlign: 'center', padding: '24px 16px', color: 'var(--text3)', fontSize: 13 }}>
        Leader · Built for identity habits, anti-self-sabotage, and business growth
      </div>
    </div>
  );
};

export default SettingsPage;
