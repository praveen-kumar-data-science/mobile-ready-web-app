import React, { useState } from 'react';
import { Habit, buildHabitStatement } from '../types/habit';

const EMOJIS = ['🏃','💧','📚','🧘','💪','🥗','😴','✍️','🎯','🎸','🧠','❤️','🌿','☀️','🍎','🏋️','🚴','🎨','📝','🧹'];
const COLORS = ['#6c5ce7','#00b894','#0984e3','#e17055','#fdcb6e','#e84393','#00cec9','#a29bfe','#55efc4','#fd79a8'];
const FREQ: { value: 'daily' | 'weekly'; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

interface AddHabitModalProps {
  initialHabit?: Habit;
  onSubmit: (h: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>) => void;
  onClose: () => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ initialHabit, onSubmit, onClose }) => {
  const [action, setAction] = useState(initialHabit?.action ?? initialHabit?.name ?? '');
  const [cue, setCue] = useState(initialHabit?.cue ?? '');
  const [identity, setIdentity] = useState(initialHabit?.identity ?? '');
  const [reminderTime, setReminderTime] = useState(initialHabit?.reminderTime ?? '');
  const [reminderMessage, setReminderMessage] = useState(initialHabit?.reminderMessage ?? '');
  const [emoji, setEmoji] = useState(initialHabit?.emoji ?? EMOJIS[0]);
  const [color, setColor] = useState(initialHabit?.color ?? COLORS[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>(initialHabit?.frequency ?? 'daily');

  const statement = buildHabitStatement(action || '<habit>', cue || '<time/location>', identity || '<type of person>');
  const canSubmit = !!action.trim() && !!cue.trim() && !!identity.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const nextAction = action.trim();
    const nextCue = cue.trim();
    const nextIdentity = identity.trim();

    onSubmit({
      name: nextAction,
      description: buildHabitStatement(nextAction, nextCue, nextIdentity),
      action: nextAction,
      cue: nextCue,
      identity: nextIdentity,
      reminderTime: reminderTime || undefined,
      reminderMessage: reminderMessage.trim() || undefined,
      emoji,
      color,
      frequency,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>
          {initialHabit ? 'Edit Habit' : 'New Habit'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">I WILL</label>
            <input
              className="form-input"
              placeholder="e.g. read 10 pages"
              value={action}
              onChange={e => setAction(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">AT THIS TIME OR LOCATION</label>
            <input
              className="form-input"
              placeholder="e.g. at 9 PM on my couch"
              value={cue}
              onChange={e => setCue(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">SO I CAN BECOME</label>
            <input
              className="form-input"
              placeholder="e.g. a consistent reader"
              value={identity}
              onChange={e => setIdentity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">HABIT STATEMENT</label>
            <div className="card" style={{ padding: 14, background: 'var(--surface2)', boxShadow: 'none' }}>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 6 }}>
                Identity-first habit prompt inspired by Atomic Habits.
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text)' }}>{statement}</div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">ICON</label>
            <div className="emoji-grid">
              {EMOJIS.map(e => (
                <button type="button" key={e} className={`emoji-btn ${emoji === e ? 'selected' : ''}`} onClick={() => setEmoji(e)}>{e}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">COLOR</label>
            <div className="color-row">
              {COLORS.map(c => (
                <div key={c} className={`color-dot ${color === c ? 'selected' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">FREQUENCY</label>
            <div className="freq-chips">
              {FREQ.map(f => (
                <button type="button" key={f.value} className={`freq-chip ${frequency === f.value ? 'selected' : ''}`} onClick={() => setFrequency(f.value)}>{f.label}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">REMINDER TIME (optional)</label>
            <input
              className="form-input"
              type="time"
              value={reminderTime}
              onChange={e => setReminderTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">REMINDER NOTE (optional)</label>
            <input
              className="form-input"
              placeholder="e.g. Tiny changes, remarkable results"
              value={reminderMessage}
              onChange={e => setReminderMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={!canSubmit}>
            {initialHabit ? 'Save Changes' : 'Add Habit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
