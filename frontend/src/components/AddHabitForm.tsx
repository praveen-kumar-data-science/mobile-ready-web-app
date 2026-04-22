import React, { useState } from 'react';
import { Habit } from '../types/habit';

interface AddHabitFormProps {
  onAdd: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void;
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [color, setColor] = useState(colors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({ name, description, frequency, color });
      setName('');
      setDescription('');
      setFrequency('daily');
      setColor(colors[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}
    >
      <h2 style={{ margin: '0 0 16px 0' }}>Add New Habit</h2>
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Habit Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Morning Exercise"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            minHeight: '60px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Color
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: c,
                  border: color === c ? '3px solid #333' : '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4ECDC4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
