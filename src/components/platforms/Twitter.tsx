import React from 'react';

export interface TwitterShareProps {
  url: string;
  title?: string;
  hashtags?: string[];
  via?: string;
}

export const TwitterShare: React.FC<TwitterShareProps> = ({ 
  url, 
  title = '', 
  hashtags = [], 
  via = '' 
}) => {
  const shareUrl = new URL('https://twitter.com/intent/tweet');
  shareUrl.searchParams.append('url', url);
  
  if (title) shareUrl.searchParams.append('text', title);
  if (hashtags.length > 0) shareUrl.searchParams.append('hashtags', hashtags.join(','));
  if (via) shareUrl.searchParams.append('via', via);

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#1DA1F2',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Twitter
      </button>
    </a>
  );
};