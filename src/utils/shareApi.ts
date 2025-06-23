import { shareViaWebAPI, canUseWebShare } from './webShare';

export interface ShareOptions {
  url: string;
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
      
      // Use description as fallback for text
      const text = options.text || options.description || '';
      if (text) {
        url.searchParams.append('text', text);
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
      
      // Use description as fallback for summary
      const summary = options.summary || options.description || '';
      if (summary) {
        url.searchParams.append('summary', summary);
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
      
      // Use description as fallback for text
      const text = options.text || options.description || options.title || '';
      if (text) {
        url.searchParams.append('text', text);
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
      
      if (options.title) {
        url.searchParams.append('title', options.title);
      }
      
      // Use description as caption
      const caption = options.description || '';
      if (caption) {
        url.searchParams.append('caption', caption);
      }
      
      return url.toString();
    },
    popupWidth: 550,
    popupHeight: 450
  },
  slack: {
    name: 'Slack',
    color: '#4A154B',
    buildUrl: (options) => {
      // Slack doesn't have a direct share URL, but we can use this format
      const text = options.description || options.title || '';
      const message = text ? `${text} ${options.url}` : options.url;
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
      
      // Use description as fallback for text
      const text = options.description || options.text || options.title || '';
      const message = text ? `${text} ${options.url}` : options.url;
      
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
      
      // Use description as fallback for text
      const description = options.description || options.text || options.title || '';
      if (description) {
        url.searchParams.append('description', description);
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
      
      // Use description as fallback for text
      const body = options.description || options.text || '';
      const message = body ? `${body}\n\n${options.url}` : options.url;
      
      return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
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
    description, // Extract description
    media,
    hashtags,
    via,
    summary,
    source,
    preferWebShare = false,
    fallbackToWindow = true,
    onShareComplete
  } = options;
  
  // Use description as fallback for text if text is not provided
  const finalText = text || description;
  
  // Use description as fallback for summary if summary is not provided
  const finalSummary = summary || description;
  
  // Skip Web Share API for specific platforms to ensure direct sharing
  const skipWebShare = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'pinterest', 'reddit'];
  
  // Only use Web Share API if explicitly preferred and not in the skip list
  if (preferWebShare && !skipWebShare.includes(platform.toLowerCase()) && canUseWebShare()) {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          url,
          title,
          text: finalText || title
        });
        
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'native' });
        }
        
        return true;
      }
    } catch (error) {
      console.error('Error using Web Share API:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'native' });
      }
      
      // If Web Share API fails, fall back to platform-specific sharing
    }
  }
  
  // Fall back to platform-specific sharing
  const config = platforms[platform.toLowerCase()];
  if (!config) return false;
  
  const shareUrl = config.buildUrl(options);
  
  if (fallbackToWindow && typeof window !== 'undefined') {
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













