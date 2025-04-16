import React from 'react';
import { CalendarClock } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

const ReadingPlanning = () => {
  return (
    <SectionCard
      icon={CalendarClock}
      title="Læseplanlægning"
      description="Planlæg din læsning og læsetid"
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Her kan du planlægge din læsning og sætte mål for, hvor meget du vil læse hver dag eller uge.
        </p>
        <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
      </div>
    </SectionCard>
  );
};

export default ReadingPlanning;
