
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import VideoSection from '@/components/VideoSection';
import TextToSpeech from '@/components/sections/TextToSpeech';
import SpeechToText from '@/components/sections/SpeechToText';
import ReadingTraining from '@/components/sections/ReadingTraining';
import ReadingPlanning from '@/components/sections/ReadingPlanning';
import Globe from '@/components/Globe';

const Index = () => {
  const [activeSection, setActiveSection] = useState('text-to-speech');

  const renderSection = () => {
    switch (activeSection) {
      case 'text-to-speech':
        return <TextToSpeech />;
      case 'speech-to-text':
        return <SpeechToText />;
      case 'reading-training':
        return <ReadingTraining />;
      case 'reading-planning':
        return <ReadingPlanning />;
      default:
        return <TextToSpeech />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1" />
              <Globe className="hidden md:block" />
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <VideoSection />
              {renderSection()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
