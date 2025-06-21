import { isReactNative, getPlatform } from './environment';

// Utility to check if React Native is available
export const isReactNativeAvailable = (): boolean => {
  return isReactNative();
};

// Utility to safely import React Native components
export const getReactNativeComponents = () => {
  // Default mock implementations for web environment
  const mockComponents = {
    Platform: { OS: getPlatform() },
    Share: {
      share: async () => ({ action: 'dismissedAction' }),
      sharedAction: 'sharedAction',
      dismissedAction: 'dismissedAction'
    },
    Linking: {
      openURL: async () => false,
      canOpenURL: async () => false
    },
    StyleSheet: {
      create: (styles: any) => styles
    },
    TouchableOpacity: 'button',
    Text: 'span',
    View: 'div',
    Clipboard: {
      setString: async (text: string) => {
        // Use browser clipboard API if available
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          return navigator.clipboard.writeText(text);
        }
        return Promise.resolve();
      },
      getString: async () => {
        // This is a mock - browser doesn't allow reading clipboard without permission
        return Promise.resolve('');
      }
    }
  };

  if (!isReactNativeAvailable()) {
    return mockComponents;
  }

  // In React Native environment, return actual components
  try {
    // Dynamic import for React Native using a safer pattern
    // @ts-ignore - Ignoring require error as this is a runtime check
    const RN = typeof require !== 'undefined' ? require('react-native') : null;
    
    if (!RN) {
      return mockComponents;
    }
    
    return {
      Platform: RN.Platform,
      Share: RN.Share,
      Linking: RN.Linking,
      StyleSheet: RN.StyleSheet,
      TouchableOpacity: RN.TouchableOpacity,
      Text: RN.Text,
      View: RN.View,
      Clipboard: RN.Clipboard
    };
  } catch (error) {
    console.warn('Error importing React Native components:', error);
    // Fallback to mock implementations
    return mockComponents;
  }
};




