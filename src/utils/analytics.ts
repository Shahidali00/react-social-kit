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

export const trackShareEvent = (config: AnalyticsConfig, data: ShareEventData): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const { provider, trackingId, customTracker } = config;
  
  try {
    switch (provider) {
      case 'ga':
        if ('gtag' in window) {
          (window as any).gtag('event', 'share', {
            event_category: 'Social',
            event_label: data.platform,
            method: data.method,
            url: data.url,
            title: data.title
          });
        }
        break;
        
      case 'gtm':
        if ('dataLayer' in window) {
          (window as any).dataLayer.push({
            event: 'social_share',
            socialNetwork: data.platform,
            socialAction: 'share',
            socialTarget: data.url,
            shareMethod: data.method
          });
        }
        break;
        
      case 'segment':
        if ('analytics' in window) {
          (window as any).analytics.track('Share', {
            platform: data.platform,
            url: data.url,
            title: data.title,
            method: data.method
          });
        }
        break;
        
      case 'custom':
        if (customTracker) {
          customTracker('share', data);
        }
        break;
    }
  } catch (error) {
    console.warn('Error tracking share event:', error);
  }
};

// Add this to global.d.ts or a similar file
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    analytics?: {
      track: (event: string, properties?: any) => void;
    };
  }
}
