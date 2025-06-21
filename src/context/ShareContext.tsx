import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, defaultTheme } from '../utils/theme';
import { AnalyticsConfig } from '../utils/analytics';

export interface ShareContextProps {
  defaultUrl?: string;
  theme: Theme;
  analytics?: AnalyticsConfig;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
}

export interface ShareProviderProps {
  children: ReactNode;
  defaultUrl?: string;
  theme?: Theme;
  analytics?: AnalyticsConfig;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
}

const ShareContext = createContext<ShareContextProps>({
  theme: defaultTheme
});

export const ShareProvider: React.FC<ShareProviderProps> = ({
  children,
  defaultUrl,
  theme = defaultTheme,
  analytics,
  onShareComplete
}) => {
  return (
    <ShareContext.Provider value={{ defaultUrl, theme, analytics, onShareComplete }}>
      {children}
    </ShareContext.Provider>
  );
};

export const useShareContext = (): ShareContextProps => {
  return useContext(ShareContext);
};

