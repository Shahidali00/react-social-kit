// This file is needed to handle cases where React Native is not available
// It provides fallback types for React Native components

declare module 'react-native' {
  import * as React from 'react';

  export interface StyleSheetStatic {
    create<T extends StyleSheetStyles>(styles: T): T;
    flatten(style?: any): any;
  }

  export interface StyleSheetStyles {
    [key: string]: React.CSSProperties | any;
  }

  export interface LinkingStatic {
    openURL(url: string): Promise<boolean>;
    canOpenURL(url: string): Promise<boolean>;
    getInitialURL(): Promise<string | null>;
  }

  export interface ClipboardStatic {
    getString(): Promise<string>;
    setString(content: string): void;
  }

  export interface ShareStatic {
    share(content: { title?: string; message?: string; url?: string }, options?: { dialogTitle?: string; subject?: string }): Promise<{ action: string; activityType?: string }>;
    sharedAction: string;
    dismissedAction: string;
  }

  export interface PlatformStatic {
    OS: 'ios' | 'android' | 'web';
    Version: number | string;
    select<T>(specifics: { ios?: T; android?: T; default?: T }): T;
  }

  export interface TouchableOpacityProps {
    onPress?: () => void;
    style?: any;
    activeOpacity?: number;
    children?: React.ReactNode;
    accessibilityRole?: string;
    accessibilityLabel?: string;
    disabled?: boolean;
  }

  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    onPress?: () => void;
    selectable?: boolean;
  }

  export interface ViewProps {
    style?: any;
    children?: React.ReactNode;
    accessibilityRole?: string;
    accessibilityLabel?: string;
  }

  export class TouchableOpacity extends React.Component<TouchableOpacityProps> {}
  export class Text extends React.Component<TextProps> {}
  export class View extends React.Component<ViewProps> {}

  export const StyleSheet: StyleSheetStatic;
  export const Linking: LinkingStatic;
  export const Share: ShareStatic;
  export const Platform: PlatformStatic;
  export const Clipboard: ClipboardStatic;
}

