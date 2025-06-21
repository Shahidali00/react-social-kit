import React from 'react';

export interface PinterestShareProps {
  url: string;
  media: string;
  description?: string;
}

export const PinterestShare: React.FC<PinterestShareProps> = ({ 
  url, 
  media, 
  description = '' 
}) => {
  const shareUrl = new URL('https://pinterest.com/pin/create/button/');
  shareUrl.searchParams.append('url', url);
  shareUrl.searchParams.append('media', media);
  
  if (description) shareUrl.searchParams.append('description', description);

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#E60023',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Pinterest
      </button>
    </a>
  );
};