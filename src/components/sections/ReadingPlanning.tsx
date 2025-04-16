
import React, { useState } from 'react';
import { CalendarClock, Plus, X } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

interface ReadingItem {
  id: string;
  title: string;
  pages: number;
  deadline: string;
  completed: boolean;
}

const ReadingPlanning = () => {
  const [readingItems, setReadingItems] = useState<ReadingItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPages, setNewPages] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle || !newPages || !newDeadline) return;
    
    const newItem: ReadingItem = {
      id: Date.now().toString(),
      title: newTitle,
      pages: parseInt(newPages),
      deadline: newDeadline,
      completed: false
    };
    
    setReadingItems(prev => [...prev, newItem]);
    setNewTitle('');
    setNewPages('');
    setNewDeadline('');
  };
  
  const toggleCompleted = (id: string) => {
    setReadingItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setReadingItems(prev => prev.filter(item => item.id !== id));
  };
  
  // Calculate daily reading pace for each item
  const calculateDailyPages = (item: ReadingItem) => {
    const today = new Date();
    const deadline = new Date(item.deadline);
    
    // Calculate days between today and deadline
    const diffTime = Math.abs(deadline.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // If deadline is today or passed, show all remaining pages
    if (diffDays <= 0) return item.pages;
    
    // Calculate daily pages
    return Math.ceil(item.pages / diffDays);
  };
  
  return (
    <SectionCard
      icon={CalendarClock}
      title="Læseplanlægning"
      description="Planlæg din læsning og læsetid"
    >
      <div className="space-y-6">
        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Titel/Bog
              </label>
              <input
                id="title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="F.eks. 'Løvernes Konge'"
              />
            </div>
            
            <div>
              <label htmlFor="pages" className="block text-sm font-medium mb-1">
                Antal sider
              </label>
              <input
                id="pages"
                type="number"
                min="1"
                value={newPages}
                onChange={(e) => setNewPages(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="F.eks. 200"
              />
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium mb-1">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tilføj læsning
          </button>
        </form>
        
        {readingItems.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Din læseplan</h3>
            <div className="space-y-2">
              {readingItems.map(item => (
                <div 
                  key={item.id}
                  className={`p-4 border rounded-md ${
                    item.completed ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-950'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleCompleted(item.id)}
                        className="mt-1"
                      />
                      <div className={item.completed ? 'line-through text-gray-500' : ''}>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm">
                          {item.pages} sider til {new Date(item.deadline).toLocaleDateString('da-DK')}
                        </p>
                        <p className="text-sm mt-1">
                          <strong>Dagligt læsetempo:</strong> {calculateDailyPages(item)} sider per dag
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Du har ikke tilføjet nogen læseplaner endnu.</p>
            <p>Brug formularen ovenfor til at tilføje din første læseplan.</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default ReadingPlanning;
