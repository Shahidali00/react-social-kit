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
export { CopyLinkButton } from './components/CopyLinkButton';

// Native Components
export { CopyLinkNative } from './native/CopyLinkNative';
export { SocialShareSheetNative } from './native/SocialShareSheetNative';
export { ShareSheetNative } from './native/ShareSheetNative';
export { FacebookShareNative } from './native/FacebookShareNative';
export { TwitterShareNative } from './native/TwitterShareNative';
export { WhatsAppShareNative } from './native/WhatsAppShareNative';
export { TelegramShareNative } from './native/TelegramShareNative';
export { RedditShareNative } from './native/RedditShareNative';
export { EmailShareNative } from './native/EmailShareNative';
export { SlackShareNative } from './native/SlackShareNative';

// Utilities
export { createTheme, defaultTheme } from './utils/theme';
export { share, platforms } from './utils/shareApi';
export { canUseWebShare, shareViaWebAPI } from './utils/webShare';
export { trackShareEvent } from './utils/analytics';
export { deepLinks } from './utils/deepLinks';
export { isReactNativeAvailable, getReactNativeComponents } from './utils/platform';
export { isBrowser, isNode, isReactNative, getPlatform } from './utils/environment';

// Types - Use export type for all type exports
export type { ThemeColors, PlatformTheme, Theme } from './utils/theme';
export type { ShareOptions, PlatformShareConfig } from './utils/shareApi';
export type { WebShareData } from './utils/webShare';
export type { AnalyticsProvider, AnalyticsConfig, ShareEventData } from './utils/analytics';
export type { DeepLinkOptions } from './utils/deepLinks';

// Hooks
export { useShareTracking } from './hooks/useShareTracking';
export type { UseShareTrackingOptions } from './hooks/useShareTracking';

// Context
export { ShareProvider, useShareContext } from './context/ShareContext';
export type { ShareProviderProps } from './context/ShareContext';

