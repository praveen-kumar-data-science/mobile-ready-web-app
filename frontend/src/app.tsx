import React, { useState, useEffect } from 'react';
import { Habit } from './types/habit';
import { habitAPI } from './services/habitAPI';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load habits on mount
  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await habitAPI.getAllHabits();
      setHabits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load habits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (habitData: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => {
    try {
      const newHabit = await habitAPI.createHabit(habitData);
      setHabits([...habits, newHabit]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create habit');
      console.error(err);
    }
  };

  const handleToggleCompletion = async (habitId: number) => {
    try {
      const habit = habits.find(h => h.id === habitId);
      if (!habit) return;

      if (habit.completions.includes(selectedDate)) {
        await habitAPI.removeCompletion(habitId, selectedDate);
      } else {
        await habitAPI.logCompletion(habitId, selectedDate);
      }

      // Reload habits to sync state
      await loadHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update habit');
      console.error(err);
    }
  };

  const handleDeleteHabit = async (habitId: number) => {
    try {
      await habitAPI.deleteHabit(habitId);
      setHabits(habits.filter(h => h.id !== habitId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete habit');
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', marginBottom: '8px' }}>Atoms - Habit Tracker</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Build better habits, one day at a time
        </p>

        {error && (
          <div
            style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}
          >
            {error}
          </div>
        )}

        {/* Date Navigation */}
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <button
            onClick={() => {
              const prev = new Date(selectedDate);
              prev.setDate(prev.getDate() - 1);
              setSelectedDate(prev.toISOString().split('T')[0]);
            }}
            style={{
              padding: '8px 12px',
              backgroundColor: '#e0e0e0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Previous
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              {formatDate(selectedDate)}
            </p>
          </div>

          <button
            onClick={() => {
              const next = new Date(selectedDate);
              next.setDate(next.getDate() + 1);
              setSelectedDate(next.toISOString().split('T')[0]);
            }}
            style={{
              padding: '8px 12px',
              backgroundColor: '#e0e0e0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next →
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            Loading habits...
          </div>
        ) : (
          <>
            <AddHabitForm onAdd={handleAddHabit} />
            <HabitList
              habits={habits}
              onToggleCompletion={handleToggleCompletion}
              onDeleteHabit={handleDeleteHabit}
              selectedDate={selectedDate}
            />
          </>
        )}

        {/* Footer Stats */}
        {habits.length > 0 && !loading && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              marginTop: '20px',
              textAlign: 'center',
              color: '#666'
            }}
          >
            <p style={{ margin: '0' }}>
              {habits.filter(h => h.completions.includes(selectedDate)).length} of {habits.length} habits completed today
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;