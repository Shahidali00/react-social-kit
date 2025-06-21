import { useCallback } from 'react';
import { useShareContext } from '../context/ShareContext';

interface ShareEvent {
  platform: string;
  url: string;
  timestamp: number;
}

export interface UseShareTrackingOptions {
  onShare?: (event: ShareEvent) => void;
  trackingId?: string;
}

export const useShareTracking = (options: UseShareTrackingOptions = {}) => {
  const context = useShareContext();
  const { onShare } = options;
  const trackingId = options.trackingId || context.trackingId;
  
  const trackShare = useCallback((platform: string, url: string) => {
    const event: ShareEvent = {
      platform,
      url,
      timestamp: Date.now()
    };
    
    if (onShare) {
      onShare(event);
    }
    
    if (trackingId && typeof window !== 'undefined') {
      // Example: Send to analytics service
      try {
        if (window.gtag) {
          window.gtag('event', 'share', {
            method: platform,
            content_type: 'url',
            content_id: url
          });
        }
      } catch (error) {
        console.warn('Error tracking share event:', error);
      }
    }
    
    return event;
  }, [onShare, trackingId]);
  
  return { trackShare };
};

// Add this to global.d.ts or a similar file
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
