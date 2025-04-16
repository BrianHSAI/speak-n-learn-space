
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SectionCard = ({ icon: Icon, title, description, children }: SectionCardProps) => {
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Icon size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SectionCard;
