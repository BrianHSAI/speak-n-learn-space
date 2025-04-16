import React from 'react';
import { 
  Mic, 
  MessageSquareText, 
  BookOpen, 
  CalendarClock,
  Home,
  Calendar,
  FileText,
  Focus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items
const items = [
  {
    title: "Tekst til tale",
    icon: MessageSquareText,
    id: "text-to-speech"
  },
  {
    title: "Tale til tekst",
    icon: Mic,
    id: "speech-to-text"
  },
  {
    title: "Læsetræning",
    icon: BookOpen,
    id: "reading-training"
  },
  {
    title: "Læseplanlægning",
    icon: CalendarClock,
    id: "reading-planning"
  },
  {
    title: "Elevkalender",
    icon: Calendar,
    id: "student-calendar"
  },
  {
    title: "Lektiekalender",
    icon: Calendar,
    id: "homework-calendar"
  },
  {
    title: "Opgaveplanlægger",
    icon: FileText,
    id: "task-planner"
  },
  {
    title: "Fokushjælper",
    icon: Focus,
    id: "focus-helper"
  }
];

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const navigate = useNavigate();
  
  const handleNavigation = (sectionId: string) => {
    // If not already on the app page, navigate there first
    if (window.location.pathname !== '/app') {
      navigate('/app');
    }
    // Then change the section
    onSectionChange(sectionId);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/0231c664-6b5c-457c-ae03-bc59f9ae098c.png" 
            alt="Lærmere Logo" 
            className="h-8"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={activeSection === '' ? "bg-sidebar-accent" : ""}
                >
                  <Link to="/">
                    <Home className="mr-2" size={20} />
                    <span>Forside</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={activeSection === item.id ? "bg-sidebar-accent" : ""}
                  >
                    <button onClick={() => handleNavigation(item.id)}>
                      <item.icon className="mr-2" size={20} />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <p className="text-xs text-sidebar-foreground/70">© 2025 Lærmere</p>
      </SidebarFooter>
    </Sidebar>
  );
};
