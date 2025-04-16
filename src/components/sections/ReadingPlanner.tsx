
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

const ReadingPlanner = () => {
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
        <div className="flex flex-col gap-4 text-center">
          <p className="text-muted-foreground">
            Velkommen til læseplanlægningen. Her kan du planlægge din læsning og få overblik over dine læsemål.
          </p>
          <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingPlanner;
