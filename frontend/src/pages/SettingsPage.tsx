import React from 'react';
import { Moon, Sun, Bell, Info, ChevronRight, Star, Share2 } from 'lucide-react';
import { Theme } from '../types/habit';

interface SettingsPageProps {
  theme: Theme;
  onToggleTheme: () => void;
  habitsCount: number;
  notificationPermission: string;
  onRequestNotifications: () => void;
  onShareApp: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ theme, onToggleTheme, habitsCount, notificationPermission, onRequestNotifications, onShareApp }) => {
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

      <div style={{ textAlign: 'center', padding: '24px 16px', color: 'var(--text3)', fontSize: 13 }}>
        Leader · Built around the Atomic Habits mindset
      </div>
    </div>
  );
};

export default SettingsPage;
