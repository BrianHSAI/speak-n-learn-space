import React from 'react';
import { BookOpen } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

const ReadingTraining = () => {
  return (
    <SectionCard
      icon={BookOpen}
      title="Læsetræning"
      description="Træn din læsehastighed og forståelse"
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Velkommen til læsetræningssektionen. Her kan du træne din læsehastighed og -forståelse.
        </p>
        <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
      </div>
    </SectionCard>
  );
};

export default ReadingTraining;
