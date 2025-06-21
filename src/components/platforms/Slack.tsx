import React from 'react';

export interface SlackShareProps {
  url: string;
  title?: string;
}

export const SlackShare: React.FC<SlackShareProps> = ({ 
  url, 
  title = '' 
}) => {
  const shareText = title ? `${title} ${url}` : url;
  const shareUrl = `https://slack.com/openid/share?url=${encodeURIComponent(shareText)}`;

  return (
    <a href={shareUrl} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#4A154B',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share on Slack
      </button>
    </a>
  );
};