import React from 'react';
import { Share } from './Share';
import { useShareContext } from '../context/ShareContext';

export interface SocialShareSheetProps {
  url?: string;
  title?: string;
  text?: string;
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
  text = '',
  media = '',
  hashtags = [],
  via = '',
  platforms = ['facebook', 'twitter', 'linkedin', 'pinterest', 'reddit', 'whatsapp', 'telegram', 'email'],
  onShareComplete,
  className = '',
  style = {},
  buttonSize = 'medium',
  iconSize,
  buttonVariant = 'solid',
  buttonShape = 'rounded',
  showText = false
}) => {
  const { defaultUrl, defaultTitle, defaultText, defaultMedia, defaultHashtags } = useShareContext();
  
  // Get values from context if not provided as props
  const finalUrl = url || defaultUrl || '';
  const finalTitle = title || defaultTitle || '';
  const finalText = text || defaultText || '';
  const finalMedia = media || defaultMedia || '';
  const finalHashtags = hashtags || defaultHashtags || [];
  
  // Default styles for the container
  const defaultStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
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
          text={finalText}
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











