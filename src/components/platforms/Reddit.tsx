import React from 'react';

export interface RedditShareProps {
  url: string;
  title?: string;
}

export const RedditShare: React.FC<RedditShareProps> = ({ 
  url, 
  title = '' 
}) => {
  const shareUrl = new URL('https://www.reddit.com/submit');
  shareUrl.searchParams.append('url', url);
  
  if (title) shareUrl.searchParams.append('title', title);

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#FF4500',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Reddit
      </button>
    </a>
  );
};