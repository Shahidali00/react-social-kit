import React from 'react';
import { useShareContext } from '../context/ShareContext';
import { useShareTracking } from '../hooks/useShareTracking';
import { platforms, share, ShareOptions } from '../utils/shareApi';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TelegramIcon,
  EmailIcon,
  RedditIcon,
  PinterestIcon,
  SlackIcon,
  TumblrIcon
} from '../utils/icons';

export interface ShareProps {
  platform: string;
  url?: string;
  title?: string;  // Main message from user
  text?: string;
  media?: string;
  hashtags?: string[];
  via?: string;
  summary?: string;
  source?: string;
  preferWebShare?: boolean;
  fallbackToWindow?: boolean;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  iconSize?: number;
  variant?: 'solid' | 'outline' | 'text';
  shape?: 'square' | 'rounded' | 'pill';
  icon?: React.ReactNode;
  showCount?: boolean;
  disabled?: boolean;
  showText?: boolean;
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
  onShareComplete,
  children,
  className = '',
  style,
  buttonStyle,
  iconStyle,
  textStyle,
  size = 'medium',
  iconSize,
  variant = 'solid',
  shape = 'rounded',
  icon,
  showCount = false,
  disabled = false,
  showText = false,
}) => {
  const context = useShareContext();
  const { trackShare } = useShareTracking();
  
  // Get values from context if not provided as props
  const finalUrl = url || context.defaultUrl || '';
  const finalTitle = title || context.defaultTitle || '';
  const finalText = text || context.defaultText || '';
  const finalMedia = media || context.defaultMedia || '';
  const finalHashtags = hashtags || context.defaultHashtags || [];
  const finalPreferWebShare = preferWebShare ?? context.preferNative ?? false;
  const finalFallbackToWindow = fallbackToWindow ?? context.fallbackToWindow ?? true;
  
  // Handle share action
  const handleShare = async () => {
    // Prepare share options
    const shareOptions: ShareOptions = {
      url: finalUrl,
      title: finalTitle,
      text: finalText,
      media: finalMedia,
      hashtags: finalHashtags,
      via,
      summary,
      source,
      preferWebShare: finalPreferWebShare,
      fallbackToWindow: finalFallbackToWindow,
      onShareComplete: (result: { success: boolean; platform: string }) => {
        if (onShareComplete) {
          onShareComplete(result);
        }
        if (context.onShareComplete) {
          context.onShareComplete(result);
        }
        
        trackShare({
          platform,
          url: finalUrl,
          success: result.success,
          title: finalTitle
        });
      }
    };
    
    await share(platform, shareOptions);
  };
  
  // Get platform config from context
  const platformConfig = context.theme.platforms[platform] || { name: platform, color: '#333' };
  
  // Determine button styles based on variant, size, and shape
  const buttonSizes = {
    small: { padding: showText ? '6px 12px' : '8px', fontSize: '12px' },
    medium: { padding: showText ? '8px 16px' : '10px', fontSize: '14px' },
    large: { padding: showText ? '10px 20px' : '12px', fontSize: '16px' }
  };
  
  const buttonVariants = {
    solid: { 
      backgroundColor: showText ? platformConfig.color : 'transparent', 
      color: showText ? '#fff' : platformConfig.color, 
      border: 'none' 
    },
    outline: { 
      backgroundColor: 'transparent', 
      color: platformConfig.color, 
      border: showText ? `1px solid ${platformConfig.color}` : 'none' 
    },
    text: { 
      backgroundColor: 'transparent', 
      color: platformConfig.color, 
      border: 'none' 
    }
  };
  
  const buttonShapes = {
    square: { borderRadius: '0' },
    rounded: { borderRadius: context.theme.button.borderRadius },
    pill: { borderRadius: '9999px' }
  };
  
  const buttonStyles = {
    ...buttonSizes[size],
    ...buttonVariants[variant],
    ...buttonShapes[shape],
    fontFamily: context.theme.button.fontFamily,
    fontWeight: context.theme.button.fontWeight,
    transition: context.theme.button.transition,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    ...buttonStyle
  };
  
  // Get the appropriate icon based on platform
  const getIconForPlatform = () => {
    // Use iconSize prop if provided, otherwise use size-based dimensions
    const iconDimension = iconSize || (size === 'small' ? 16 : size === 'medium' ? 20 : 24);
    
    // Get platform config
    const platformConfig = platforms[platform] || { 
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      color: '#333333',
      buildUrl: () => ''
    };
    
    const iconProps = { 
      size: iconDimension,
      color: showText && variant === 'solid' ? '#fff' : platformConfig.color
    };
    
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <FacebookIcon {...iconProps} />;
      case 'twitter':
      case 'x':
        return <TwitterIcon {...iconProps} />;
      case 'linkedin':
        return <LinkedInIcon {...iconProps} />;
      case 'whatsapp':
        return <WhatsAppIcon {...iconProps} />;
      case 'telegram':
        return <TelegramIcon {...iconProps} />;
      case 'email':
        return <EmailIcon {...iconProps} />;
      case 'reddit':
        return <RedditIcon {...iconProps} />;
      case 'pinterest':
        return <PinterestIcon {...iconProps} />;
      case 'slack':
        return <SlackIcon {...iconProps} />;
      case 'tumblr':
        return <TumblrIcon {...iconProps} />;
      default:
        // For any other platform, return a generic share icon
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        );
    }
  };
  
  // Default text based on platform
  const defaultText = platformConfig.name ? `Share on ${platformConfig.name}` : `Share on ${platform}`;
  
  return (
    <button
      className={`share-button share-button-${platform} ${!showText ? 'share-button-icon-only' : ''} ${className}`}
      style={{ 
        ...buttonStyles, 
        ...(!showText ? {
          minWidth: 'auto',
          boxShadow: 'none'
        } : {}),
        ...style 
      }}
      onClick={handleShare}
      disabled={disabled}
      aria-label={defaultText}
    >
      {children || (
        <>
          {icon || getIconForPlatform()}
          {showText && (
            <>
              <span style={{ marginLeft: '8px', ...textStyle }}>{text || defaultText}</span>
              {showCount && <span style={{ marginLeft: '8px', ...textStyle }}>0</span>}
            </>
          )}
        </>
      )}
    </button>
  );
};



















