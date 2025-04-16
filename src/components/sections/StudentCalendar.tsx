import React from 'react';
import { Calendar } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

const StudentCalendar = () => {
  return (
    <SectionCard
      icon={Calendar}
      title="Elevkalender"
      description="Hold styr på dine aktiviteter og opgaver"
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Velkommen til elevkalenderen. Her kan du holde styr på dine aktiviteter og opgaver.
        </p>
        <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
      </div>
    </SectionCard>
  );
};

export default StudentCalendar;
