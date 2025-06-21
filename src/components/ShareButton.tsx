import React, { forwardRef } from 'react';
import { useShareContext } from '../context/ShareContext';
import { useShareTracking } from '../hooks/useShareTracking';

export interface ShareButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  platform: string;
  url?: string;
  title?: string;
  description?: string;
  media?: string;
  hashtags?: string[];
  via?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outline' | 'text';
  shape?: 'square' | 'rounded' | 'pill';
  icon?: React.ReactNode;
  showCount?: boolean;
}

export const ShareButton = forwardRef<HTMLButtonElement, ShareButtonProps>(({
  platform,
  url,
  title,
  className = '',
  style,
  children,
  onClick,
  onShareComplete,
  size = 'medium',
  variant = 'solid',
  shape = 'rounded',
  icon,
  showCount = false,
  disabled = false,
  ...rest
}, ref) => {
  const { theme, defaultUrl } = useShareContext();
  const { trackShare } = useShareTracking();
  const finalUrl = url || defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    trackShare(platform, finalUrl);
    
    try {
      // Share logic here
      if (onShareComplete) {
        onShareComplete({ success: true, platform });
      }
    } catch (error) {
      if (onShareComplete) {
        onShareComplete({ success: false, platform });
      }
    }
  };
  
  // Generate dynamic styles based on props
  const buttonStyles = {
    ...getButtonSizeStyles(size),
    ...getButtonVariantStyles(variant, platform, theme),
    ...getButtonShapeStyles(shape),
    ...style
  };
  
  return (
    <button
      ref={ref}
      className={`share-button share-button-${platform} ${className}`}
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Share on ${platform}`}
      {...rest}
    >
      {icon && <span className="share-button-icon">{icon}</span>}
      {children || `Share on ${platform}`}
      {showCount && <ShareCount url={finalUrl} platform={platform} />}
    </button>
  );
});

ShareButton.displayName = 'ShareButton';

// Helper components and functions
const ShareCount = ({ url, platform }: { url: string; platform: string }) => {
  // Implementation for share count fetching
  return <span className="share-count">0</span>;
};

const getButtonSizeStyles = (size: string): React.CSSProperties => {
  switch (size) {
    case 'small': return { padding: '6px 12px', fontSize: '0.875rem' };
    case 'large': return { padding: '12px 24px', fontSize: '1.125rem' };
    default: return { padding: '8px 16px', fontSize: '1rem' };
  }
};

const getButtonVariantStyles = (variant: string, platform: string, theme: any): React.CSSProperties => {
  const color = theme?.[platform.toLowerCase()] || '#333';
  
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
        color: theme?.buttonText || '#fff', 
        border: 'none' 
      };
  }
};

const getButtonShapeStyles = (shape: string): React.CSSProperties => {
  switch (shape) {
    case 'square': return { borderRadius: '0' };
    case 'pill': return { borderRadius: '9999px' };
    default: return { borderRadius: '6px' };
  }
};
