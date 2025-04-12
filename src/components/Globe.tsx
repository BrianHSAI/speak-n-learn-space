
import React from 'react';
import { Globe as GlobeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlobeProps {
  className?: string;
}

const Globe: React.FC<GlobeProps> = ({ className }) => {
  return (
    <div className={cn("globe-container", className)}>
      <div className="globe">
        <GlobeIcon 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 animate-rotate-globe" 
          size={24} 
        />
        <div className="fluid-element fluid-element-1"></div>
        <div className="fluid-element fluid-element-2"></div>
        <div className="fluid-element fluid-element-3"></div>
      </div>
    </div>
  );
};

export default Globe;
