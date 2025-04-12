
import React from 'react';
import { 
  Mic, 
  MessageSquareText, 
  BookOpen, 
  CalendarClock 
} from 'lucide-react';

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

import Globe from './Globe';

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
  }
];

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Globe className="w-10 h-10" />
          <h1 className="text-xl font-bold text-sidebar-foreground">Lærmere.NU</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onSectionChange(item.id)}
                    className={activeSection === item.id ? "bg-sidebar-accent" : ""}
                  >
                    <item.icon className="mr-2" size={20} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <p className="text-xs text-sidebar-foreground/70">© 2025 Lærmere.NU</p>
      </SidebarFooter>
    </Sidebar>
  );
};
