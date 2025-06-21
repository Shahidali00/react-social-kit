import React from 'react';

export interface EmailShareProps {
  url: string;
  subject?: string;
  body?: string;
  separator?: string;
}

export const EmailShare: React.FC<EmailShareProps> = ({ 
  url, 
  subject = 'Check out this link', 
  body = '', 
  separator = '\n\n' 
}) => {
  const mailtoUrl = new URL('mailto:');
  mailtoUrl.searchParams.append('subject', subject);
  
  const emailBody = body ? `${body}${separator}${url}` : url;
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