import React from 'react';
import { useShareContext } from '../context/ShareContext';
import { share, ShareOptions } from '../utils/shareApi';
import { useShareTracking } from '../hooks/useShareTracking';
import { isReactNativeAvailable } from '../utils/platform';

export interface ShareProps extends Omit<ShareOptions, 'url'> {
  platform: string;
  url?: string; // Make url optional
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outline' | 'text';
  shape?: 'square' | 'rounded' | 'pill';
  icon?: React.ReactNode;
  text?: string;
  showCount?: boolean;
  disabled?: boolean;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
}

export const Share: React.FC<ShareProps> = ({
  platform,
  url,
  title,
  text,
  media,
  hashtags,
  via,
  summary,
  source,
  preferWebShare,
  fallbackToWindow,
  children,
  className = '',
  style,
  buttonStyle,
  iconStyle,
  textStyle,
  size = 'medium',
  variant = 'solid',
  shape = 'rounded',
  icon,
  text: buttonText,
  showCount = false,
  disabled = false,
  onShareComplete
}) => {
  const context = useShareContext();
  const { trackShare } = useShareTracking();
  
  // Use context values as fallbacks
  const finalUrl = url || context.defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const finalPreferWebShare = preferWebShare ?? context.preferNative;
  const finalFallbackToWindow = fallbackToWindow ?? context.fallbackToWindow;
  
  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Track the share event
    trackShare(platform, finalUrl);
    
    // Prepare share options
    const shareOptions: ShareOptions = {
      url: finalUrl,
      title,
      text,
      media,
      hashtags,
      via,
      summary,
      source,
      preferWebShare: finalPreferWebShare,
      fallbackToWindow: finalFallbackToWindow
    };
    
    try {
      // Perform the share
      const success = await share(platform, shareOptions);
      
      // Call onShareComplete callback
      const completeCallback = onShareComplete || context.onShareComplete;
      if (completeCallback) {
        completeCallback({ success, platform });
      }
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      
      // Call onShareComplete callback with failure
      const completeCallback = onShareComplete || context.onShareComplete;
      if (completeCallback) {
        completeCallback({ success: false, platform });
      }
    }
  };
  
  // Generate dynamic styles based on props and theme
  const { theme } = context;
  const platformConfig = theme.platforms[platform] || {};
  
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
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...getShapeStyles(),
    ...buttonStyle
  };
  
  // If we're in React Native, we should use the native components
  if (isReactNativeAvailable()) {
    // This is just a placeholder - in a real implementation,
    // we would dynamically import the appropriate native component
    console.warn('React Native implementation should be used. Please import the native component directly.');
    return null;
  }
  
  // Default text based on platform
  const defaultText = platformConfig.name ? `Share on ${platformConfig.name}` : `Share on ${platform}`;
  
  return (
    <button
      className={`share-button share-button-${platform} ${className}`}
      style={{ ...buttonStyles, ...style }}
      onClick={handleShare}
      disabled={disabled}
      aria-label={defaultText}
    >
      {children || (
        <>
          {icon && <span style={{ marginRight: '8px', ...iconStyle }}>{icon}</span>}
          <span style={textStyle}>{buttonText || defaultText}</span>
          {showCount && <span style={{ marginLeft: '8px', ...textStyle }}>0</span>}
        </>
      )}
    </button>
  );
};
