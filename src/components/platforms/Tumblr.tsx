import React from 'react';

export interface TumblrShareProps {
  url: string;
  title?: string;
  caption?: string;
  tags?: string[];
}

export const TumblrShare: React.FC<TumblrShareProps> = ({ 
  url, 
  title = '', 
  caption = '',
  tags = []
}) => {
  const shareUrl = new URL('https://www.tumblr.com/widgets/share/tool');
  
  shareUrl.searchParams.append('canonicalUrl', url);
  shareUrl.searchParams.append('posttype', 'link');
  
  if (title) shareUrl.searchParams.append('title', title);
  if (caption) shareUrl.searchParams.append('caption', caption);
  if (tags.length > 0) shareUrl.searchParams.append('tags', tags.join(','));

  return (
    <a href={shareUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#36465D',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Tumblr
      </button>
    </a>
  );
};