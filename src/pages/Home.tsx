
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const Home = () => {
  // Using an empty string for activeSection as this is a special page
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
                <h2 className="text-2xl font-semibold mb-4">Velkommen til Lærmere.nu</h2>
                
                <div className="aspect-video rounded-lg bg-black/5 dark:bg-black/20 border border-blue-100 dark:border-blue-800 overflow-hidden mb-6">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                      <h3 className="text-xl font-medium mb-2">Introduktionsvideo</h3>
                      <p className="text-muted-foreground">
                        Se vores introduktionsvideo for at komme i gang med Lærmere.nu
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
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/80 dark:bg-slate-800/80 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Sprog og Tale</h3>
                    <p className="text-muted-foreground mb-4">
                      Udforsk vores tekst-til-tale og tale-til-tekst værktøjer for at forbedre sprogindlæring.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Naturlig stemmegengivelse
                      </li>
                      <li className="flex items-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Præcis talegenkendelse
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-slate-800/80 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Læsning og Planlægning</h3>
                    <p className="text-muted-foreground mb-4">
                      Brug vores læsetræning og planlægningsværktøjer til at strukturere din læseoplevelse.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Tilpasset læsehastighed
                      </li>
                      <li className="flex items-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Struktureret læseplanlægning
                      </li>
                    </ul>
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
