import React, { useState, useEffect } from 'react';
import { useShareContext } from '../context/ShareContext';
import { useShareTracking } from '../hooks/useShareTracking';

export interface CopyLinkButtonProps {
  url?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  copiedText?: string;
  copiedDuration?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outline' | 'text';
  shape?: 'square' | 'rounded' | 'pill';
}

export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({
  url,
  children,
  className = '',
  style,
  onShareComplete,
  copiedText = 'Copied!',
  copiedDuration = 2000,
  size = 'medium',
  variant = 'solid',
  shape = 'rounded'
}) => {
  const [copied, setCopied] = useState(false);
  const { defaultUrl, theme } = useShareContext();
  const { trackShare } = useShareTracking();
  
  const finalUrl = url || defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, copiedDuration);
      
      return () => clearTimeout(timer);
    }
  }, [copied, copiedDuration]);
  
  const handleCopy = async () => {
    try {
      // Track the share event
      trackShare('copy', finalUrl);
      
      // Use the Clipboard API
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(finalUrl);
        setCopied(true);
        
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'copy' });
        }
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = finalUrl;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          setCopied(successful);
          
          if (onShareComplete) {
            onShareComplete({ success: successful, platform: 'copy' });
          }
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          
          if (onShareComplete) {
            onShareComplete({ success: false, platform: 'copy' });
          }
        }
        
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'copy' });
      }
    }
  };
  
  // Generate dynamic styles based on props and theme
  const platformConfig = theme.platforms.copy || {};
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '6px 12px', fontSize: '0.875rem' };
      case 'large':
        return { padding: '12px 24px', fontSize: '1.125rem' };
      default:
        return { padding: '8px 16px', fontSize: '1rem' };
    }
  };
  
  const getVariantStyles = () => {
    const color = platformConfig.color || '#6c757d';
    
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color,
          border: `1px solid ${color}`
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color,
          border: 'none'
        };
      default:
        return {
          backgroundColor: color,
          color: '#fff',
          border: 'none'
        };
    }
  };
  
  const getShapeStyles = () => {
    switch (shape) {
      case 'square':
        return { borderRadius: '0' };
      case 'pill':
        return { borderRadius: '9999px' };
      default:
        return { borderRadius: '4px' };
    }
  };
  
  const buttonStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...getShapeStyles(),
    ...style
  };
  
  return (
    <button
      className={`copy-link-button ${className}`}
      style={buttonStyles}
      onClick={handleCopy}
      aria-label="Copy link to clipboard"
    >
      {children || (
        <span>{copied ? copiedText : 'Copy Link'}</span>
      )}
    </button>
  );
};

