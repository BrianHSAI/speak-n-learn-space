
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const ReadingTraining = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <BookOpen size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Læsetræning</CardTitle>
          <CardDescription>Forbedr din læsehastighed og forståelse</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            Denne funktion hjælper dig med at forbedre din læsehastighed og forståelse gennem målrettede øvelser.
            Tilpas læsematerialet til dit niveau og følg din fremgang over tid.
          </p>
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Indhold kommer snart</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingTraining;
