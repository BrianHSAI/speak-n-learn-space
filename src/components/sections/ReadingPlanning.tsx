
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, Calendar, Check, Trash, Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

// Helper functions for date formatting
const MONTHS = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];
const WEEKDAYS_SHORT = ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const formatShortDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${WEEKDAYS_SHORT[getDayOfWeek(date) - 1]} ${date.getDate()}. ${MONTHS[date.getMonth()].substring(0, 3)}`;
};

// Returns day of week (1-7, where 1 is Monday)
const getDayOfWeek = (date: Date) => {
  let day = date.getDay();
  return day === 0 ? 7 : day; // Convert Sunday (0) to 7
};

interface ReadingDay {
  date: string;
  pages: number;
}

interface ReadingOptions {
  equalReading: boolean;
  avoidWeekends: boolean;
  moreOnWeekends: boolean;
}

interface ReadingTask {
  id: string;
  bookTitle: string;
  pages: number;
  deadline: string;
  completed: boolean;
  pagesRead: number;
  options: ReadingOptions;
  readingPlan: ReadingDay[];
}

const generateReadingPlan = (totalPages: number, deadline: string, options: ReadingOptions): ReadingDay[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endDate = new Date(deadline);
  endDate.setHours(23, 59, 59, 999);
  
  const totalDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (totalDays <= 0) return [];
  
  const plan: ReadingDay[] = [];
  let remainingPages = totalPages;
  let remainingDays = totalDays;
  
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    
    const isWeekend = getDayOfWeek(currentDate) === 6 || getDayOfWeek(currentDate) === 7;
    
    // Skip weekends if option is selected
    if (options.avoidWeekends && isWeekend) {
      plan.push({
        date: currentDate.toISOString().split('T')[0],
        pages: 0
      });
      continue;
    }
    
    let pagesToRead = 0;
    
    if (options.equalReading) {
      // Read equal amount each day (except weekends if avoided)
      if (options.avoidWeekends) {
        const weekdaysLeft = Array.from({ length: remainingDays }, (_, idx) => {
          const d = new Date(currentDate);
          d.setDate(currentDate.getDate() + idx);
          const day = getDayOfWeek(d);
          return day !== 6 && day !== 7;
        }).filter(Boolean).length;
        
        pagesToRead = Math.ceil(remainingPages / Math.max(1, weekdaysLeft));
      } else if (options.moreOnWeekends && isWeekend) {
        // Read more on weekends (50% more)
        const basePages = Math.ceil(remainingPages / Math.max(1, remainingDays));
        pagesToRead = Math.ceil(basePages * 1.5);
      } else {
        pagesToRead = Math.ceil(remainingPages / Math.max(1, remainingDays));
      }
    } else {
      // Simple distribution
      pagesToRead = Math.ceil(remainingPages / Math.max(1, remainingDays));
    }
    
    // Ensure we don't assign more pages than remaining
    pagesToRead = Math.min(pagesToRead, remainingPages);
    
    plan.push({
      date: currentDate.toISOString().split('T')[0],
      pages: pagesToRead
    });
    
    remainingPages -= pagesToRead;
    remainingDays--;
  }
  
  return plan;
};

// Calendar component for the printable view
const MonthCalendar = ({ month, year, dateToPages }: { month: number, year: number, dateToPages: Map<string, number> }) => {
  const monthName = MONTHS[month];
  
  // Get first and last day of month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Calculate weekday for first day (1 = Monday, ..., 7 = Sunday)
  const firstDayOfWeek = getDayOfWeek(firstDayOfMonth);
  
  // Generate empty cells for days before first day of month
  const emptyCells = Array.from({ length: firstDayOfWeek - 1 }, (_, i) => (
    <div key={`empty-${i}`} className="p-1 border min-h-14"></div>
  ));
  
  // Generate cells for all days in month
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    const pages = dateToPages.get(dateStr);
    const isReadingDay = pages !== undefined && pages > 0;
    
    return (
      <div 
        key={day} 
        className={`p-1 border min-h-14 relative ${isReadingDay ? 'bg-blue-50 border-blue-300' : ''}`}
      >
        <div className="absolute top-1 left-1 text-xs">{day}</div>
        {isReadingDay && (
          <div className="text-center pt-6 text-sm font-medium">{pages} sider</div>
        )}
      </div>
    );
  });
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-2">{monthName} {year}</h2>
      
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {WEEKDAYS_SHORT.map(day => (
          <div key={day} className="text-center text-sm font-medium py-1">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-0.5">
        {emptyCells}
        {dayCells}
      </div>
    </div>
  );
};

const ReadingPlanner = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [bookTitle, setBookTitle] = useState('');
  const [pages, setPages] = useState<number | ''>('');
  const [deadline, setDeadline] = useState('');
  const [equalReading, setEqualReading] = useState(true);
  const [avoidWeekends, setAvoidWeekends] = useState(false);
  const [moreOnWeekends, setMoreOnWeekends] = useState(false);
  const [tasks, setTasks] = useState<ReadingTask[]>([]);
  const [showPrintView, setShowPrintView] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ReadingTask | null>(null);
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('readingTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('readingTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAvoidWeekendsChange = (checked: boolean) => {
    setAvoidWeekends(checked);
    if (checked) {
      setMoreOnWeekends(false);
    }
  };
  
  const handleMoreOnWeekendsChange = (checked: boolean) => {
    setMoreOnWeekends(checked);
    if (checked) {
      setAvoidWeekends(false);
    }
  };
  
  const addTask = () => {
    if (!bookTitle.trim()) {
      toast({ title: "Fejl", description: "Indtast venligst en bogtitel." });
      return;
    }
    
    if (!pages || pages <= 0) {
      toast({ title: "Fejl", description: "Indtast venligst et gyldigt antal sider." });
      return;
    }
    
    if (!deadline) {
      toast({ title: "Fejl", description: "Vælg venligst en deadline." });
      return;
    }
    
    const options = {
      equalReading,
      avoidWeekends,
      moreOnWeekends
    };
    
    const readingPlan = generateReadingPlan(pages, deadline, options);
    
    const newTask: ReadingTask = {
      id: Date.now().toString(),
      bookTitle,
      pages: Number(pages),
      deadline,
      completed: false,
      pagesRead: 0,
      options,
      readingPlan
    };
    
    setTasks(prev => [...prev, newTask]);
    
    // Reset form
    setBookTitle('');
    setPages('');
    setDeadline('');
    
    // Switch to task list
    setActiveTab('list');
    
    toast({ title: "Succes", description: "Læseopgave tilføjet!" });
  };
  
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };
  
  const updateProgress = (taskId: string, newPagesRead: number) => {
    if (isNaN(newPagesRead) || newPagesRead <= 0) {
      toast({ title: "Fejl", description: "Indtast venligst et gyldigt antal sider." });
      return;
    }
    
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedPagesRead = task.pagesRead + newPagesRead;
        const isCompleted = updatedPagesRead >= task.pages;
        
        // Generate new reading plan with remaining pages
        const remainingPages = task.pages - updatedPagesRead;
        const newReadingPlan = isCompleted
          ? task.readingPlan
          : generateReadingPlan(remainingPages, task.deadline, task.options);
        
        return {
          ...task,
          pagesRead: updatedPagesRead,
          completed: isCompleted,
          readingPlan: newReadingPlan
        };
      }
      return task;
    }));
    
    toast({ title: "Fremskridt opdateret", description: `${newPagesRead} sider blev tilføjet.` });
  };
  
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({ title: "Opgave slettet", description: "Læseopgaven er blevet slettet." });
  };
  
  const printTask = (task: ReadingTask) => {
    setSelectedTask(task);
    setShowPrintView(true);
    
    // Give a moment for the view to render before printing
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  const renderPrintView = () => {
    if (!selectedTask) return null;
    
    // Create a map of date -> pages for quick lookup
    const dateToPages = new Map<string, number>();
    selectedTask.readingPlan.forEach(day => {
      if (day.pages > 0) {
        dateToPages.set(day.date, day.pages);
      }
    });
    
    // Get start and end dates from reading plan
    const startDate = new Date(selectedTask.readingPlan[0]?.date || selectedTask.deadline);
    const endDate = new Date(selectedTask.deadline);
    
    // Get all months between start and end date
    const months: { month: number, year: number }[] = [];
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    
    while (currentDate <= lastMonth) {
      months.push({ month: currentDate.getMonth(), year: currentDate.getFullYear() });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="print:hidden mb-6">
          <Button onClick={() => setShowPrintView(false)} variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tilbage til planlægger
          </Button>
        </div>
        
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{selectedTask.bookTitle}</h1>
            <p className="text-muted-foreground">
              Læseplan: {selectedTask.pages} sider inden {formatDate(selectedTask.deadline)}
            </p>
          </div>
          
          {months.map(({ month, year }) => (
            <MonthCalendar 
              key={`${year}-${month}`} 
              month={month} 
              year={year} 
              dateToPages={dateToPages} 
            />
          ))}
          
          <div className="mt-8 pt-4 border-t">
            <h3 className="font-medium">Læseindstillinger:</h3>
            <ul className="mt-2 text-sm">
              {selectedTask.options.equalReading && (
                <li className="mb-1">• Læs lige meget hver dag</li>
              )}
              {selectedTask.options.avoidWeekends && (
                <li className="mb-1">• Undgå læsning i weekender</li>
              )}
              {selectedTask.options.moreOnWeekends && (
                <li className="mb-1">• Læs mere i weekender</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  // Show print view if active
  if (showPrintView) {
    return renderPrintView();
  }
  
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="add">Tilføj læseopgave</TabsTrigger>
            <TabsTrigger value="list">Mine læseopgaver</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookTitle">Bogtitel</Label>
                <Input 
                  id="bookTitle" 
                  value={bookTitle} 
                  onChange={e => setBookTitle(e.target.value)} 
                  placeholder="Indtast bogtitel" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pages">Antal sider</Label>
                <Input 
                  id="pages" 
                  type="number" 
                  value={pages}
                  onChange={e => setPages(e.target.value ? Number(e.target.value) : '')} 
                  placeholder="Indtast antal sider"
                  min="1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input 
                  id="deadline" 
                  type="date" 
                  value={deadline} 
                  onChange={e => setDeadline(e.target.value)} 
                />
              </div>
              
              <div className="space-y-3">
                <Label>Læseindstillinger</Label>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="equalReading" 
                    checked={equalReading} 
                    onCheckedChange={checked => setEqualReading(checked as boolean)} 
                  />
                  <label 
                    htmlFor="equalReading" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Læs lige meget hver dag
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="avoidWeekends" 
                    checked={avoidWeekends} 
                    onCheckedChange={checked => handleAvoidWeekendsChange(checked as boolean)} 
                  />
                  <label 
                    htmlFor="avoidWeekends" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Undgå læsning i weekender
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="moreOnWeekends" 
                    checked={moreOnWeekends} 
                    onCheckedChange={checked => handleMoreOnWeekendsChange(checked as boolean)} 
                  />
                  <label 
                    htmlFor="moreOnWeekends" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Læs mere i weekender
                  </label>
                </div>
              </div>
              
              <Button className="w-full mt-4" onClick={addTask}>
                Tilføj læseopgave
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            {tasks.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">
                  Du har ingen læseopgaver endnu. Tilføj en ny opgave for at komme i gang.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {tasks.map(task => (
                  <Card key={task.id} className={`border ${task.completed ? 'opacity-70' : ''}`}>
                    <CardHeader className="p-4">
                      <div className="flex justify-between">
                        <CardTitle className="text-xl">{task.bookTitle}</CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => printTask(task)}
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Udskriv
                          </Button>
                          <Button 
                            variant={task.completed ? "outline" : "default"}
                            size="sm" 
                            onClick={() => toggleTaskCompletion(task.id)}
                          >
                            {task.completed ? 'Fortryd' : (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                Færdig
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Sider: </span>
                          <span className="font-medium">{task.pages}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline: </span>
                          <span className="font-medium">{formatDate(task.deadline)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Læst: </span>
                          <span className="font-medium">{task.pagesRead} af {task.pages} sider</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status: </span>
                          <span className={`font-medium ${task.completed ? 'text-green-600' : ''}`}>
                            {task.completed ? 'Færdig' : 'Igangværende'}
                          </span>
                        </div>
                      </div>
                      
                      {!task.completed && (
                        <div className="flex gap-2 mb-4">
                          <div className="flex-1">
                            <Label htmlFor={`progress-${task.id}`} className="text-sm">
                              Opdater fremskridt
                            </Label>
                            <div className="flex gap-2 mt-1">
                              <Input 
                                id={`progress-${task.id}`} 
                                type="number"
                                placeholder="Antal læste sider"
                                className="flex-1"
                                min="1"
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    const input = e.target as HTMLInputElement;
                                    updateProgress(task.id, Number(input.value));
                                    input.value = '';
                                  }
                                }}
                              />
                              <Button 
                                onClick={(e) => {
                                  const input = document.getElementById(`progress-${task.id}`) as HTMLInputElement;
                                  updateProgress(task.id, Number(input.value));
                                  input.value = '';
                                }}
                              >
                                Opdater
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Læseplan
                          </h4>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Slet opgave
                          </Button>
                        </div>
                        
                        {task.readingPlan.filter(day => day.pages > 0).length === 0 ? (
                          <div className="text-center text-sm text-muted-foreground py-2">
                            Ingen læsedage planlagt.
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {task.readingPlan
                              .filter(day => day.pages > 0)
                              .slice(0, 8)
                              .map((day, index) => (
                                <div 
                                  key={day.date + index} 
                                  className="bg-card border rounded-md p-2 text-center"
                                >
                                  <div className="text-xs text-muted-foreground">
                                    {formatShortDate(day.date)}
                                  </div>
                                  <div className="font-medium">{day.pages} sider</div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReadingPlanner;
