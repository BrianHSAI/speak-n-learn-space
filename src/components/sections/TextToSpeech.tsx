import React from 'react';
import { MessageSquareText } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';

const TextToSpeech = () => {
  return (
    <SectionCard
      icon={MessageSquareText}
      title="Tekst til tale"
      description="Konvertér tekst til naturlig tale"
    >
      <div className="flex flex-col gap-4">
        <p>Her kan du konvertere tekst til tale.</p>
        <textarea className="w-full h-32 p-2 border rounded" placeholder="Indtast din tekst her..."></textarea>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Afspil</button>
      </div>
    </SectionCard>
  );
};

export default TextToSpeech;
