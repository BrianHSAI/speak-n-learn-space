
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, MicOff, Copy, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SpeechToText = () => {
  // Language options
  const languages = [
    { code: "da-DK", name: "Dansk" },
    { code: "uk-UA", name: "Українська (Ukrainsk)" },
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "sv-SE", name: "Svenska" },
    { code: "no-NO", name: "Norsk" },
    { code: "de-DE", name: "Deutsch" },
    { code: "fr-FR", name: "Français" },
    { code: "es-ES", name: "Español" },
    { code: "it-IT", name: "Italiano" },
    { code: "nl-NL", name: "Nederlands" },
    { code: "fi-FI", name: "Suomi" },
    { code: "pl-PL", name: "Polski" },
  ];

  // Initialize state variables
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('da-DK');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      toast({
        title: "Error",
        description: "Din browser understøtter ikke talegenkendelse. Prøv Chrome, Edge eller Safari.",
        variant: "destructive"
      });
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = currentLanguage;

    // Clean up on unmount
    return () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Configure recognition event handlers when recognition object is created
    if (recognitionRef.current) {
      recognitionRef.current.onresult = handleRecognitionResult;
      recognitionRef.current.onerror = handleRecognitionError;
      recognitionRef.current.lang = currentLanguage;
    }
  }, [currentLanguage, finalTranscript]);

  const handleRecognitionResult = (event: any) => {
    let currentInterimTranscript = '';
    let newFinalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptText = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        newFinalTranscript += ' ' + transcriptText;
      } else {
        currentInterimTranscript += transcriptText;
      }
    }

    // If we have new final transcript, add it to our variable
    if (newFinalTranscript) {
      const updatedFinalTranscript = finalTranscript + newFinalTranscript;
      setFinalTranscript(updatedFinalTranscript);
      // Update the visible transcript with the final text
      setTranscript(updatedFinalTranscript);
      // Clear interim since it's now part of the final
      setInterimTranscript('');
    } else {
      // Just update the interim transcript
      setInterimTranscript(currentInterimTranscript);
      // Display combined transcript (final + current interim)
      setTranscript(finalTranscript + ' ' + currentInterimTranscript);
    }
  };

  const handleRecognitionError = (event: any) => {
    console.error('Speech recognition error', event.error);
    setIsRecording(false);
    toast({
      title: "Error",
      description: `Talegenkendelse fejl: ${event.error}`,
      variant: "destructive"
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Reset transcripts when starting a new recording
      if (!transcript.trim() || window.confirm('Start ny optagelse? Dette vil slette den nuværende tekst.')) {
        setFinalTranscript('');
        setInterimTranscript('');
        setTranscript('');
        
        // Make sure the language is set before starting
        recognitionRef.current.lang = currentLanguage;
        recognitionRef.current.start();
        setIsRecording(true);
      }
    }
  };

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    
    // If currently recording, restart with new language
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setTimeout(() => {
        recognitionRef.current.lang = value;
        recognitionRef.current.start();
      }, 100);
    }
  };

  const handleClearText = () => {
    setFinalTranscript('');
    setInterimTranscript('');
    setTranscript('');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(transcript);
    toast({
      title: "Kopieret",
      description: "Tekst kopieret til udklipsholder"
    });
  };

  const handleSaveText = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transskription.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Gemt",
      description: "Transskription gemt som tekstfil"
    });
  };

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Mic size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Tale Transskription</CardTitle>
          <CardDescription>Vælg sprog og klik på mikrofonknappen for at begynde at transskribere</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="language" className="text-sm font-medium">Sprog</label>
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Vælg sprog" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            id="transcript"
            placeholder="Din transskription vil vises her..."
            className="min-h-[200px]"
            value={transcript}
            readOnly
          />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={toggleRecording} 
                disabled={!isSupported}
                variant={isRecording ? "destructive" : "default"}
              >
                {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                {isRecording ? "Stop optagelse" : "Start optagelse"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearText} 
                disabled={!transcript.trim()}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Ryd tekst
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant="outline" 
                onClick={handleCopyText} 
                disabled={!transcript.trim()}
              >
                <Copy className="mr-2 h-4 w-4" />
                Kopiér
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSaveText} 
                disabled={!transcript.trim()}
              >
                <Save className="mr-2 h-4 w-4" />
                Gem
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechToText;
