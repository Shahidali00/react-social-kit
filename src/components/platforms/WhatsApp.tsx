import React from 'react';

export interface WhatsAppShareProps {
  url: string;
  title?: string;
  description?: string; // Add description prop
  separator?: string;
}

export const WhatsAppShare: React.FC<WhatsAppShareProps> = ({ 
  url, 
  title = '', 
  description = '', // Add description with default empty string
  separator = ' ' 
}) => {
  const shareUrl = new URL('https://api.whatsapp.com/send');
  
  // Use description if available, otherwise fall back to title
  const message = description 
    ? `${description}${separator}${url}` 
    : title 
      ? `${title}${separator}${url}` 
      : url;
      
  shareUrl.searchParams.append('text', message);

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#25D366',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        Share via WhatsApp
      </button>
    </a>
  );
};

