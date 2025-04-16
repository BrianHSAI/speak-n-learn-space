
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';
import { Calendar } from '@/components/ui/calendar';

const StudentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState('');
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setCurrentNote(selectedDate ? notes[selectedDate.toDateString()] || '' : '');
  };
  
  const handleNoteSave = () => {
    if (!date) return;
    
    setNotes(prev => ({
      ...prev,
      [date.toDateString()]: currentNote
    }));
  };
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('da-DK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <SectionCard
      icon={CalendarIcon}
      title="Elevkalender"
      description="Hold styr på dine aktiviteter og opgaver"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
        </div>
        
        <div className="md:w-1/2 space-y-4">
          <h3 className="font-medium text-lg">{formatDate(date)}</h3>
          
          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Noter til denne dag:
            </label>
            <textarea
              id="note"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="w-full h-32 p-2 border rounded-md"
              placeholder="Skriv dine noter her..."
            />
          </div>
          
          <button
            onClick={handleNoteSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Gem noter
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default StudentCalendar;
