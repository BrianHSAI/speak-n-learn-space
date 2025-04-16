
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const ReadingTraining = () => {
  // States for the reading trainer
  const [page, setPage] = useState<'input' | 'reader'>('input');
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(100);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Start training
  const startTraining = () => {
    if (!text.trim()) {
      // Using built-in browser alert for simplicity
      alert('Indtast venligst noget tekst');
      return;
    }

    // Split text into lines with approx. 10 words per line
    const words = text.trim().split(/\s+/);
    const wordsPerLine = 10;
    const newLines = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
      newLines.push(words.slice(i, i + wordsPerLine).join(' '));
    }

    setLines(newLines);
    setCurrentLineIndex(0);
    setIsReading(false);
    
    // Clear any existing timer
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    // Switch to reader page
    setPage('reader');
  };

  // Start reading
  const startReading = () => {
    setCurrentLineIndex(0);
    setIsReading(true);

    // Calculate time per line based on words per minute
    const wordsPerLine = 10;
    const minutesPerLine = wordsPerLine / wpm;
    const millisecondsPerLine = minutesPerLine * 60 * 1000;

    // Start timer
    const newTimer = setInterval(() => {
      setCurrentLineIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        
        // Stop reading if we've reached the end
        if (nextIndex >= lines.length) {
          stopReading();
          return prevIndex;
        }
        
        return nextIndex;
      });
    }, millisecondsPerLine);

    setTimer(newTimer);
  };

  // Stop reading
  const stopReading = () => {
    setIsReading(false);
    
    // Clear timer
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  // Go back to input page
  const goBack = () => {
    // Stop reading if it's in progress
    if (isReading) {
      stopReading();
    }
    
    setPage('input');
  };

  // Render lines based on current index
  const renderLines = () => {
    if (lines.length === 0) return null;

    return (
      <>
        {/* Previous line (if it exists) */}
        {currentLineIndex > 0 && (
          <div className="text-center mb-4 px-8 text-muted-foreground opacity-40">
            {lines[currentLineIndex - 1]}
          </div>
        )}
        
        {/* Current line */}
        <div className="text-center mb-4 px-8 text-lg font-medium">
          {lines[currentLineIndex]}
        </div>
        
        {/* Next line (if it exists) */}
        {currentLineIndex < lines.length - 1 && (
          <div className="text-center mb-4 px-8 text-muted-foreground opacity-40">
            {lines[currentLineIndex + 1]}
          </div>
        )}
      </>
    );
  };

  const renderInputPage = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Indsæt tekst</Label>
          <Textarea 
            id="text" 
            placeholder="Indsæt den tekst, du vil træne med..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-y"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="wpm">Læsehastighed (ord pr. minut)</Label>
          <Input 
            id="wpm" 
            type="number" 
            value={wpm}
            onChange={(e) => setWpm(parseInt(e.target.value) || 100)}
            min="10" 
            max="1000"
            required
          />
        </div>
        
        <Button 
          className="w-full mt-6" 
          onClick={startTraining}
        >
          Start læsetræning
        </Button>
      </div>
    </>
  );

  const renderReaderPage = () => (
    <>
      <Button 
        variant="outline" 
        className="flex items-center mb-6" 
        onClick={goBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tilbage
      </Button>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">
          Læsetræning ({wpm} ord/min)
        </h3>
        <div>
          {!isReading ? (
            <Button onClick={startReading}>
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button variant="destructive" onClick={stopReading}>
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          )}
        </div>
      </div>
      
      <div className="relative border rounded-lg p-6 min-h-[300px] bg-muted/20">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
          {renderLines()}
        </div>
      </div>
      
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {isReading 
          ? `Læser linje ${currentLineIndex + 1} af ${lines.length}`
          : 'Tryk på Start for at begynde læsetræningen'}
      </div>
    </>
  );

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
          {page === 'input' ? renderInputPage() : renderReaderPage()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingTraining;
