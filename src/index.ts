// Components
export { FacebookShare } from './components/platforms/Facebook';
export { TwitterShare } from './components/platforms/Twitter';
export { LinkedInShare } from './components/platforms/LinkedIn';
export { PinterestShare } from './components/platforms/Pinterest';
export { RedditShare } from './components/platforms/Reddit';
export { WhatsAppShare } from './components/platforms/WhatsApp';
export { TelegramShare } from './components/platforms/Telegram';
export { EmailShare } from './components/platforms/Email';
export { SlackShare } from './components/platforms/Slack';
export { TumblrShare } from './components/platforms/Tumblr';
export { ShareButton } from './components/ShareButton';
export { Share } from './components/Share';
export { SocialShareSheet } from './components/SocialShareSheet';
// Remove CopyLinkButton export
// export { CopyLinkButton } from './components/CopyLinkButton';

// Context and Hooks
export { ShareProvider, useShareContext } from './context/ShareContext';
export { useShareTracking } from './hooks/useShareTracking';

// Utilities
export { createTheme, defaultTheme } from './utils/theme';
export { share, platforms } from './utils/shareApi';
export { canUseWebShare, shareViaWebAPI } from './utils/webShare';
export { trackShareEvent } from './utils/analytics';
export { deepLinks } from './utils/deepLinks';
export { isReactNativeAvailable, getReactNativeComponents } from './utils/platform';
export { isBrowser, isNode, isReactNative, getPlatform } from './utils/environment';

// Types
export type { ShareOptions } from './utils/shareApi';
export type { Theme, PlatformTheme, ThemeColors } from './utils/theme';
export type { ShareContextProps, ShareProviderProps } from './context/ShareContext';
export type { AnalyticsConfig, ShareEventData } from './utils/analytics';
export type { UseShareTrackingOptions } from './hooks/useShareTracking';

// // Hooks
// export type { UseShareTrackingOptions } from './hooks/useShareTracking';

// // Context
// export type { ShareProviderProps } from './context/ShareContext';

