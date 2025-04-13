
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
                className="h-14 md:h-16"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-blue-100 dark:border-blue-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Velkommen</h2>
                
                <div className="aspect-video rounded-lg bg-black/5 dark:bg-black/20 border border-blue-100 dark:border-blue-800 overflow-hidden mb-6">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8 w-full">
                      <h3 className="text-xl font-medium mb-2">Introduktionsvideo</h3>
                      <p className="text-muted-foreground">
                        Se vores introduktionsvideo for at komme i gang
                      </p>
                      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Afspil video
                      </button>
                    </div>
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

