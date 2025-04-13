
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const Home = () => {
  const activeSection = '';
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <AppSidebar activeSection={activeSection} onSectionChange={() => {}} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="container mx-auto">
            <div className="flex items-center mb-8">
              <SidebarTrigger className="md:hidden" />
              <img 
                src="/lovable-uploads/0231c664-6b5c-457c-ae03-bc59f9ae098c.png" 
                alt="Lærmere.nu Logo" 
                className="h-24 md:h-32 lg:h-40"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-blue-100 dark:border-blue-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Velkommen</h2>
                
                <div className="aspect-video rounded-lg bg-black/5 dark:bg-black/20 border border-blue-100 dark:border-blue-800 overflow-hidden mb-6">
                  <div className="flex items-center justify-center h-full w-full">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/KgTpA3mKPuI" 
                      title="Introduktionsvideo" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;
