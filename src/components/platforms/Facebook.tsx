import React from 'react';

export interface FacebookShareProps {
  url: string;
  title?: string;
}

export const FacebookShare: React.FC<FacebookShareProps> = ({ url }) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <a href={shareUrl} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#1877f2',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Facebook
      </button>
    </a>
  );
};