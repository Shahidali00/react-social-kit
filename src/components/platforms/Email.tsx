import React from 'react';

export interface EmailShareProps {
  url: string;
  subject?: string;
  body?: string;
  description?: string; // Add description prop
  separator?: string;
}

export const EmailShare: React.FC<EmailShareProps> = ({ 
  url, 
  subject = 'Check out this link', 
  body = '',
  description = '', // Add description with default empty string
  separator = '\n\n' 
}) => {
  const mailtoUrl = new URL('mailto:');
  mailtoUrl.searchParams.append('subject', subject);
  
  // Use description if available, otherwise fall back to body
  const emailBody = description 
    ? `${description}${separator}${url}` 
    : body 
      ? `${body}${separator}${url}` 
      : url;
      
  mailtoUrl.searchParams.append('body', emailBody);

  return (
    <a href={mailtoUrl.toString()} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          backgroundColor: '#D44638',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Share via Email
      </button>
    </a>
  );
};
