
import React, { useEffect } from 'react';

const StudentCalendar = () => {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100vh - 200px)';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    
    // Create a blob from the HTML content
    const htmlContent = `<!DOCTYPE html>
    <html lang="da">
    // ... the entire HTML content provided by user ...
    </html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    
    // Add the iframe to the container
    const container = document.getElementById('calendar-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    // Cleanup
    return () => {
      if (container && iframe) {
        container.removeChild(iframe);
      }
      URL.revokeObjectURL(url);
    };
  }, []);
  
  return (
    <div id="calendar-container"></div>
  );
};

export default StudentCalendar;
