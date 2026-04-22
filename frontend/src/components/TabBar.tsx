import React from 'react';
import { Home, CalendarDays, BarChart2, Settings, LucideIcon } from 'lucide-react';
import { TabId } from '../types/habit';

interface TabBarProps {
  active: TabId;
  onChange: (t: TabId) => void;
}

const tabs: { id: TabId; label: string; Icon: LucideIcon }[] = [
  { id: 'today',    label: 'Today',    Icon: Home },
  { id: 'calendar', label: 'Calendar', Icon: CalendarDays },
  { id: 'stats',    label: 'Stats',    Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

const TabBar: React.FC<TabBarProps> = ({ active, onChange }) => (
  <nav className="tab-bar">
    {tabs.map(({ id, label, Icon }) => (
      <button
        key={id}
        className={`tab-item ${active === id ? 'active' : ''}`}
        onClick={() => onChange(id)}
      >
        <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
        <span>{label}</span>
      </button>
    ))}
  </nav>
);

export default TabBar;
