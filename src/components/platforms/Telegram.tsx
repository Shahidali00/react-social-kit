import React from 'react';

export interface TelegramShareProps {
  url: string;
  title?: string;
}

export const TelegramShare: React.FC<TelegramShareProps> = ({ 
  url, 
  title = '' 
}) => {
  const shareUrl = new URL('https://t.me/share/url');
  shareUrl.searchParams.append('url', url);
  
  if (title) {
    shareUrl.searchParams.append('text', title);
  }

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#0088cc',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Telegram
      </button>
    </a>
  );
};