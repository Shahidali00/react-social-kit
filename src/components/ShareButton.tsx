import React, { forwardRef } from 'react';
import { useShareContext } from '../context/ShareContext';
import { useShareTracking } from '../hooks/useShareTracking';
import { Theme } from '../utils/theme';

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

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'solid' | 'outline' | 'text';
type ButtonShape = 'square' | 'rounded' | 'pill';

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
  const { theme, defaultUrl, defaultTitle } = useShareContext();
  const { trackShare } = useShareTracking();
  const finalUrl = url || defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    trackShare({
      platform,
      url: finalUrl,
      success: true,
      title: title || defaultTitle || ''
    });
    
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
    ...getButtonSizeStyles(size as ButtonSize),
    ...getButtonVariantStyles(variant as ButtonVariant, platform, theme),
    ...getButtonShapeStyles(shape as ButtonShape),
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

// Helper functions for styles
interface SizeStyles {
  padding: string;
  fontSize: string;
}

const getButtonSizeStyles = (size: ButtonSize): SizeStyles => {
  const sizes: Record<ButtonSize, SizeStyles> = {
    small: { padding: '6px 12px', fontSize: '12px' },
    medium: { padding: '8px 16px', fontSize: '14px' },
    large: { padding: '10px 20px', fontSize: '16px' }
  };
  return sizes[size];
};

interface VariantStyles {
  backgroundColor: string;
  color: string;
  border: string;
}

const getButtonVariantStyles = (variant: ButtonVariant, platform: string, theme: Theme): VariantStyles => {
  const platformConfig = theme.platforms[platform] || { color: '#333' };
  
  const variants: Record<ButtonVariant, VariantStyles> = {
    solid: { 
      backgroundColor: platformConfig.color, 
      color: '#fff', 
      border: 'none' 
    },
    outline: { 
      backgroundColor: 'transparent', 
      color: platformConfig.color, 
      border: `1px solid ${platformConfig.color}` 
    },
    text: { 
      backgroundColor: 'transparent', 
      color: platformConfig.color, 
      border: 'none' 
    }
  };
  return variants[variant];
};

interface ShapeStyles {
  borderRadius: string;
}

const getButtonShapeStyles = (shape: ButtonShape): ShapeStyles => {
  const shapes: Record<ButtonShape, ShapeStyles> = {
    square: { borderRadius: '0' },
    rounded: { borderRadius: '4px' },
    pill: { borderRadius: '9999px' }
  };
  return shapes[shape];
};


