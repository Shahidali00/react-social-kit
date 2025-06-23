import React from 'react';
import { Share } from './Share';
import { CopyLinkButton } from './CopyLinkButton';
import { useShareContext } from '../context/ShareContext';

export interface SocialShareSheetProps {
  url?: string;
  title?: string;
  description?: string;
  media?: string;
  hashtags?: string[];
  via?: string;
  platforms?: string[];
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  className?: string;
  style?: React.CSSProperties;
  buttonSize?: 'small' | 'medium' | 'large';
  iconSize?: number;
  buttonVariant?: 'solid' | 'outline' | 'text';
  buttonShape?: 'square' | 'rounded' | 'pill';
  showText?: boolean;
}

export const SocialShareSheet: React.FC<SocialShareSheetProps> = ({
  url,
  title = '',
  description = '',
  media = '',
  hashtags = [],
  via = '',
  platforms = ['facebook', 'twitter', 'linkedin', 'pinterest', 'reddit', 'whatsapp', 'telegram', 'email', 'slack', 'tumblr'],
  onShareComplete,
  className = '',
  style = {},
  buttonSize = 'medium',
  iconSize,
  buttonVariant = 'solid',
  buttonShape = 'rounded',
  showText = false
}) => {
  const { defaultUrl, defaultTitle, defaultDescription, defaultMedia, defaultHashtags } = useShareContext();
  
  // Get final values with proper fallbacks
  const finalUrl = url || defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const finalTitle = title || defaultTitle || '';
  const finalDescription = description || defaultDescription || '';
  const finalMedia = media || defaultMedia || '';
  const finalHashtags = hashtags?.length ? hashtags : defaultHashtags || [];
  
  const defaultStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    ...style
  };
  
  return (
    <div className={`social-share-sheet ${className}`} style={defaultStyle}>
      {platforms.map((platform) => (
        <Share
          key={platform}
          platform={platform}
          url={finalUrl}
          title={finalTitle}
          description={finalDescription}
          text={finalDescription}
          media={finalMedia}
          hashtags={finalHashtags}
          via={via}
          size={buttonSize}
          iconSize={iconSize}
          variant={buttonVariant}
          shape={buttonShape}
          showText={showText}
          onShareComplete={onShareComplete}
        />
      ))}
    </div>
  );
};










