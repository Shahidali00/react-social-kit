export type AnalyticsProvider = 'ga' | 'gtm' | 'segment' | 'custom';

export interface AnalyticsConfig {
  provider: AnalyticsProvider;
  trackingId?: string;
  customTracker?: (eventName: string, data: any) => void;
}

export interface ShareEventData {
  platform: string;
  url: string;
  title?: string;
  method: 'button' | 'webshare' | 'native';
  timestamp: number;
}

// Define window with the properties we need
interface CustomWindow extends Window {
  gtag?: (command: string, action: string, params: any) => void;
  dataLayer?: any[];
  analytics?: {
    track: (event: string, properties?: any) => void;
  };
}

export const trackShareEvent = (config: AnalyticsConfig, data: ShareEventData): void => {
  if (typeof window === 'undefined') {
    return;
  }

  // Use type assertion to tell TypeScript about our custom properties
  const customWindow = window as CustomWindow;
  
  const { provider, trackingId, customTracker } = config;
  
  // Format the event data
  const eventData = {
    category: 'Social Share',
    action: `share_${data.platform}`,
    label: data.url,
    value: 1,
    ...data
  };

  // Track based on provider
  switch (provider) {
    case 'ga':
      if (customWindow.gtag && trackingId) {
        customWindow.gtag('event', 'share', {
          method: data.platform,
          content_type: 'page',
          content_id: data.url,
          title: data.title || ''
        });
      }
      break;
    
    case 'gtm':
      if (customWindow.dataLayer) {
        customWindow.dataLayer.push({
          event: 'social_share',
          socialNetwork: data.platform,
          socialAction: 'share',
          socialTarget: data.url
        });
      }
      break;
    
    case 'segment':
      if (customWindow.analytics) {
        customWindow.analytics.track('Share', {
          platform: data.platform,
          url: data.url,
          title: data.title,
          method: data.method
        });
      }
      break;
    
    case 'custom':
      if (customTracker) {
        customTracker('share', eventData);
      }
      break;
  }
};




