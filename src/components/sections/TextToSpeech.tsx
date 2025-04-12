
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText } from 'lucide-react';

const TextToSpeech = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <MessageSquareText size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Tekst til tale</CardTitle>
          <CardDescription>Konverter tekst til naturligt lydende tale</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            Denne funktion lader dig konvertere skreven tekst til naturligt lydende tale. 
            Ideelt til at skabe lydbøger, podcasts eller hjælpe med udtale.
          </p>
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Indhold kommer snart</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;
