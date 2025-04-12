
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const VideoSection = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <Card className="w-full shadow-lg bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-800/20 border-0">
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Velkomstvideo</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(false)}>
              <span className="sr-only">Gendan</span>
              <Minimize2 className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-800/20 border-0">
      <CardContent className="p-6">
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
              Her vil en velkomstvideo blive vist for at introducere brugerne til Lærmere.NU's platform.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoSection;
