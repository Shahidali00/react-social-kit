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
  buttonVariant?: 'solid' | 'outline' | 'text';
  buttonShape?: 'square' | 'rounded' | 'pill';
}

export const SocialShareSheet: React.FC<SocialShareSheetProps> = ({
  url,
  title = '',
  description = '',
  media = '',
  hashtags = [],
  via = '',
  platforms = ['facebook', 'twitter', 'linkedin', 'pinterest', 'reddit', 'whatsapp', 'telegram', 'email', 'copy'],
  onShareComplete,
  className = '',
  style = {},
  buttonSize = 'medium',
  buttonVariant = 'solid',
  buttonShape = 'rounded'
}) => {
  const { defaultUrl } = useShareContext();
  const finalUrl = url || defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  const defaultStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    ...style
  };

  return (
    <div className={`social-share-sheet ${className}`} style={defaultStyle}>
      {platforms.map(platform => {
        if (platform === 'copy') {
          return (
            <CopyLinkButton 
              key="copy" 
              url={finalUrl}
              onShareComplete={onShareComplete}
              className={`share-button-${buttonSize} share-button-${buttonVariant} share-button-${buttonShape}`}
              size={buttonSize}
              variant={buttonVariant}
              shape={buttonShape}
            />
          );
        }
        
        return (
          <Share
            key={platform}
            platform={platform}
            url={finalUrl}
            title={title}
            text={description}
            media={media}
            hashtags={hashtags}
            via={via}
            onShareComplete={onShareComplete}
            size={buttonSize}
            variant={buttonVariant}
            shape={buttonShape}
          />
        );
      })}
    </div>
  );
};

