import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import TextToSpeech from '@/components/sections/TextToSpeech';
import SpeechToText from '@/components/sections/SpeechToText';
import ReadingTraining from '@/components/sections/ReadingTraining';
import ReadingPlanner from '@/components/sections/ReadingPlanning';
import StudentCalendar from '@/components/sections/StudentCalendar';
import TaskPlanner from '@/components/sections/TaskPlanner';
import HomeworkCalendar from '@/components/sections/HomeworkCalendar';

const App = () => {
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
        return <ReadingPlanner />;
      case 'student-calendar':
        return <StudentCalendar />;
      case 'homework-calendar':
        return <HomeworkCalendar />;
      case 'task-planner':
        return <TaskPlanner />;
      default:
        return <TextToSpeech />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="container mx-auto">
            <div className="flex items-center mb-8">
              <SidebarTrigger className="md:hidden" />
              <img 
                src="/lovable-uploads/0231c664-6b5c-457c-ae03-bc59f9ae098c.png" 
                alt="Lærmere.nu Logo" 
                className="h-14 md:h-16"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-blue-100 dark:border-blue-900 p-4">
                {renderSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default App;
