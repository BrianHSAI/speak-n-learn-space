import React from 'react';
import { Mic } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

const SpeechToText = () => {
  return (
    <SectionCard
      icon={Mic}
      title="Tale til tekst"
      description="Konvertér din tale til tekst"
    >
      <div className="flex flex-col gap-4">
        <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
      </div>
    </SectionCard>
  );
};

export default SpeechToText;
