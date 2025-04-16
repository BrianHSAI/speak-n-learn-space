
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText, Play, Pause, Square, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TextToSpeech = () => {
  const [text, setText] = useState("Velkommen til tekstoplæseren. Dette er et eksempel på tekst, der kan læses højt. Du kan skrive eller indsætte din egen tekst her.");
  const [selectedLanguage, setSelectedLanguage] = useState("da-DK");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Klar til at læse");
  const [isStatusActive, setIsStatusActive] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [noVoicesForLanguage, setNoVoicesForLanguage] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      
      // Fix for Chrome: Initialize the synthesizer
      if (synthRef.current) {
        try {
          // Trigger initialization with an empty utterance
          const dummyUtterance = new SpeechSynthesisUtterance('');
          synthRef.current.speak(dummyUtterance);
          synthRef.current.cancel();
        } catch (e) {
          console.error("Error initializing speech synthesis:", e);
        }
      }
      
      initVoices();
    }
  }, []);

  const initVoices = () => {
    if (!synthRef.current) return;
    
    // Try to get voices immediately
    const availableVoices = synthRef.current.getVoices();
    
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
      loadVoices(availableVoices, selectedLanguage);
    }
    
    // Set up event for when voices are loaded
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = () => {
        const newVoices = synthRef.current?.getVoices() || [];
        setVoices(newVoices);
        loadVoices(newVoices, selectedLanguage);
      };
    }
  };

  const loadVoices = (availableVoices: SpeechSynthesisVoice[], language: string) => {
    if (availableVoices.length === 0) return;
    
    // Filter voices by the selected language
    const languageVoices = availableVoices.filter(voice => 
      voice.lang.startsWith(language.split('-')[0])
    );
    
    setAvailableVoices(languageVoices);
    setNoVoicesForLanguage(languageVoices.length === 0);
    
    if (languageVoices.length > 0) {
      setSelectedVoice(languageVoices[0].name);
    } else if (availableVoices.length > 0) {
      // If no voices for selected language, fallback to any available voice
      setSelectedVoice(availableVoices[0].name);
    }
  };

  useEffect(() => {
    loadVoices(voices, selectedLanguage);
  }, [selectedLanguage, voices]);

  const readText = () => {
    if (!synthRef.current) return;
    
    if (!text.trim()) {
      updateStatus("Ingen tekst at læse", false);
      return;
    }

    if (isPaused) {
      resumeReading();
      return;
    }

    if (isReading) {
      stopReading();
    }

    // Create a new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = selectedLanguage;
    utteranceRef.current.rate = rate;
    
    // Set selected voice if available
    if (selectedVoice) {
      const voiceObj = voices.find(voice => voice.name === selectedVoice);
      if (voiceObj) {
        utteranceRef.current.voice = voiceObj;
      }
    }

    // Split text into words for progress tracking
    wordsRef.current = text.split(/\s+/);
    currentWordIndexRef.current = 0;
    
    // Set up event listeners for tracking speech progress
    utteranceRef.current.onboundary = (event) => {
      if (event.name === 'word') {
        currentWordIndexRef.current = getWordIndexFromCharIndex(event.charIndex);
        setProgress((currentWordIndexRef.current + 1) / wordsRef.current.length * 100);
        
        // Highlight the current word by selecting it in the textarea
        highlightCurrentWord(event.charIndex, event.charIndex + event.charLength);
      }
    };

    utteranceRef.current.onstart = () => {
      setIsReading(true);
      updateStatus("Læser...", true);
    };

    utteranceRef.current.onend = () => {
      setIsReading(false);
      setIsPaused(false);
      updateStatus("Færdig med at læse", false);
      setProgress(100);
      
      // Clear any selection
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
      
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    };

    utteranceRef.current.onerror = (event) => {
      setIsReading(false);
      setIsPaused(false);
      updateStatus(`Fejl: ${event.error}`, false);
    };

    try {
      synthRef.current.speak(utteranceRef.current);
      
      // Force starting speech for Chrome
      if (synthRef.current.paused) {
        synthRef.current.resume();
      }
      
      // Additional checking for Chrome
      if (!synthRef.current.speaking && !synthRef.current.pending) {
        // Try alternative approach for Chrome
        setTimeout(() => {
          if (utteranceRef.current && synthRef.current) {
            synthRef.current.speak(utteranceRef.current);
          }
        }, 100);
      }
      
    } catch (e) {
      console.error("Speech synthesis error:", e);
      updateStatus("Fejl ved start af oplæsning", false);
    }
  };

  const pauseReading = () => {
    if (!synthRef.current) return;
    
    if (isReading && !isPaused) {
      try {
        synthRef.current.pause();
        setIsPaused(true);
        updateStatus("Pauset", false);
      } catch (e) {
        console.error("Error pausing speech:", e);
      }
    } else {
      resumeReading();
    }
  };

  const resumeReading = () => {
    if (!synthRef.current) return;
    
    try {
      synthRef.current.resume();
      setIsPaused(false);
      updateStatus("Læser...", true);
    } catch (e) {
      console.error("Error resuming speech:", e);
    }
  };

  const stopReading = () => {
    if (!synthRef.current) return;
    
    try {
      synthRef.current.cancel();
      setIsReading(false);
      setIsPaused(false);
      updateStatus("Stoppet", false);
      setProgress(0);
      
      // Clear any selection
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
    } catch (e) {
      console.error("Error stopping speech:", e);
    }
  };

  const updateStatus = (message: string, isActive: boolean) => {
    setStatus(message);
    setIsStatusActive(isActive);
  };

  const getWordIndexFromCharIndex = (charIndex: number) => {
    const textUpToIndex = text.substring(0, charIndex);
    return textUpToIndex.split(/\s+/).length - 1;
  };

  const highlightCurrentWord = (startIndex: number, endIndex: number) => {
    try {
      if (textareaRef.current) {
        // Focus the textarea if not already focused
        if (document.activeElement !== textareaRef.current) {
          textareaRef.current.focus();
        }
        
        // Set selection to the current word
        textareaRef.current.setSelectionRange(startIndex, endIndex);
        
        // Scroll to the selection if needed
        const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight);
        const numberOfLines = Math.floor(startIndex / (textareaRef.current.cols || 20));
        textareaRef.current.scrollTop = numberOfLines * lineHeight;
      }
    } catch (e) {
      console.error("Error highlighting word:", e);
    }
  };

  const handleRateChange = (value: number[]) => {
    setRate(value[0]);
    
    // If currently reading, update the rate
    if (isReading && utteranceRef.current) {
      stopReading();
      setTimeout(() => readText(), 100);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <MessageSquareText size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Tekstoplæser</CardTitle>
          <CardDescription>Konverter tekst til naturligt lydende tale</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="languageSelect">Vælg sprog:</Label>
              <select 
                id="languageSelect"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="da-DK">Dansk</option>
                <option value="uk-UA">Українська (Ukrainsk)</option>
                <option value="en-US">Engelsk</option>
                <option value="de-DE">Tysk</option>
                <option value="fr-FR">Fransk</option>
                <option value="es-ES">Spansk</option>
                <option value="it-IT">Italiensk</option>
                <option value="nl-NL">Hollandsk</option>
                <option value="pt-PT">Portugisisk</option>
                <option value="ru-RU">Russisk</option>
                <option value="zh-CN">Kinesisk (forenklet)</option>
                <option value="bs-BA">Bosnisk</option>
                <option value="hr-HR">Kroatisk</option>
                <option value="cs-CZ">Tjekkisk</option>
                <option value="hu-HU">Ungarsk</option>
                <option value="pl-PL">Polsk</option>
                <option value="ro-RO">Rumænsk</option>
                <option value="sk-SK">Slovakisk</option>
                <option value="sl-SI">Slovensk</option>
                <option value="sv-SE">Svensk</option>
                <option value="fi-FI">Finsk</option>
                <option value="no-NO">Norsk</option>
                <option value="el-GR">Græsk</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voiceSelect">Vælg stemme:</Label>
              <select 
                id="voiceSelect"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                disabled={voices.length === 0}
              >
                {voices.length === 0 ? (
                  <option value="">Indlæser stemmer...</option>
                ) : availableVoices.length > 0 ? (
                  availableVoices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {`${voice.name} (${voice.lang})`}
                    </option>
                  ))
                ) : (
                  <option value="">Ingen stemmer fundet for dette sprog</option>
                )}
              </select>
            </div>
          </div>

          {noVoicesForLanguage && (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Ingen stemmer fundet</AlertTitle>
              <AlertDescription>
                Din browser har ikke stemmer for {selectedLanguage === 'uk-UA' ? 'Ukrainsk' : 'det valgte sprog'}. 
                Prøv et andet sprog eller en anden browser.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="rateSlider">Tempo:</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Langsom</span>
              <Slider 
                id="rateSlider" 
                min={0.5} 
                max={2} 
                step={0.1} 
                defaultValue={[1.0]} 
                value={[rate]}
                onValueChange={handleRateChange} 
                className="flex-1" 
              />
              <span className="text-sm">Hurtig</span>
              <span className="ml-2 text-sm font-medium w-12 text-center">{rate.toFixed(1)}x</span>
            </div>
          </div>

          <div className={`flex items-center gap-2 py-2 px-4 rounded-md text-sm ${isStatusActive ? 'bg-blue-50 text-primary' : 'bg-slate-100 text-slate-600'}`}>
            <Info size={16} />
            <span>{status}</span>
          </div>

          <Progress value={progress} className="h-1.5" />

          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Skriv eller indsæt din tekst her..."
              className="min-h-[200px] resize-y p-4"
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              {text.length} tegn
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={readText}
              className="flex-1"
              disabled={!text.trim()}
            >
              {isReading && !isPaused ? (
                <>
                  <MessageSquareText size={16} className="mr-2" />
                  Læser...
                </>
              ) : (
                <>
                  <Play size={16} className="mr-2" />
                  Læs teksten
                </>
              )}
            </Button>
            
            <Button 
              onClick={pauseReading}
              variant="secondary"
              className="flex-1"
              disabled={!isReading}
            >
              <Pause size={16} className="mr-2" />
              {isPaused ? "Fortsæt" : "Pause"}
            </Button>
            
            <Button 
              onClick={stopReading}
              variant="outline"
              className="flex-1"
              disabled={!isReading && !isPaused}
            >
              <Square size={16} className="mr-2" />
              Stop
            </Button>
          </div>

          <div className="text-sm text-center text-muted-foreground mt-4">
            <p>Vælg et sprog og en stemme, og lad systemet læse din tekst højt med naturlig tale.</p>
            <p className="mt-4 text-xs">
              Lavet af: <strong>Lærmere.NU</strong>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;
