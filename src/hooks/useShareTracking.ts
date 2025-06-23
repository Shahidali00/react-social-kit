import { useShareContext } from '../context/ShareContext';
import { trackShareEvent, AnalyticsConfig, ShareEventData } from '../utils/analytics';

export interface UseShareTrackingOptions {
  method?: 'button' | 'webshare' | 'native';
}

export interface ShareTrackingData {
  platform: string;
  url: string;
  success: boolean;
  title?: string;
}

export const useShareTracking = (options: UseShareTrackingOptions = {}) => {
  const { analytics, trackingId } = useShareContext();
  const { method = 'button' } = options;

  const trackShare = (data: ShareTrackingData) => {
    if (!analytics && !trackingId) return;

    // Create analytics config
    const config: AnalyticsConfig = {
      provider: analytics?.provider || 'ga',
      trackingId: trackingId || analytics?.trackingId,
      customTracker: analytics?.customTracker
    };

    // Create share event data
    const shareData: ShareEventData = {
      platform: data.platform,
      url: data.url,
      title: data.title,
      method,
      timestamp: Date.now()
    };

    // Track the event
    trackShareEvent(config, shareData);
  };

  return { trackShare };
};



