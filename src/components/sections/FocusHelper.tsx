
import React from 'react';
import { Focus } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

const FocusHelper = () => {
  return (
    <SectionCard
      icon={Focus}
      title="Fokushjælper"
      description="Værktøjer til at hjælpe dig med at fokusere"
    >
      <div className="flex flex-col gap-4 text-center">
        <p className="text-muted-foreground">
          Velkommen til fokushjælperen. Her får du værktøjer og tips til at forbedre din koncentration og fokus.
        </p>
        <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
      </div>
    </SectionCard>
  );
};

export default FocusHelper;
