
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ReadingPlanning from './ReadingPlanning';

const ReadingPlanner = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardContent className="pt-6">
        <ReadingPlanning />
      </CardContent>
    </Card>
  );
};

export default ReadingPlanner;
