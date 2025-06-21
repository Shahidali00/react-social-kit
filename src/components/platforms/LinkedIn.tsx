import React from 'react';

export interface LinkedInShareProps {
  url: string;
  title?: string;
  summary?: string;
  source?: string;
}

export const LinkedInShare: React.FC<LinkedInShareProps> = ({ 
  url, 
  title = '', 
  summary = '', 
  source = '' 
}) => {
  const shareUrl = new URL('https://www.linkedin.com/shareArticle');
  shareUrl.searchParams.append('url', url);
  shareUrl.searchParams.append('mini', 'true');
  
  if (title) shareUrl.searchParams.append('title', title);
  if (summary) shareUrl.searchParams.append('summary', summary);
  if (source) shareUrl.searchParams.append('source', source);

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#0077B5',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on LinkedIn
      </button>
    </a>
  );
};