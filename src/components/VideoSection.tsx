
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const VideoSection = () => {
  return (
    <Card className="w-full shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
      <CardContent className="p-6">
        <div className="aspect-video rounded-lg bg-black/5 dark:bg-white/5 border-2 border-dashed flex flex-col items-center justify-center">
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
