
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Focus } from 'lucide-react';

const FocusHelper = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Focus size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Fokushjælper</CardTitle>
          <CardDescription>Værktøjer til at hjælpe dig med at fokusere</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-muted-foreground">
            Velkommen til fokushjælperen. Her får du værktøjer og tips til at forbedre din koncentration og fokus.
          </p>
          <p>Denne funktion er under udvikling og vil være tilgængelig snart.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusHelper;
