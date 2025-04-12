
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

const ReadingPlanning = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <CalendarClock size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Læseplanlægning</CardTitle>
          <CardDescription>Planlæg og organiser din læsning</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            Denne funktion hjælper dig med at planlægge og organisere din læsning.
            Sæt mål, hold styr på din fremgang og få påmindelser om dine læseplaner.
          </p>
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Indhold kommer snart</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingPlanning;
