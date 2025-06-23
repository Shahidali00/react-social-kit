import React, { createContext, useContext, ReactNode } from 'react';
import { createTheme, defaultTheme, Theme } from '../utils/theme';
import { AnalyticsConfig } from '../utils/analytics';

export interface ShareContextProps {
  theme: Theme;
  defaultUrl?: string;
  defaultTitle?: string;  // Main message from user
  defaultText?: string;
  defaultMedia?: string;
  defaultHashtags?: string[];
  preferNative?: boolean;
  fallbackToWindow?: boolean;
  analytics?: AnalyticsConfig;
  trackingId?: string;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
}

export interface ShareProviderProps {
  children: React.ReactNode;
  theme?: Partial<Theme>;
  defaultUrl?: string;
  defaultTitle?: string;  // Main message from user
  defaultText?: string;
  defaultMedia?: string;
  defaultHashtags?: string[];
  preferNative?: boolean;
  fallbackToWindow?: boolean;
  analytics?: AnalyticsConfig;
  trackingId?: string;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
}

const ShareContext = createContext<ShareContextProps>({
  theme: defaultTheme,
  preferNative: true,
  fallbackToWindow: true
});

export const ShareProvider: React.FC<ShareProviderProps> = ({
  children,
  theme: customTheme,
  defaultUrl,
  defaultTitle,
  defaultText,
  defaultMedia,
  defaultHashtags,
  preferNative = false,
  fallbackToWindow = true,
  analytics,
  trackingId,
  onShareComplete,
}) => {
  // Create the theme by merging custom theme with default theme
  const theme = customTheme ? createTheme(customTheme) : defaultTheme;
  
  // Create context value
  const contextValue: ShareContextProps = {
    theme,
    defaultUrl,
    defaultTitle,
    defaultText,
    defaultMedia,
    defaultHashtags,
    preferNative,
    fallbackToWindow,
    analytics,
    trackingId,
    onShareComplete,
  };
  
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export const useShareContext = () => useContext(ShareContext);












