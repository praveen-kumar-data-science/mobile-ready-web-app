import React, { useState, useEffect, useCallback } from 'react';
import './styles/globals.css';
import { Habit, TabId, Theme } from './types/habit';
import { habitAPI } from './services/habitAPI';
import TabBar from './components/TabBar';
import AddHabitModal from './components/AddHabitModal';
import TodayPage from './pages/TodayPage';
import CalendarPage from './pages/CalendarPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';

const logoUrl = `${import.meta.env.BASE_URL}leader-logo.svg`;
const notificationKeyPrefix = 'leader-reminder-sent';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [showAdd, setShowAdd] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) ?? 'light');
  const [notificationPermission, setNotificationPermission] = useState<string>(() => typeof Notification !== 'undefined' ? Notification.permission : 'unsupported');
  const [loading, setLoading] = useState(true);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof Notification === 'undefined' || notificationPermission !== 'granted') return;

    const now = new Date();
    const timers = habits
      .filter(habit => habit.reminderTime && !habit.completions.includes(now.toISOString().split('T')[0]))
      .map(habit => {
        const [hours, minutes] = (habit.reminderTime ?? '').split(':').map(Number);
        const scheduledAt = new Date();
        scheduledAt.setHours(hours || 0, minutes || 0, 0, 0);

        const todayKey = `${notificationKeyPrefix}-${habit.id}-${scheduledAt.toISOString().split('T')[0]}`;
        if (Number.isNaN(scheduledAt.getTime()) || scheduledAt <= now || localStorage.getItem(todayKey)) return null;

        return window.setTimeout(() => {
          new Notification(habit.name, {
            body: habit.reminderMessage || habit.description,
            icon: logoUrl,
          });
          localStorage.setItem(todayKey, '1');
        }, scheduledAt.getTime() - now.getTime());
      })
      .filter((timer): timer is number => timer !== null);

    return () => timers.forEach(window.clearTimeout);
  }, [habits, notificationPermission]);

  const loadHabits = useCallback(async () => {
    try {
      const data = await habitAPI.getAllHabits();
      setHabits(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadHabits(); }, [loadHabits]);

  const handleAddHabit = async (data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>) => {
    try {
      const h = await habitAPI.createHabit(data);
      setHabits(prev => [...prev, h]);
      setShowAdd(false);
    } catch (e) { console.error(e); }
  };

  const handleEditHabit = async (data: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'archived'>) => {
    if (!editingHabit) return;
    try {
      const updated = await habitAPI.updateHabit(editingHabit.id, data);
      setHabits(prev => prev.map(h => h.id === updated.id ? updated : h));
      setEditingHabit(null);
    } catch (e) { console.error(e); }
  };

  const handleToggle = async (id: number, date: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    try {
      let updated: Habit;
      if (habit.completions.includes(date)) {
        updated = await habitAPI.removeCompletion(id, date);
      } else {
        updated = await habitAPI.logCompletion(id, date);
      }
      setHabits(prev => prev.map(h => h.id === id ? updated : h));
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: number) => {
    try {
      await habitAPI.deleteHabit(id);
      setHabits(prev => prev.filter(h => h.id !== id));
    } catch (e) { console.error(e); }
  };

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') {
      setNotificationPermission('unsupported');
      return;
    }
    const result = await Notification.requestPermission();
    setNotificationPermission(result);
  };

  const shareApp = async () => {
    const shareData = {
      title: 'Leader Habit Tracker',
      text: 'Build identity-based habits and track your progress.',
      url: 'https://praveen-kumar-data-science.github.io/mobile-ready-web-app/',
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    window.alert('App link copied to clipboard.');
  };

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', color: 'var(--text2)' }}>
          <img src={logoUrl} alt="Leader logo" className="loading-logo" />
          <div style={{ fontWeight: 700, color: 'var(--text)', marginTop: 12 }}>Loading Leader...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="page-area">
        {activeTab === 'today' && (
          <TodayPage
            habits={habits}
            onToggle={handleToggle}
            onEdit={habit => setEditingHabit(habit)}
            onDelete={handleDelete}
            onAdd={() => setShowAdd(true)}
          />
        )}
        {activeTab === 'calendar' && <CalendarPage habits={habits} />}
        {activeTab === 'stats' && <StatsPage habits={habits} />}
        {activeTab === 'settings' && (
          <SettingsPage
            theme={theme}
            onToggleTheme={toggleTheme}
            habitsCount={habits.length}
            notificationPermission={notificationPermission}
            onRequestNotifications={requestNotifications}
            onShareApp={shareApp}
          />
        )}
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />

      {showAdd && (
        <AddHabitModal onSubmit={handleAddHabit} onClose={() => setShowAdd(false)} />
      )}

      {editingHabit && (
        <AddHabitModal
          initialHabit={editingHabit}
          onSubmit={handleEditHabit}
          onClose={() => setEditingHabit(null)}
        />
      )}
    </div>
  );
};

export default App;
