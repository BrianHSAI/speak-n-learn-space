
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic } from 'lucide-react';

const SpeechToText = () => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Mic size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Tale til tekst</CardTitle>
          <CardDescription>Konverter tale til præcis tekst</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            Denne funktion lader dig konvertere tale til præcis tekst.
            Perfekt til at tage noter, transskribere møder eller skabe indhold med stemmen.
          </p>
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Indhold kommer snart</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechToText;
