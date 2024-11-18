interface TaskTabsProps {
  activeTab: 'mise' | 'tasks';
  onTabChange: (tab: 'mise' | 'tasks') => void;
}

export function TaskTabs({ activeTab, onTabChange }: TaskTabsProps) {
  const tabs = [
    { id: 'mise', label: 'Mise en place' },
    { id: 'tasks', label: 'Tasks' }
  ] as const;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
