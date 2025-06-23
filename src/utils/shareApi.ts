import { shareViaWebAPI, canUseWebShare } from './webShare';

export interface ShareOptions {
  url: string;
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
      const url = new URL('https://www.facebook.com/sharer/sharer.php');
      url.searchParams.append('u', options.url);
      
      // Facebook doesn't support title in the URL parameters
      // but we'll keep the basic implementation
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 400
  },
  twitter: {
    name: 'X',
    color: '#000000',
    buildUrl: (options) => {
      const url = new URL('https://twitter.com/intent/tweet');
      url.searchParams.append('url', options.url);
      
      // Use title as the main message
      if (options.title) {
        url.searchParams.append('text', options.title);
      }
      
      if (options.hashtags && options.hashtags.length > 0) {
        url.searchParams.append('hashtags', options.hashtags.join(','));
      }
      
      if (options.via) {
        url.searchParams.append('via', options.via);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 420
  },
  x: {
    name: 'X',
    color: '#000000',
    buildUrl: (options) => {
      const url = new URL('https://twitter.com/intent/tweet');
      url.searchParams.append('url', options.url);
      
      if (options.title) {
        url.searchParams.append('text', options.title);
      }
      
      if (options.hashtags && options.hashtags.length > 0) {
        url.searchParams.append('hashtags', options.hashtags.join(','));
      }
      
      if (options.via) {
        url.searchParams.append('via', options.via);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 420
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    buildUrl: (options) => {
      const url = new URL('https://www.linkedin.com/sharing/share-offsite/');
      url.searchParams.append('url', options.url);
      
      if (options.title) {
        url.searchParams.append('title', options.title);
      }
      
      // Use title as summary if summary is not provided
      if (options.summary) {
        url.searchParams.append('summary', options.summary);
      } else if (options.title) {
        url.searchParams.append('summary', options.title);
      }
      
      if (options.source) {
        url.searchParams.append('source', options.source);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  reddit: {
    name: 'Reddit',
    color: '#FF4500',
    buildUrl: (options) => {
      const url = new URL('https://www.reddit.com/submit');
      url.searchParams.append('url', options.url);
      
      if (options.title) {
        url.searchParams.append('title', options.title);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  telegram: {
    name: 'Telegram',
    color: '#0088cc',
    buildUrl: (options) => {
      const url = new URL('https://t.me/share/url');
      url.searchParams.append('url', options.url);
      
      // Use title as the main message
      if (options.title) {
        url.searchParams.append('text', options.title);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  tumblr: {
    name: 'Tumblr',
    color: '#36465D',
    buildUrl: (options) => {
      const url = new URL('https://www.tumblr.com/widgets/share/tool');
      url.searchParams.append('canonicalUrl', options.url);
      url.searchParams.append('posttype', 'link');
      
      if (options.title) url.searchParams.append('title', options.title);
      
      // Use title as caption
      if (options.title) {
        url.searchParams.append('caption', options.title);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  slack: {
    name: 'Slack',
    color: '#000000',
    buildUrl: (options) => {
      // Slack doesn't have a direct share URL, but we can use this format
      const message = options.title ? `${options.title} ${options.url}` : options.url;
      return `https://slack.com/openid/share?url=${encodeURIComponent(message)}`;
    },
    popupWidth: 550,
    popupHeight: 450
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#25D366',
    buildUrl: (options) => {
      const url = new URL('https://api.whatsapp.com/send');
      
      // Use title as the main message
      const message = options.title ? `${options.title} ${options.url}` : options.url;
      url.searchParams.append('text', message);
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  pinterest: {
    name: 'Pinterest',
    color: '#E60023',
    buildUrl: (options) => {
      const url = new URL('https://pinterest.com/pin/create/button/');
      url.searchParams.append('url', options.url);
      
      if (options.media) {
        url.searchParams.append('media', options.media);
      }
      
      // Use title as description
      if (options.title) {
        url.searchParams.append('description', options.title);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  email: {
    name: 'Email',
    color: '#333333',
    buildUrl: (options) => {
      const subject = options.title || 'Check out this link';
      
      // Use title as the body if available
      const body = options.title ? `${options.title}\n\n${options.url}` : options.url;
      
      return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }
  // Removed copy platform
};

export const share = async (
  platform: string,
  options: ShareOptions
): Promise<boolean> => {
  const {
    url,
    title,
    text,
    media,
    hashtags,
    via,
    summary,
    source,
    preferWebShare = false,
    fallbackToWindow = true,
    onShareComplete
  } = options;
  
  // Skip Web Share API for specific platforms to ensure direct sharing
  const skipWebShare = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'pinterest', 'reddit'];
  
  // Only use Web Share API if explicitly preferred and not in the skip list
  if (preferWebShare && !skipWebShare.includes(platform.toLowerCase()) && canUseWebShare()) {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          url,
          title,
          text: text || title
        });
        
        if (onShareComplete) {
          onShareComplete({
            success: true,
            platform: 'web-share'
          });
        }
        
        return true;
      }
    } catch (error) {
      console.error('Error sharing via Web Share API:', error);
      
      if (onShareComplete) {
        onShareComplete({
          success: false,
          platform: 'web-share'
        });
      }
      
      // Fall back to window.open if enabled
      if (fallbackToWindow) {
        return openShareWindow(platform, options);
      }
      
      return false;
    }
  }
  
  return openShareWindow(platform, options);
};

const openShareWindow = (platform: string, options: ShareOptions): boolean => {
  const config = platforms[platform.toLowerCase()];
  if (!config) return false;

  const shareUrl = config.buildUrl(options);

  if (options.fallbackToWindow && typeof window !== 'undefined') {
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
  if (typeof window !== 'undefined') {
    window.location.href = shareUrl;
  }
  return true;
};




