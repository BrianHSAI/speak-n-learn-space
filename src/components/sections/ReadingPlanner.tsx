
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import ReadingPlanning from './ReadingPlanning';

const ReadingPlanner = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <CalendarClock size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Læseplanlægning</CardTitle>
          <CardDescription>Planlæg din læsning og hold dig til din plan</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ReadingPlanning />
      </CardContent>
    </Card>
  );
};

export default ReadingPlanner;
