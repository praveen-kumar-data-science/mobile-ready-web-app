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

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [showAdd, setShowAdd] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) ?? 'light');
  const [loading, setLoading] = useState(true);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const handleToggle = async (id: number) => {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    try {
      let updated: Habit;
      if (habit.completions.includes(today)) {
        updated = await habitAPI.removeCompletion(id, today);
      } else {
        updated = await habitAPI.logCompletion(id, today);
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
          <SettingsPage theme={theme} onToggleTheme={toggleTheme} habitsCount={habits.length} />
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
