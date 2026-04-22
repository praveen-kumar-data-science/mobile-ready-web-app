import React, { useState } from 'react';
import { Habit } from '../types/habit';

const EMOJIS = ['🏃','💧','📚','🧘','💪','🥗','😴','✍️','🎯','🎸','🧠','❤️','🌿','☀️','🍎','🏋️','🚴','🎨','📝','🧹'];
const COLORS = ['#6c5ce7','#00b894','#0984e3','#e17055','#fdcb6e','#e84393','#00cec9','#a29bfe','#55efc4','#fd79a8'];
const FREQ: { value: 'daily' | 'weekly'; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

interface AddHabitModalProps {
  onAdd: (h: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>) => void;
  onClose: () => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), description, emoji, color, frequency });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>New Habit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">NAME</label>
            <input
              className="form-input"
              placeholder="e.g. Morning Run"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">DESCRIPTION (optional)</label>
            <input
              className="form-input"
              placeholder="Why is this habit important?"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
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
          <button type="submit" className="btn-primary">Add Habit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
