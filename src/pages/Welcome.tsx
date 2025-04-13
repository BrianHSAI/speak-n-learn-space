
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Minimize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Welcome = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="container mx-auto">
          <div className="flex justify-center mb-12 pt-8">
            <img 
              src="/lovable-uploads/4ef34a8b-ee97-4307-9322-4bafa1bc1d52.png" 
              alt="Lærmere.nu Logo" 
              className="h-16 md:h-20"
            />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="w-full shadow-lg bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-800/20 border-0 mb-8">
              <CardContent className="p-6">
                {isMinimized ? (
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Velkomstvideo</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsMinimized(false)}>
                      <span className="sr-only">Gendan</span>
                      <Minimize2 className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end gap-2 mb-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsMinimized(true)}
                        className="hover:bg-background/20"
                      >
                        <span className="sr-only">Minimer</span>
                        <Minimize2 className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-background/20"
                          >
                            <span className="sr-only">Luk</span>
                            <X className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <div className="text-center p-4">
                            <h3 className="text-xl font-medium mb-2">Spring velkomstvideoen over?</h3>
                            <p className="text-muted-foreground mb-4">
                              Du kan altid gense videoen senere fra hjælpesektionen.
                            </p>
                            <div className="flex justify-center gap-4">
                              <DialogTrigger asChild>
                                <Button variant="outline">Annuller</Button>
                              </DialogTrigger>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="default" 
                                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                                  onClick={() => setIsMinimized(true)}
                                >
                                  Ja, spring over
                                </Button>
                              </DialogTrigger>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="aspect-video rounded-lg bg-black/5 dark:bg-white/5 border-2 border-dashed flex flex-col items-center justify-center overflow-hidden">
                      <div className="text-center p-8">
                        <h3 className="text-xl font-medium mb-2">Velkomstvideo</h3>
                        <p className="text-muted-foreground">
                          Her vil en velkomstvideo blive vist for at introducere brugerne til Lærmere's platform.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-blue-100 dark:border-blue-900 hover:shadow-2xl transition-all">
                <Link to="/app" className="block p-6">
                  <h2 className="text-xl font-semibold mb-3">Start Applikationen</h2>
                  <p className="text-muted-foreground">Gå til den fulde applikation med alle værktøjer og funktioner.</p>
                </Link>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-blue-100 dark:border-blue-900 hover:shadow-2xl transition-all">
                <a href="https://docs.laermere.nu" target="_blank" rel="noopener noreferrer" className="block p-6">
                  <h2 className="text-xl font-semibold mb-3">Dokumentation</h2>
                  <p className="text-muted-foreground">Læs mere om hvordan du bruger Lærmere's værktøjer effektivt.</p>
                </a>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
