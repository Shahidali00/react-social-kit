import React from 'react';
import { useShareContext } from '../context/ShareContext';
import { useShareTracking } from '../hooks/useShareTracking';
import { share, ShareOptions } from '../utils/shareApi';
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedInIcon, 
  WhatsAppIcon,
  TelegramIcon,
  EmailIcon,
  RedditIcon,
  PinterestIcon,
  CopyIcon
} from '../utils/icons';

export interface ShareProps {
  platform: string;
  url?: string;
  title?: string;
  text?: string;
  description?: string; // Add explicit description property
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
  iconSize?: number; // New prop for custom icon size
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
  description,
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
  iconSize, // New prop for custom icon size
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
  const finalDescription = description || context.defaultDescription || '';
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
      description: finalDescription, // Add description to share options
      media: finalMedia,
      hashtags: finalHashtags,
      via,
      summary: summary || finalDescription, // Use description as fallback for summary
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
    
    const iconProps = { 
      size: iconDimension,
      color: showText && variant === 'solid' ? '#fff' : platformConfig.color
    };
    
    switch (platform) {
      case 'facebook':
        return <FacebookIcon {...iconProps} />;
      case 'twitter':
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
      case 'copy':
        return <CopyIcon {...iconProps} />;
      default:
        return null;
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














