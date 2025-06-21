import React from 'react';

export interface WhatsAppShareProps {
  url: string;
  title?: string;
  separator?: string;
}

export const WhatsAppShare: React.FC<WhatsAppShareProps> = ({ 
  url, 
  title = '', 
  separator = ' ' 
}) => {
  const shareUrl = new URL('https://api.whatsapp.com/send');
  const message = title ? `${title}${separator}${url}` : url;
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
          cursor: 'pointer'
        }}
      >
        Share on WhatsApp
      </button>
    </a>
  );
};