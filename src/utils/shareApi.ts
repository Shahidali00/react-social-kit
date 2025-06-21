import { shareViaWebAPI, canUseWebShare } from './webShare';

export interface ShareOptions {
  url: string;
  title?: string;
  text?: string;
  media?: string;
  hashtags?: string[];
  via?: string;
  summary?: string;
  source?: string;
  preferWebShare?: boolean;
  fallbackToWindow?: boolean;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
}

export interface PlatformShareConfig {
  name: string;
  color: string;
  buildUrl: (options: ShareOptions) => string;
  popupWidth?: number;
  popupHeight?: number;
}

export const platforms: Record<string, PlatformShareConfig> = {
  facebook: {
    name: 'Facebook',
    color: '#1877f2',
    buildUrl: (options) => {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(options.url)}`;
    },
    popupWidth: 550,
    popupHeight: 400
  },
  twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    buildUrl: (options) => {
      const url = new URL('https://twitter.com/intent/tweet');
      url.searchParams.append('url', options.url);
      if (options.title) url.searchParams.append('text', options.title);
      if (options.hashtags?.length) url.searchParams.append('hashtags', options.hashtags.join(','));
      if (options.via) url.searchParams.append('via', options.via);
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 420
  },
  // Add other platforms...
};

export const share = async (platform: string, options: ShareOptions): Promise<boolean> => {
  const { preferWebShare = true, fallbackToWindow = true } = options;
  
  // Try Web Share API first if preferred
  if (preferWebShare && canUseWebShare()) {
    const webShareData = {
      url: options.url,
      title: options.title,
      text: options.text
    };
    
    const shared = await shareViaWebAPI(webShareData);
    if (shared) return true;
  }
  
  // Fall back to platform-specific sharing
  const config = platforms[platform.toLowerCase()];
  if (!config) return false;
  
  const shareUrl = config.buildUrl(options);
  
  if (fallbackToWindow) {
    const width = config.popupWidth || 550;
    const height = config.popupHeight || 450;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    const popup = window.open(
      shareUrl,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1`
    );
    
    if (popup && popup.focus) {
      popup.focus();
      return true;
    }
  }
  
  // Last resort: redirect
  window.location.href = shareUrl;
  return true;
};

