import React from 'react';

// Type definitions for React Native components
interface ShareOptions {
  url?: string;
  title?: string;
  message?: string;
  subject?: string;
}

interface ShareDialogOptions {
  dialogTitle?: string;
  subject?: string;
}

interface ShareResult {
  action: string;
  activityType?: string;
}

interface ShareAPI {
  share: (content: ShareOptions, options?: ShareDialogOptions) => Promise<ShareResult>;
  sharedAction: string;
  dismissedAction: string;
}

interface PlatformAPI {
  OS: 'ios' | 'android' | 'web';
}

interface TouchableOpacityProps {
  onPress?: () => void;
  style?: any;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

interface TextProps {
  style?: any;
  children?: React.ReactNode;
}

interface StyleSheetAPI {
  create: <T>(styles: T) => T;
}

// Check if React Native is available
const isReactNativeAvailable = (() => {
  try {
    // This will throw if react-native is not available
    return typeof window === 'undefined' && typeof global !== 'undefined';
  } catch {
    return false;
  }
})();

// Conditional imports and fallbacks
let Share: ShareAPI;
let Platform: PlatformAPI;
let TouchableOpacity: React.FC<TouchableOpacityProps>;
let Text: React.FC<TextProps>;
let StyleSheet: StyleSheetAPI;

if (isReactNativeAvailable) {
  try {
    // Dynamic import for React Native
    const RN = eval('require')('react-native');
    Share = RN.Share;
    Platform = RN.Platform;
    TouchableOpacity = RN.TouchableOpacity;
    Text = RN.Text;
    StyleSheet = RN.StyleSheet;
  } catch (error) {
    // Fallback if import fails
    isReactNativeAvailable && console.warn('React Native components not available, using fallbacks');
    Share = createFallbackShare();
    Platform = { OS: 'web' };
    TouchableOpacity = createFallbackTouchableOpacity();
    Text = createFallbackText();
    StyleSheet = { create: (styles) => styles };
  }
} else {
  // Web fallbacks
  Share = createFallbackShare();
  Platform = { OS: 'web' };
  TouchableOpacity = createFallbackTouchableOpacity();
  Text = createFallbackText();
  StyleSheet = { create: (styles) => styles };
}

function createFallbackShare(): ShareAPI {
  return {
    share: async () => ({ action: 'dismissedAction' }),
    sharedAction: 'sharedAction',
    dismissedAction: 'dismissedAction'
  };
}

function createFallbackTouchableOpacity(): React.FC<TouchableOpacityProps> {
  return ({ children, onPress, style, ...props }) =>
    React.createElement('button', { onClick: onPress, style, ...props }, children);
}

function createFallbackText(): React.FC<TextProps> {
  return ({ children, style, ...props }) =>
    React.createElement('span', { style, ...props }, children);
}

export interface ShareSheetNativeProps {
  url: string;
  title?: string;
  message?: string;
  subject?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform?: string }) => void;
  style?: any;
  textStyle?: any;
}

export const ShareSheetNative: React.FC<ShareSheetNativeProps> = ({
  url,
  title,
  message,
  subject,
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          url: Platform.OS === 'ios' ? url : undefined,
          title: title,
          message: Platform.OS === 'ios' ? message : `${message || title || ''} ${url}`,
          subject: subject
        },
        {
          dialogTitle: title,
          subject: subject
        }
      );
      
      if (result.action === Share.sharedAction) {
        if (onShareComplete) {
          onShareComplete({ 
            success: true, 
            platform: result.activityType || 'unknown'
          });
        }
      } else if (result.action === Share.dismissedAction) {
        if (onShareComplete) {
          onShareComplete({ success: false });
        }
      }
    } catch (error) {
      console.error(error);
      if (onShareComplete) {
        onShareComplete({ success: false });
      }
    }
  };
  
  return (
    <TouchableOpacity 
      onPress={handleShare}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel="Share content"
    >
      {children || <Text style={[styles.text, textStyle]}>Share</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});
